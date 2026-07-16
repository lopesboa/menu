import type { QueryClient } from "@tanstack/react-query"

export const posQueryKeys = {
	all: ["pos"] as const,
	orders: (organizationId: string | null) =>
		[...posQueryKeys.all, "order", organizationId] as const,
	order: (organizationId: string | null, orderId: string) =>
		[...posQueryKeys.orders(organizationId), orderId] as const,
	mutations: {
		create: (organizationId: string | null) =>
			[...posQueryKeys.all, "mutation", "create", organizationId] as const,
		replaceDraft: (organizationId: string | null) =>
			[
				...posQueryKeys.all,
				"mutation",
				"replace-draft",
				organizationId,
			] as const,
		finalize: (organizationId: string | null) =>
			[...posQueryKeys.all, "mutation", "finalize", organizationId] as const,
		activate: (organizationId: string | null) =>
			[...posQueryKeys.all, "mutation", "activate", organizationId] as const,
		checkout: (organizationId: string | null) =>
			[...posQueryKeys.all, "mutation", "checkout", organizationId] as const,
		reopen: (organizationId: string | null) =>
			[...posQueryKeys.all, "mutation", "reopen", organizationId] as const,
		cancel: (organizationId: string | null) =>
			[...posQueryKeys.all, "mutation", "cancel", organizationId] as const,
	},
} as const

export const comboOffersQueryKeys = {
	all: ["combo-offers"] as const,
	list: (organizationId: string | null, includeInactive?: boolean) =>
		[
			...comboOffersQueryKeys.all,
			"list",
			{ organizationId, includeInactive },
		] as const,
	detail: (organizationId: string | null, comboOfferId: string) =>
		[
			...comboOffersQueryKeys.all,
			"detail",
			organizationId,
			comboOfferId,
		] as const,
	mutations: {
		create: (organizationId: string | null) =>
			[
				...comboOffersQueryKeys.all,
				"mutation",
				"create",
				organizationId,
			] as const,
		update: (organizationId: string | null) =>
			[
				...comboOffersQueryKeys.all,
				"mutation",
				"update",
				organizationId,
			] as const,
		deactivate: (organizationId: string | null) =>
			[
				...comboOffersQueryKeys.all,
				"mutation",
				"deactivate",
				organizationId,
			] as const,
	},
} as const

export function invalidatePosOrderCache(
	queryClient: QueryClient,
	organizationId: string | null,
	orderId?: string
): void {
	if (orderId) {
		queryClient.invalidateQueries({
			queryKey: posQueryKeys.order(organizationId, orderId),
		})
	}

	queryClient.invalidateQueries({
		queryKey: posQueryKeys.orders(organizationId),
	})
}

export function invalidateComboOffersCache(
	queryClient: QueryClient,
	organizationId: string | null
): void {
	queryClient.invalidateQueries({
		predicate: (query) => {
			const [scope, , params] = query.queryKey as [
				string,
				string,
				{ organizationId?: string | null } | undefined,
			]

			if (scope !== "combo-offers") {
				return false
			}

			return params?.organizationId === organizationId
		},
	})
}
