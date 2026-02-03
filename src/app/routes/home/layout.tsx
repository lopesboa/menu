import { Outlet } from "react-router"
import { DEMO_SALES_ID, SIGN_UP_MODAL_ID } from "@/app/constants"
import { useDialogActions } from "@/app/store/dialog"
import { DemoSales, Footer, Navbar } from "@/components"
import { Button } from "@/components/ui/button"

export default function HomeLayout() {
	return (
		<>
			<Navbar />
			<Outlet />

			<Footer />
		</>
	)
}
