import { redirect } from "react-router"
import { authClient } from "@/lib/client"
import { getLoginPathWithRedirect } from "../routes/auth/manifest"

export async function authMiddleware({ request }: { request?: Request } = {}) {
	const { data } = await authClient.getSession()
	const userId = data?.user?.id

	if (!userId) {
		const currentPath = request ? new URL(request.url) : null
		const redirectPath = currentPath
			? `${currentPath.pathname}${currentPath.search}${currentPath.hash}`
			: "/dashboard"

		throw redirect(getLoginPathWithRedirect(redirectPath))
	}
}
