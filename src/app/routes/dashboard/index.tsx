import { Outlet } from "react-router"
import "./styles.css"
import { cn } from "@/utils/misc"
import { BottomNav } from "./components/layout/bottom-nav"
import { Sidebar } from "./components/layout/sidebar"
import { TopBar } from "./components/layout/top-bar"
import { ToastContainer } from "./components/ui/toast"

export default function Dashboard() {
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
