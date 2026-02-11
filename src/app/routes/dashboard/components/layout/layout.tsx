import { Outlet } from "react-router"
import { cn } from "@/utils/misc"
import { ToastContainer } from "../ui/toast"
import { BottomNav } from "./bottom-nav"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"

export function Layout() {
	return (
		<div className="flex min-h-screen bg-surface-50">
			<Sidebar />
			<div className="flex flex-1 flex-col lg:ml-0">
				<TopBar />
				<main className={cn("flex-1 overflow-auto", "p-4 sm:p-6", "lg:pb-6")}>
					<Outlet />
				</main>
			</div>
			<ToastContainer />
			<BottomNav />
		</div>
	)
}
