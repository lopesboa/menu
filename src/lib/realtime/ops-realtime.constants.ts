export const OPS_REALTIME_NAMESPACE = "/ops"
export const OPS_REALTIME_ACK_TIMEOUT_MS = 2000

export const OPS_REALTIME_DOMAINS = [
	"orders",
	"kds",
	"delivery",
	"ops",
] as const

export const OPS_REALTIME_EVENTS = {
	subscribe: "ops.subscribe",
	unsubscribe: "ops.unsubscribe",
	refresh: "ops.refresh",
	orderStatusChangeRequest: "order.status.change.request",
} as const

export const OPS_REALTIME_DOMAIN_EVENT_NAMES = [
	"orders.snapshot",
	"orders.delta",
	"kds.snapshot",
	"kds.delta",
	"delivery.snapshot",
	"delivery.delta",
	"ops.snapshot",
	"ops.delta",
] as const
