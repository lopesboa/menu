import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns"
import { ptBR } from "date-fns/locale"

export function formatCurrency(value: number): string {
	if (!Number.isFinite(value)) {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(0)
	}

	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value)
}

export function formatNumber(value: number): string {
	return new Intl.NumberFormat("pt-BR").format(value)
}

export function formatDate(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date

	if (isToday(d)) {
		return `Hoje às ${format(d, "HH:mm")}`
	}

	if (isYesterday(d)) {
		return `Ontem às ${format(d, "HH:mm")}`
	}

	return format(d, "d 'de' MMM 'de' yyyy", { locale: ptBR })
}

export function formatRelativeTime(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date
	return formatDistanceToNow(d, { addSuffix: true, locale: ptBR })
}

export function formatTime(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date
	return format(d, "HH:mm")
}

export function formatDateTime(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date
	return format(d, "dd/MM/yyyy HH:mm", { locale: ptBR })
}

export function getStatusColor(status: string): string {
	const colors: Record<string, string> = {
		pending: "bg-yellow-100 text-yellow-800",
		confirmed: "bg-blue-100 text-blue-800",
		preparing: "bg-orange-100 text-orange-800",
		ready: "bg-green-100 text-green-800",
		delivered: "bg-gray-100 text-gray-800",
		cancelled: "bg-red-100 text-red-800",
		available: "bg-green-100 text-green-800",
		occupied: "bg-red-100 text-red-800",
		reserved: "bg-blue-100 text-blue-800",
		cleaning: "bg-yellow-100 text-yellow-800",
	}

	return colors[status] || "bg-gray-100 text-gray-800"
}

export function getStatusLabel(status: string): string {
	const labels: Record<string, string> = {
		pending: "Pendente",
		confirmed: "Confirmado",
		preparing: "Preparando",
		ready: "Pronto",
		delivered: "Entregue",
		cancelled: "Cancelado",
		available: "Disponível",
		occupied: "Ocupada",
		reserved: "Reservada",
		cleaning: "Limpeza",
	}

	return labels[status] || status
}

export function getPaymentMethodLabel(method: string): string {
	const labels: Record<string, string> = {
		cash: "Dinheiro",
		credit: "Cartão de Crédito",
		debit: "Cartão de Débito",
		pix: "PIX",
		meal_voucher: "Vale Refeição",
	}

	return labels[method] || method
}

export function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
