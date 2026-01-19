import { redirect } from "react-router"
import { authClient } from "@/lib/client"

export async function orgMiddleware() {
	const { data } = await authClient.getSession()

	const hasActiveOrg = data?.session.activeOrganizationId

	if (!hasActiveOrg) {
		throw redirect("/dashboard/create")
	}
}
