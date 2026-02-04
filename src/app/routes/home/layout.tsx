import { Outlet } from "react-router"
import { Footer, Navbar } from "@/components"

export default function HomeLayout() {
	return (
		<>
			<Navbar />
			<Outlet />

			<Footer />
		</>
	)
}
