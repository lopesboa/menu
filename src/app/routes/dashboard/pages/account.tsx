import { motion } from "framer-motion"
import { Bell, Building2, Camera, Save, Shield, User } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/app/store/auth-store"
import { useRestaurantStore } from "@/app/store/restaurant-store"
import { Modal } from "@/components/ui/modal"
import { cn } from "@/utils/misc"

export default function AccountPage() {
	const { user } = useAuth()
	const { activeRestaurant, getRestaurants, setActiveRestaurant } =
		useRestaurantStore()

	const [activeTab, setActiveTab] = useState<
		"profile" | "notifications" | "security"
	>("profile")
	const [showRestaurantSwitcher, setShowRestaurantSwitcher] = useState(false)

	const restaurants = getRestaurants()

	const tabs: Array<{
		key: "profile" | "notifications" | "security"
		label: string
		icon: typeof User
	}> = [
		{ key: "profile", label: "Perfil", icon: User },
		{ key: "notifications", label: "Notificações", icon: Bell },
		{ key: "security", label: "Segurança", icon: Shield },
	]

	const notificationSettings = [
		{ id: "new_orders", label: "Novos pedidos", enabled: true },
		{ id: "low_stock", label: "Estoque baixo", enabled: true },
		{ id: "reservations", label: "Reservas", enabled: false },
		{ id: "reports", label: "Relatórios diários", enabled: true },
		{ id: "marketing", label: "Promoções", enabled: false },
	]

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -20 }}
			>
				<h1 className="font-bold text-2xl text-surface-900">Minha Conta</h1>
				<p className="mt-1 text-surface-500">
					Gerencie suas informações pessoais
				</p>
			</motion.div>

			<div className="flex flex-col gap-6 lg:flex-row">
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					className="shrink-0 lg:w-64"
					initial={{ opacity: 0, x: -20 }}
				>
					<div className="rounded-2xl border border-surface-100 bg-white p-4">
						<div className="mb-4 border-surface-100 border-b pb-4 text-center">
							<div className="relative mx-auto mb-4 h-24 w-24">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100">
									{user?.avatar ? (
										<img
											alt={user.name}
											className="h-24 w-24 rounded-full object-cover"
											height={96}
											src={user.avatar}
											width={96}
										/>
									) : (
										<span className="font-bold text-3xl text-primary-700">
											{user?.name?.charAt(0) || "U"}
										</span>
									)}
								</div>
								<button
									className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600"
									type="button"
								>
									<Camera className="h-4 w-4" />
								</button>
							</div>
							<p className="font-semibold text-surface-900">{user?.name}</p>
							<p className="text-sm text-surface-500">{user?.email}</p>
							<button
								className="mt-3 font-medium text-primary-600 text-sm hover:text-primary-700"
								onClick={() => setShowRestaurantSwitcher(true)}
								type="button"
							>
								{activeRestaurant?.name}
							</button>
						</div>
						<div className="space-y-1">
							{tabs.map((tab) => (
								<button
									className={cn(
										"flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-colors",
										activeTab === tab.key
											? "bg-primary-50 text-primary-700"
											: "text-surface-600 hover:bg-surface-50"
									)}
									key={tab.key}
									onClick={() => setActiveTab(tab.key)}
									type="button"
								>
									<tab.icon className="h-5 w-5" />
									<span className="font-medium">{tab.label}</span>
								</button>
							))}
						</div>
					</div>
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="flex-1 rounded-2xl border border-surface-100 bg-white p-6"
					initial={{ opacity: 0, y: 20 }}
				>
					{activeTab === "profile" && (
						<div className="space-y-6">
							<h2 className="font-semibold text-lg text-surface-900">
								Informações Pessoais
							</h2>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="name"
									>
										Nome
									</label>
									<input
										className="input-field"
										defaultValue={user?.name}
										id="name"
										type="text"
									/>
								</div>
								<div>
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="email"
									>
										Email
									</label>
									<input
										className="input-field"
										defaultValue={user?.email}
										id="email"
										type="email"
									/>
								</div>
								<div>
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="phone"
									>
										Telefone
									</label>
									<input
										className="input-field"
										id="phone"
										placeholder="(11) 99999-0000"
										type="tel"
									/>
								</div>
								<div>
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="role"
									>
										Cargo
									</label>
									<input
										className="input-field"
										defaultValue={user?.role}
										disabled
										id="role"
										type="text"
									/>
								</div>
							</div>
							<div className="flex justify-end">
								<button className="btn-primary gap-2" type="button">
									<Save className="h-4 w-4" />
									Salvar Alterações
								</button>
							</div>
						</div>
					)}

					{activeTab === "notifications" && (
						<div className="space-y-6">
							<h2 className="font-semibold text-lg text-surface-900">
								Preferências de Notificação
							</h2>
							<div className="space-y-4">
								{notificationSettings.map((setting) => (
									<div
										className="flex items-center justify-between rounded-xl bg-surface-50 p-4"
										key={setting.id}
									>
										<div className="flex items-center gap-3">
											<Bell className="h-5 w-5 text-surface-600" />
											<span className="text-surface-900">{setting.label}</span>
										</div>
										<label className="relative inline-flex cursor-pointer items-center">
											<input
												className="peer sr-only"
												defaultChecked={setting.enabled}
												type="checkbox"
											/>
											<div className="peer h-6 w-11 rounded-full bg-surface-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-surface-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300" />
										</label>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab === "security" && (
						<div className="space-y-6">
							<h2 className="font-semibold text-lg text-surface-900">
								Segurança
							</h2>
							<div className="space-y-4">
								<div className="rounded-xl bg-surface-50 p-4">
									<p className="font-medium text-surface-900">Senha</p>
									<p className="mb-3 text-sm text-surface-500">
										Última alteração há 30 dias
									</p>
									<button className="btn-secondary text-sm" type="button">
										Alterar Senha
									</button>
								</div>
								<div className="rounded-xl bg-surface-50 p-4">
									<p className="font-medium text-surface-900">
										Autenticação em Dois Fatores
									</p>
									<p className="mb-3 text-sm text-surface-500">
										Adicione uma camada extra de segurança
									</p>
									<button className="btn-secondary text-sm" type="button">
										Ativar 2FA
									</button>
								</div>
								<div className="rounded-xl border border-red-200 bg-red-50 p-4">
									<p className="font-medium text-red-900">Excluir Conta</p>
									<p className="red-700 mb-3 text-sm">
										Esta ação é irreversível
									</p>
									<button
										className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600"
										type="button"
									>
										Excluir Minha Conta
									</button>
								</div>
							</div>
						</div>
					)}
				</motion.div>
			</div>

			<Modal
				isOpen={showRestaurantSwitcher}
				onClose={() => setShowRestaurantSwitcher(false)}
				size="md"
				title="Selecionar Restaurante"
			>
				<div className="space-y-3">
					{restaurants.map((restaurant) => (
						<button
							className={cn(
								"flex w-full items-center gap-4 rounded-xl border-2 p-4 transition-colors",
								activeRestaurant?.id === restaurant.id
									? "border-primary-500 bg-primary-50"
									: "border-surface-100 hover:border-surface-200"
							)}
							key={restaurant.id}
							onClick={() => {
								setActiveRestaurant(restaurant)
								setShowRestaurantSwitcher(false)
							}}
							type="button"
						>
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-100">
								<Building2 className="h-6 w-6 text-surface-600" />
							</div>
							<div className="flex-1 text-left">
								<p className="font-medium text-surface-900">
									{restaurant.name}
								</p>
								<p className="text-sm text-surface-500">{restaurant.address}</p>
							</div>
							{activeRestaurant?.id === restaurant.id && (
								<span className="rounded-full bg-primary-100 px-3 py-1 font-medium text-primary-700 text-xs">
									Ativo
								</span>
							)}
						</button>
					))}
				</div>
			</Modal>
		</div>
	)
}
