import { AnimatePresence, motion } from "framer-motion"
import {
	Bell,
	Building2,
	ChevronDown,
	CreditCard,
	Crown,
	LogOut,
	Menu,
	Search,
	Settings,
	Star,
	User,
	X,
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth, useAuthAction } from "@/app/store/auth-store"
import { useBillingStore } from "@/app/store/billingStore"
import { useNotificationStore } from "@/app/store/notificationStore"
import { cn } from "@/utils/misc"
import { Notifications } from "./dashboard-notification"

export function TopBar() {
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const { notifications, markAsRead, markAllAsRead, removeNotification } =
		useNotificationStore()
	const { user } = useAuth()
	const { logout } = useAuthAction()
	const { currentPlan, getNextPlan, getCurrentPlan } = useBillingStore()

	const navigate = useNavigate()

	const unreadCount = notifications.filter((n) => !n.read).length
	const currentPlanDetails = getCurrentPlan()
	const nextPlan = getNextPlan()

	const userMenuItems = [
		{ icon: User, label: "Conta", href: "/dashboard/account" },
		{ icon: Settings, label: "Configurações", href: "/dashboard/settings" },
		...(user?.role === "owner" || user?.role === "manager"
			? [{ icon: CreditCard, label: "Cobrança", href: "/dashboard/billing" }]
			: []),
	]

	const handleOnLogout = () => {
		logout()
		setIsUserMenuOpen(false)
		navigate("/login")
	}

	return (
		<>
			<header className="sticky top-0 z-40 border-surface-100 border-b bg-white/80 backdrop-blur-xl">
				<div className="flex items-center justify-between px-4 py-3 lg:px-6">
					<div className="flex flex-1 items-center gap-4">
						<button
							className="rounded-lg p-2 hover:bg-surface-100 lg:hidden"
							onClick={() => setIsMobileMenuOpen(true)}
							type="button"
						>
							<Menu className="h-5 w-5" />
						</button>

						<div
							className={cn(
								"relative flex items-center transition-all duration-300 sm:flex",
								isSearchOpen ? "max-w-md flex-1" : "max-w-xs"
							)}
						>
							<Search className="absolute left-3 h-5 w-5 text-surface-400" />
							<input
								className={cn(
									"w-full rounded-xl border border-surface-200 bg-surface-50 py-2 pr-4 pl-10",
									"focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
									"text-sm transition-all duration-200 placeholder:text-surface-400"
								)}
								onBlur={() => setIsSearchOpen(false)}
								onFocus={() => setIsSearchOpen(true)}
								placeholder="Buscar..."
								type="text"
							/>
						</div>
					</div>

					<div className="flex items-center gap-2">
						{nextPlan && currentPlan === "free" && user?.role === "owner" && (
							<button
								className="hidden items-center gap-1.5 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 px-3 py-1.5 font-medium text-sm text-white shadow-lg shadow-orange-500/25 transition-all hover:from-yellow-500 hover:to-orange-600 md:flex"
								onClick={() => navigate("/billing")}
								type="button"
							>
								<Crown className="h-4 w-4" />
								Upgrade to Pro
							</button>
						)}

						<div className="relative">
							<button
								className="relative rounded-xl p-2.5 transition-colors hover:bg-surface-100"
								onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
								type="button"
							>
								<Bell className="h-5 w-5 text-surface-600" />
								{unreadCount > 0 && (
									<span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 font-medium text-white text-xs">
										{unreadCount > 9 ? "9+" : unreadCount}
									</span>
								)}
							</button>

							<AnimatePresence>
								{isNotificationsOpen && (
									<Notifications
										markAllAsRead={markAllAsRead}
										markAsRead={markAsRead}
										notifications={notifications}
										onClick={() => setIsNotificationsOpen(false)}
										removeNotification={removeNotification}
										unreadCount={unreadCount}
									/>
								)}
							</AnimatePresence>
						</div>

						<div className="relative">
							<button
								className="flex items-center gap-2 rounded-xl p-1 pr-3 transition-colors hover:bg-surface-100"
								onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
								type="button"
							>
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/25">
									{user?.avatar ? (
										<img
											alt={user.name}
											className="h-8 w-8 rounded-lg object-cover"
											src={user.avatar}
										/>
									) : (
										<span className="font-semibold text-sm text-white">
											{user?.name?.charAt(0) || "U"}
										</span>
									)}
								</div>
								<div className="hidden text-left md:block">
									<p className="font-medium text-sm text-surface-900">
										{user?.name}
									</p>
									<p className="max-w-30 truncate text-surface-500 text-xs">
										{user?.email}
									</p>
								</div>
								<ChevronDown className="hidden h-4 w-4 text-surface-400 md:block" />
							</button>

							<AnimatePresence>
								{isUserMenuOpen && (
									<>
										<div
											className="fixed inset-0 z-40"
											onClick={() => setIsUserMenuOpen(false)}
										/>
										<motion.div
											animate={{ opacity: 1, y: 0, scale: 1 }}
											className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-surface-100 bg-white shadow-xl"
											exit={{ opacity: 0, y: 10, scale: 0.95 }}
											initial={{ opacity: 0, y: 10, scale: 0.95 }}
										>
											<div className="border-surface-100 border-b px-4 py-3">
												<div className="flex items-center gap-3">
													<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary-400 to-primary-600">
														{user?.avatar ? (
															<img
																alt={user.name}
																className="h-10 w-10 rounded-lg object-cover"
																src={user.avatar}
															/>
														) : (
															<span className="font-bold text-white">
																{user?.name?.charAt(0) || "U"}
															</span>
														)}
													</div>
													<div className="min-w-0 flex-1">
														<p className="truncate font-medium text-surface-900">
															{user?.name}
														</p>
														<p className="truncate text-sm text-surface-500">
															{user?.email}
														</p>
													</div>
												</div>
												<div className="mt-2 flex items-center gap-1">
													<Crown className="h-3 w-3 text-yellow-500" />
													<span className="font-medium text-primary-600 text-xs">
														{currentPlanDetails.name}
													</span>
												</div>
											</div>

											{nextPlan &&
												currentPlan === "free" &&
												user?.role === "owner" && (
													<div className="border-surface-100 border-b px-3 py-2">
														<button
															className="flex w-full items-center gap-2 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 px-3 py-2 font-medium text-sm text-white transition-all hover:from-yellow-500 hover:to-orange-600"
															onClick={() => {
																setIsUserMenuOpen(false)
																navigate("/billing")
															}}
															type="button"
														>
															<Star className="h-4 w-4" />
															Upgrade to Pro
														</button>
													</div>
												)}

											<div className="py-2">
												{userMenuItems.map((item) => (
													<button
														className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm text-surface-600 transition-colors hover:bg-surface-50"
														key={item.label}
														onClick={() => {
															setIsUserMenuOpen(false)
															navigate(item.href)
														}}
														type="button"
													>
														<item.icon className="h-4 w-4" />
														{item.label}
													</button>
												))}
											</div>

											<div className="border-surface-100 border-t py-2">
												<button
													className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-red-600 text-sm transition-colors hover:bg-red-50"
													onClick={handleOnLogout}
													type="button"
												>
													<LogOut className="h-4 w-4" />
													Sair
												</button>
											</div>
										</motion.div>
									</>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</header>

			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						<motion.div
							animate={{ opacity: 1 }}
							className="fixed inset-0 z-50 bg-black/50 lg:hidden"
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
							onClick={() => setIsMobileMenuOpen(false)}
						/>
						<motion.div
							animate={{ x: 0 }}
							className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white lg:hidden"
							exit={{ x: -280 }}
							initial={{ x: -280 }}
							transition={{ type: "spring", damping: 25 }}
						>
							<div className="flex items-center justify-between border-surface-100 border-b p-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25">
										<Building2 className="h-5 w-5 text-white" />
									</div>
									<div>
										<h1 className="font-bold text-surface-900">MenuBao</h1>
										<p className="text-surface-500 text-xs">Restaurant</p>
									</div>
								</div>
								<button
									className="rounded-lg p-2 hover:bg-surface-100"
									onClick={() => setIsMobileMenuOpen(false)}
									type="button"
								>
									<X className="h-5 w-5" />
								</button>
							</div>
							<div className="border-surface-100 border-b p-4">
								<div className="flex items-center gap-3 rounded-xl bg-surface-50 p-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600">
										<span className="font-semibold text-white">
											{user?.name?.charAt(0) || "U"}
										</span>
									</div>
									<div>
										<p className="font-medium text-surface-900">{user?.name}</p>
										<p className="max-w-35 truncate text-surface-500 text-xs">
											{user?.email}
										</p>
									</div>
								</div>
							</div>
							<div className="flex-1 space-y-1 overflow-y-auto p-4">
								<button
									className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-surface-600 hover:bg-surface-50"
									onClick={() => {
										setIsMobileMenuOpen(false)
										navigate("/dashboard/account")
									}}
									type="button"
								>
									<User className="h-5 w-5" />
									Minha Conta
								</button>
								{(user?.role === "owner" || user?.role === "manager") && (
									<button
										className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-surface-600 hover:bg-surface-50"
										onClick={() => {
											setIsMobileMenuOpen(false)
											navigate("/dashboard/billing")
										}}
										type="button"
									>
										<CreditCard className="h-5 w-5" />
										Cobrança
									</button>
								)}
								<button
									className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-surface-600 hover:bg-surface-50"
									onClick={() => {
										setIsMobileMenuOpen(false)
										navigate("/dashboard/settings")
									}}
									type="button"
								>
									<Settings className="h-5 w-5" />
									Configurações
								</button>
							</div>
							<div className="border-surface-100 border-t p-4">
								<button
									className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
									onClick={() => {
										logout()
										setIsMobileMenuOpen(false)
										navigate("/login")
									}}
									type="button"
								>
									<LogOut className="h-4 w-4" />
									Sair
								</button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	)
}
