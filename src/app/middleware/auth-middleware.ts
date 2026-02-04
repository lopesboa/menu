import { redirect } from "react-router"
import { authClient } from "@/lib/client"

export async function authMiddleware() {
	const { data } = await authClient.getSession()
	const userId = data?.user.id

	if (!userId) {
		throw redirect("/auth/login")
	}
}
