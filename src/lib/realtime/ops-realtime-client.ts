import { io, type Socket } from "socket.io-client"
import { sentryCaptureException } from "@/lib/sentry"
import {
	OPS_REALTIME_ACK_TIMEOUT_MS,
	OPS_REALTIME_EVENTS,
	OPS_REALTIME_NAMESPACE,
} from "./ops-realtime.constants"
import type {
	OpsRealtimeDomain,
	OpsRealtimeDomainCommandPayload,
	OpsRealtimeHealthState,
	OrderStatusChangeAck,
	OrderStatusChangeRequestPayload,
} from "./ops-realtime.types"
import {
	captureOpsRealtimeTelemetry,
	OpsRealtimeTelemetryEvents,
} from "./ops-realtime-telemetry"

type StoreListener = () => void
type SocketEventHandler = (payload: unknown) => void
const TRAILING_SLASHES_REGEX = /\/+$/

function toOpsNamespaceUrl() {
	const baseUrl = import.meta.env.VITE_APP_SERVER_URL
	return `${baseUrl.replace(TRAILING_SLASHES_REGEX, "")}${OPS_REALTIME_NAMESPACE}`
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message
	}

	return "Erro desconhecido"
}

function isAckTimeoutError(error: unknown) {
	if (!(error instanceof Error)) {
		return false
	}

	return error.message.toLowerCase().includes("timed out")
}

export class OpsRealtimeAckTimeoutError extends Error {
	constructor(message = "Tempo limite excedido para confirmação no realtime") {
		super(message)
		this.name = "OpsRealtimeAckTimeoutError"
	}
}

export class OpsRealtimeTransportError extends Error {
	constructor(message = "Falha de transporte no realtime") {
		super(message)
		this.name = "OpsRealtimeTransportError"
	}
}

export class OpsRealtimeCommandRejectedError extends Error {
	errorCode?: string

	constructor(message: string, errorCode?: string) {
		super(message)
		this.name = "OpsRealtimeCommandRejectedError"
		this.errorCode = errorCode
	}
}

class OpsRealtimeClient {
	private socket: Socket | null = null
	private activeSessionCount = 0
	private readonly listeners = new Set<StoreListener>()
	private organizationId: string | null = null
	private readonly subscribedDomains = new Set<OpsRealtimeDomain>()
	private readonly eventListeners = new Map<string, Set<SocketEventHandler>>()
	private readonly socketEventDispatchers = new Map<
		string,
		SocketEventHandler
	>()

	private healthState: OpsRealtimeHealthState = {
		status: "idle",
		isConnected: false,
		organizationId: null,
		lastConnectedAt: null,
		lastDisconnectedAt: null,
		lastError: null,
		subscribedDomains: [],
	}

	startSession(organizationId: string) {
		this.activeSessionCount += 1
		this.organizationId = organizationId
		this.updateHealthState({ organizationId })
		this.ensureSocket()
	}

	stopSession() {
		this.activeSessionCount = Math.max(this.activeSessionCount - 1, 0)

		if (this.activeSessionCount > 0) {
			return
		}

		this.teardownSocket()
		this.organizationId = null
		this.subscribedDomains.clear()
		this.updateHealthState({
			status: "idle",
			isConnected: false,
			organizationId: null,
			lastError: null,
			subscribedDomains: [],
		})
	}

	addEventListener(eventName: string, handler: SocketEventHandler) {
		const listeners =
			this.eventListeners.get(eventName) ?? new Set<SocketEventHandler>()
		listeners.add(handler)
		this.eventListeners.set(eventName, listeners)
		this.bindSocketEvent(eventName)

		return () => {
			const currentListeners = this.eventListeners.get(eventName)
			currentListeners?.delete(handler)
			if (!currentListeners || currentListeners.size > 0) {
				return
			}

			this.eventListeners.delete(eventName)
			const dispatcher = this.socketEventDispatchers.get(eventName)
			if (dispatcher && this.socket) {
				this.socket.off(eventName, dispatcher)
			}
			this.socketEventDispatchers.delete(eventName)
		}
	}

	subscribe(listener: StoreListener) {
		this.listeners.add(listener)

		return () => {
			this.listeners.delete(listener)
		}
	}

	getHealthState() {
		return this.healthState
	}

	subscribeDomain(domain: OpsRealtimeDomain) {
		this.subscribedDomains.add(domain)
		this.updateHealthState({ subscribedDomains: [...this.subscribedDomains] })
		this.emitDomainCommand(OPS_REALTIME_EVENTS.subscribe, { domain })
	}

	unsubscribeDomain(domain: OpsRealtimeDomain) {
		this.subscribedDomains.delete(domain)
		this.updateHealthState({ subscribedDomains: [...this.subscribedDomains] })
		this.emitDomainCommand(OPS_REALTIME_EVENTS.unsubscribe, { domain })
	}

