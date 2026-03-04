import { motion } from "framer-motion"
import {
	Bell,
	Building,
	Link2,
	Palette,
	Save,
	Shield,
	User,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/utils/misc"

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState("profile")

	const tabs = [
		{ key: "profile", label: "Perfil", icon: User },
		{ key: "restaurant", label: "Restaurante", icon: Building },
		{ key: "notifications", label: "Notificações", icon: Bell },
		{ key: "security", label: "Segurança", icon: Shield },
		{ key: "appearance", label: "Aparência", icon: Palette },
		{ key: "integrations", label: "Integrações", icon: Link2 },
	]

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -20 }}
			>
				<h1 className="font-bold text-2xl text-surface-900">Configurações</h1>
				<p className="mt-1 text-surface-500">
					Gerencie as configurações do sistema
				</p>
			</motion.div>

			<div className="flex gap-6">
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					className="w-64 shrink-0"
					initial={{ opacity: 0, x: -20 }}
				>
					<div className="rounded-2xl border border-surface-100 bg-white p-2">
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
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="flex-1 rounded-2xl border border-surface-100 bg-white p-6"
					initial={{ opacity: 0, y: 20 }}
				>
					{activeTab === "profile" && (
						<div className="space-y-6">
							<h2 className="font-semibold text-lg text-surface-900">
								Perfil do Usuário
							</h2>
							<div className="flex items-center gap-6">
								<div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 font-bold text-2xl text-primary-700">
									GM
								</div>
								<button className="btn-secondary" type="button">
									Alterar Foto
								</button>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="first-name"
									>
										Nome
									</label>
									<input
										className="input-field"
										defaultValue="Gerente"
										id="first-name"
										type="text"
									/>
								</div>
								<div>
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="last-name"
									>
										Sobrenome
									</label>
									<input
										className="input-field"
										defaultValue="Manager"
										id="last-name"
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
										defaultValue="gerente@menubao.com"
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
										defaultValue="(11) 99999-0000"
										id="phone"
										type="tel"
									/>
								</div>
							</div>
							<button className="btn-primary gap-2" type="button">
								<Save className="h-4 w-4" />
								Salvar Alterações
							</button>
						</div>
					)}

					{activeTab === "restaurant" && (
						<div className="space-y-6">
							<h2 className="font-semibold text-lg text-surface-900">
								Informações do Restaurante
							</h2>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-2">
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="restaurant-name"
									>
										Nome do Restaurante
									</label>
									<input
										className="input-field"
										defaultValue="MenuBao Restaurant"
										id="restaurant-name"
										type="text"
									/>
								</div>
								<div>
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="cnpj"
									>
										CNPJ
									</label>
									<input
										className="input-field"
										defaultValue="00.000.000/0001-00"
										id="cnpj"
										type="text"
									/>
								</div>
								<div>
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="restaurant-phone"
									>
										Telefone
									</label>
									<input
										className="input-field"
										defaultValue="(11) 3333-0000"
										id="restaurant-phone"
										type="tel"
									/>
								</div>
								<div className="col-span-2">
									<label
										className="mb-1 block font-medium text-sm text-surface-700"
										htmlFor="address"
									>
										Endereço
									</label>
									<input
										className="input-field"
										defaultValue="Av. Paulista, 1000 - São Paulo, SP"
										id="address"
										type="text"
									/>
								</div>
							</div>
							<button className="btn-primary gap-2" type="button">
								<Save className="h-4 w-4" />
								Salvar Alterações
							</button>
						</div>
					)}

					{activeTab === "integrations" && (
						<div className="space-y-6">
							<h2 className="font-semibold text-lg text-surface-900">
								Integrações
							</h2>
							<div className="space-y-4">
								{[
									{ name: "iFood", status: "connected", icon: "🍔" },
									{ name: "Uber Eats", status: "connected", icon: "🚗" },
									{ name: "Rappi", status: "disconnected", icon: "🛵" },
									{ name: " Mercado Pago", status: "connected", icon: "💳" },
									{ name: "Conta Azul", status: "disconnected", icon: "📊" },
								].map((integration) => (
									<div
										className="flex items-center justify-between rounded-xl bg-surface-50 p-4"
										key={integration.name}
									>
										<div className="flex items-center gap-4">
											<span className="text-2xl">{integration.icon}</span>
											<div>
												<p className="font-medium text-surface-900">
													{integration.name}
												</p>
												<p
													className={cn(
														"text-sm",
														integration.status === "connected"
															? "text-green-600"
															: "text-surface-500"
													)}
												>
													{integration.status === "connected"
														? "Conectado"
														: "Não conectado"}
												</p>
											</div>
										</div>
										<button
											className={cn(
												"rounded-lg px-4 py-2 font-medium text-sm transition-colors",
												integration.status === "connected"
													? "bg-red-100 text-red-700 hover:bg-red-200"
													: "bg-primary-500 text-white hover:bg-primary-600"
											)}
											type="button"
										>
											{integration.status === "connected"
												? "Desconectar"
												: "Conectar"}
										</button>
									</div>
								))}
							</div>
						</div>
					)}

					{activeTab !== "profile" &&
						activeTab !== "restaurant" &&
						activeTab !== "integrations" && (
							<div className="py-12 text-center text-surface-500">
								<Building className="mx-auto mb-4 h-16 w-16 opacity-50" />
								<p>Esta seção está em desenvolvimento</p>
							</div>
						)}
				</motion.div>
			</div>
		</div>
	)
}
