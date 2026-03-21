import { apiFetch } from "@/utils/fetch"

export interface DemoRequestPayload {
	name: string
	email: string
	restaurantName: string
	whatsapp: string
	units: string
}

export interface DemoRequestResult {
	requestId?: string
	transport: "backend" | "email" | "whatsapp"
}

const demoWhatsapp = sanitizePhone(
	import.meta.env.VITE_PUBLIC_DEMO_WHATSAPP?.trim() ?? ""
)

interface DemoRequestApiResponse {
	message: "Pedido recebido"
	ok: true
	requestId: string
}

export async function submitDemoRequest(
	payload: DemoRequestPayload
): Promise<DemoRequestResult> {
	if (demoWhatsapp) {
		window.open(
			createWhatsAppLink(payload, demoWhatsapp),
			"_blank",
			"noopener,noreferrer"
		)
		return { transport: "whatsapp" }
	}
	try {
		const response = await apiFetch<DemoRequestApiResponse>(
			"/marketing/demo-requests",
			{
				method: "POST",
			}
		)

		return { requestId: response.requestId, transport: "backend" }
	} catch (error) {
		if (error instanceof Error && error.message) {
			throw error
		}
	}

	throw new Error("Demo transport unavailable")
}

function createWhatsAppLink(payload: DemoRequestPayload, whatsapp: string) {
	return `https://wa.me/${whatsapp}?text=${encodeURIComponent(createMessage(payload))}`
}

function createMessage(payload: DemoRequestPayload) {
	return [
		"Oi! Quero agendar uma demonstracao do Menu Bao.",
		"",
		`Nome: ${payload.name}`,
		`Email: ${payload.email}`,
		`Restaurante: ${payload.restaurantName}`,
		`WhatsApp: ${payload.whatsapp}`,
		`Unidades: ${payload.units}`,
		`Origem: ${window.location.href}`,
	].join("\n")
}

function sanitizePhone(value: string) {
	return value.replace(/\D/g, "")
}
