import type { PropsWithChildren } from "react"
import { Navigate, useLocation } from "react-router"
import { useAuth } from "../store/auth-store"

export function ProtectedRoute({ children }: PropsWithChildren) {
	const { isAuthenticated, isLoading } = useAuth()
	const location = useLocation()

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-blue-600 border-b-2" />
			</div>
		)
	}

	if (!isAuthenticated) {
		return <Navigate replace state={{ from: location }} to="/login" />
	}

	return <>{children}</>
}
