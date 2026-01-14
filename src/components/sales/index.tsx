import { Icon } from "@iconify-icon/react"
import { DEMO_SALES_ID } from "@/app/constants"
import { useDialog, useDialogActions } from "@/app/store/dialog"
import { cn } from "@/utils/misc"
import { Button } from "../ui/button"
import { Dialog } from "../ui/dialog"
import { Input } from "../ui/input"

export function DemoSales() {
	const { toggleDialog } = useDialogActions()
	const { dialogs } = useDialog()

	const shouldScale = !dialogs[DEMO_SALES_ID]

	const handleToggleDemoSales = () => {
		toggleDialog(DEMO_SALES_ID)
	}

	return (
		<Dialog id={DEMO_SALES_ID}>
			<div
				className={cn(
					"relative w-full max-w-lg bg-[#0f111a] border border-white/10 rounded-2xl p-8 shadow-2xl transform transition-all duration-300 ",
					shouldScale ? "scale-95" : "",
				)}
			>
				<button
					type="button"
					name="Fechar Demo"
					onClick={handleToggleDemoSales}
					className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
				>
					<Icon icon="solar:close-circle-bold-duotone" width="24" />
				</button>

				<div className="text-center space-y-2 mb-8">
					<div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
						<Icon icon="solar:chat-round-dots-bold-duotone" width="24" />
					</div>
					<h3 className="text-2xl font-semibold text-white tracking-tight">
						Fale com nossos especialistas
					</h3>
					<p className="text-sm text-slate-400">
						Descubra como o Menu Bão pode transformar seu restaurante.
					</p>
				</div>

				<form className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<span className="text-xs font-medium text-slate-300">Nome</span>
							<Input
								type="text"
								placeholder="Seu nome"
								iconName="solar:user-bold-duotone"
							/>
						</div>
						<div className="space-y-2">
							<span className="text-xs font-medium text-slate-300">
								Sobrenome
							</span>
							<Input
								type="text"
								placeholder="Seu sobrenome"
								iconName="solar:user-bold-duotone"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<span className="text-xs font-medium text-slate-300">
							Email Corporativo
						</span>

						<Input
							type="email"
							placeholder="voce@empresa.com"
							iconName="solar:letter-bold-duotone"
						/>
					</div>

					<div className="space-y-2">
						<span className="text-xs font-medium text-slate-300">
							Nome do Restaurante
						</span>
						<Input
							type="text"
							placeholder="Empresa Ltda."
							iconName="solar:shop-bold-duotone"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<span className="text-xs font-medium text-slate-300">
								Telefone
							</span>
							<Input
								type="tel"
								placeholder="(11) 99999-9999"
								iconName="solar:phone-bold-duotone"
							/>
						</div>
						<div className="space-y-2">
							<span className="text-xs font-medium text-slate-300">
								Nº de Unidades
							</span>
							<select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer">
								<option>1-2 Unidades</option>
								<option>3-10 Unidades</option>
								<option>10+ Unidades</option>
							</select>
						</div>
					</div>
					<Button className="py-3 gap-2 mt-9 shadow-lg">
						Solicitar Demonstração
					</Button>
					<p className="text-[10px] text-center text-slate-600 mt-4">
						Nossa equipe entrará em contato em até 24 horas.
					</p>
				</form>
			</div>
		</Dialog>
	)
}
