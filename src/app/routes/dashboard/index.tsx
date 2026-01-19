import { Outlet } from "react-router"
import "./styles.css"

export default function Dashboard() {
	return (
		<div>
			<p>Dashboard</p>
			<Outlet />
		</div>
	)
}
