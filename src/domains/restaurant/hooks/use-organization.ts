import { useQuery } from "@tanstack/react-query"
import { authClient } from "@/lib/client"
import type { PaymentMethod } from "@/shared/types/commerce-types"
import type {
	Subscription,
	SubscriptionStatus,
	SubscriptionTier,
} from "@/shared/types/subscription-types"
import type { Restaurant, RestaurantSettings } from "../types/restaurant-types"

const ORGANIZATION_QUERY_KEY = ["organization", "full"]

function isValidPaymentMethod(method: string): method is PaymentMethod {
	const validMethods: PaymentMethod[] = [
		"cash",
		"credit",
		"debit",
		"pix",
		"meal_voucher",
	]
	return validMethods.includes(method as PaymentMethod)
}

function mapOrganizationToRestaurant(
	organization: Awaited<
		ReturnType<typeof authClient.organization.getFullOrganization>
	>
): Restaurant | null {
	if (!organization) {
		return null
	}

	const metadata = organization.metadata as Record<string, unknown> | null

	const rawPaymentMethods = (metadata?.defaultPaymentMethods as string[]) ?? [
		"cash",
		"pix",
		"credit",
		"debit",
	]
	const defaultPaymentMethods: PaymentMethod[] = rawPaymentMethods
		.filter(isValidPaymentMethod)
		.map((m) => m as PaymentMethod)

	const settings: RestaurantSettings = {
		requireCashierApproval: Boolean(metadata?.requireCashierApproval),
		defaultPaymentMethods,
		taxRate: Number(metadata?.taxRate) ?? 10,
		invoicePrefix: (metadata?.invoicePrefix as string) ?? "MB",
		theme: (metadata?.theme as "light" | "dark" | "system") ?? "light",
		timezone:
			(metadata?.timezone as string) ??
			Intl.DateTimeFormat().resolvedOptions().timeZone,
	}

	const subscriptionStatus =
		(metadata?.subscriptionStatus as string) ?? "active"
	const validStatus: SubscriptionStatus =
		subscriptionStatus === "active" ||
		subscriptionStatus === "cancelled" ||
		subscriptionStatus === "expired" ||
		subscriptionStatus === "trial"
			? subscriptionStatus
			: "active"

	const subscription: Subscription = {
		id: (metadata?.subscriptionId as string) ?? "",
		organizationId: organization.id,
		plan: (metadata?.plan as SubscriptionTier) ?? "free",
		status: validStatus,
		currentPeriodStart: metadata?.currentPeriodStart
			? new Date(metadata.currentPeriodStart as string)
			: new Date(),
		currentPeriodEnd: metadata?.currentPeriodEnd
			? new Date(metadata.currentPeriodEnd as string)
			: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		cancelAtPeriodEnd: Boolean(metadata?.cancelAtPeriodEnd),
	}

	return {
		id: organization.id,
		ownerId: "",
		name: organization.name,
		slug: organization.slug,
		logo: organization.logo ?? undefined,
		address: "",
		phone: "",
		timezone: settings.timezone,
		currency: (metadata?.currency as string) ?? "BRL",
		settings,
		subscription,
		createdAt: new Date(),
		updatedAt: new Date(),
	}
}

export function useOrganization() {
	const { data: activeOrganization, isPending: isActiveLoading } =
		authClient.useActiveOrganization()

	const {
		data: fullOrganization,
		isPending: isFullLoading,
		refetch,
	} = useQuery({
		queryKey: ORGANIZATION_QUERY_KEY,
		queryFn: async () => {
			const result = await authClient.organization.getFullOrganization()
			return result.data
		},
	})

	const restaurant = () => {
		if (!fullOrganization) {
			return null
		}
		return mapOrganizationToRestaurant(fullOrganization)
	}

	return {
		organization: restaurant(),
		activeOrganizationId: activeOrganization?.id ?? null,
		isLoading: isActiveLoading || isFullLoading,
		refetch,
	}
}

export function useOrganizationList() {
	const { data: organizations, isPending: isLoading } =
		authClient.useListOrganizations()

	const restaurantList = () => {
		if (!organizations) {
			return []
		}
		return organizations.map((org) => ({
			id: org.id,
			name: org.name,
			slug: org.slug,
			logo: org.logo,
		}))
	}

	return {
		organizations: restaurantList(),
		isLoading,
	}
}

export async function setActiveOrganization(organizationId: string) {
	const result = await authClient.organization.setActive({
		organizationId,
	})
	if (result.error) {
		throw new Error(result.error.message)
	}
}
