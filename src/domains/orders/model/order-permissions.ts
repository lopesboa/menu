import type { UserRole } from "@/shared/types/user-role-types"

export type CriticalOrderAction = "cancelar" | "liberar" | "reabrir"

const ACTION_ALLOWED_ROLES: Record<CriticalOrderAction, UserRole[]> = {
	cancelar: ["owner", "manager", "cashier"],
	liberar: ["owner", "manager", "cashier", "waiter"],
	reabrir: ["owner", "manager"],
}

export function canExecuteCriticalOrderAction(
	role: UserRole | null | undefined,
	action: CriticalOrderAction
): boolean {
	if (!role) {
		return false
	}

	return ACTION_ALLOWED_ROLES[action].includes(role)
}

export function getCriticalOrderPermissionMessage(
	action: CriticalOrderAction
): string {
	const messages: Record<CriticalOrderAction, string> = {
		cancelar:
			"Seu perfil não tem permissão para cancelar pedidos. Procure um gerente.",
		liberar:
			"Seu perfil não tem permissão para liberar pedidos. Procure um gerente.",
		reabrir:
			"Seu perfil não tem permissão para reabrir pedidos. Procure um gerente.",
	}

	return messages[action]
}