	refreshDomain(domain: OpsRealtimeDomain) {
		this.emitDomainCommand(OPS_REALTIME_EVENTS.refresh, { domain })
	}

	async requestOrderStatusChange(payload: OrderStatusChangeRequestPayload) {
		if (!this.socket?.connected) {
			throw new OpsRealtimeTransportError(
				"Conexão realtime indisponível para atualização de status"
			)
		}

		try {
			const ack = (await this.socket
				.timeout(OPS_REALTIME_ACK_TIMEOUT_MS)
				.emitWithAck(
					OPS_REALTIME_EVENTS.orderStatusChangeRequest,
					payload
				)) as OrderStatusChangeAck

			if (ack.ok === false) {
				throw new OpsRealtimeCommandRejectedError(
					ack.message ??
						ack.reason ??
						"Requisição de status rejeitada no realtime",
					ack.errorCode
				)
			}

			return ack
		} catch (error) {
			if (isAckTimeoutError(error)) {
				throw new OpsRealtimeAckTimeoutError()
			}

			if (error instanceof OpsRealtimeCommandRejectedError) {
				throw error
			}

			throw new OpsRealtimeTransportError(getErrorMessage(error))
		}
	}

	private ensureSocket() {
		if (this.socket) {
			return
		}

		this.updateHealthState({
			status: "connecting",
			isConnected: false,
			lastError: null,
		})

		this.socket = io(toOpsNamespaceUrl(), {
			withCredentials: true,
			autoConnect: true,
			transports: ["websocket", "polling"],
			timeout: OPS_REALTIME_ACK_TIMEOUT_MS,
		})

		this.socketEventDispatchers.clear()
		for (const eventName of this.eventListeners.keys()) {
			this.bindSocketEvent(eventName)
		}

		this.socket.on("connect", () => {
			this.updateHealthState({
				status: "connected",
				isConnected: true,
				lastError: null,
				lastConnectedAt: Date.now(),
			})

			captureOpsRealtimeTelemetry(
				OpsRealtimeTelemetryEvents.connectionStateChanged,
				{
					status: "connected",
					organization_id: this.organizationId,
				}
			)

			this.resubscribeDomains()
		})

		this.socket.on("disconnect", () => {
			this.updateHealthState({
				status: "disconnected",
				isConnected: false,
				lastDisconnectedAt: Date.now(),
			})

			captureOpsRealtimeTelemetry(
				OpsRealtimeTelemetryEvents.connectionStateChanged,
				{
					status: "disconnected",
					organization_id: this.organizationId,
				}
			)
		})

		this.socket.on("connect_error", (error: Error) => {
			this.updateHealthState({
				status: "degraded",
				isConnected: false,
				lastError: error.message,
			})

			sentryCaptureException(error, {
				context: "ops_realtime_connect_error",
				organizationId: this.organizationId,
			})

			captureOpsRealtimeTelemetry(
				OpsRealtimeTelemetryEvents.connectionStateChanged,
				{
					status: "degraded",
					organization_id: this.organizationId,
					error_message: error.message,
				}
			)
		})
	}

	private emitDomainCommand(
		eventName: string,
		payload: Pick<OpsRealtimeDomainCommandPayload, "domain">
	) {
		if (!(this.socket?.connected && this.organizationId)) {
			return
		}

		this.socket.emit(eventName, {
			organizationId: this.organizationId,
			domain: payload.domain,
		} satisfies OpsRealtimeDomainCommandPayload)
	}

	private resubscribeDomains() {
		for (const domain of this.subscribedDomains) {
			this.emitDomainCommand(OPS_REALTIME_EVENTS.subscribe, { domain })
		}
	}

	private bindSocketEvent(eventName: string) {
		if (!this.socket || this.socketEventDispatchers.has(eventName)) {
			return
		}

		const dispatcher: SocketEventHandler = (payload) => {
			const handlers = this.eventListeners.get(eventName)
			if (!handlers || handlers.size === 0) {
				return
			}

			for (const handler of handlers) {
				handler(payload)
			}
		}

		this.socketEventDispatchers.set(eventName, dispatcher)
		this.socket.on(eventName, dispatcher)
	}

	private teardownSocket() {
		if (!this.socket) {
			return
		}

		for (const [
			eventName,
			dispatcher,
		] of this.socketEventDispatchers.entries()) {
			this.socket.off(eventName, dispatcher)
		}

		this.socket.disconnect()
		this.socket = null
		this.socketEventDispatchers.clear()
	}

	private updateHealthState(nextState: Partial<OpsRealtimeHealthState>) {
		this.healthState = {
			...this.healthState,
			...nextState,
		}

		for (const listener of this.listeners) {
			listener()
		}
	}
}

export const opsRealtimeClient = new OpsRealtimeClient()
