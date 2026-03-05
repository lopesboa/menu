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
					"relative w-full max-w-lg transform rounded-2xl border border-white/10 bg-[#0f111a] p-8 shadow-2xl transition-all duration-300",
					shouldScale ? "scale-95" : ""
				)}
			>
				<button
					className="absolute top-4 right-4 text-slate-500 transition-colors hover:text-white"
					name="Fechar Demo"
					onClick={handleToggleDemoSales}
					type="button"
				>
					<Icon icon="solar:close-circle-bold-duotone" width="24" />
				</button>

				<div className="mb-8 space-y-2 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
						<Icon icon="solar:chat-round-dots-bold-duotone" width="24" />
					</div>
					<h3 className="font-semibold text-2xl text-white tracking-tight">
						Veja, em poucos minutos, como o Menu Bão funciona no seu restaurante
					</h3>
					<p className="text-slate-400 text-sm">
						Agende uma demo rápida e prática para entender como vender mais com
						menos operação manual.
					</p>
				</div>

				<form className="space-y-4">
					<div className="space-y-2">
						<span className="font-medium text-slate-300 text-xs">Nome</span>
						<Input
							iconName="solar:user-bold-duotone"
							placeholder="Ex.: Ana"
							type="text"
						/>
					</div>

					<div className="space-y-2">
						<span className="font-medium text-slate-300 text-xs">
							E-mail de trabalho
						</span>

						<Input
							iconName="solar:letter-bold-duotone"
							placeholder="nome@restaurante.com.br"
							type="email"
						/>
					</div>

					<div className="space-y-2">
						<span className="font-medium text-slate-300 text-xs">
							Nome do restaurante
						</span>
						<Input
							iconName="solar:shop-bold-duotone"
							placeholder="Ex.: Sabor da Vila"
							type="text"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<span className="font-medium text-slate-300 text-xs">
								WhatsApp
							</span>
							<Input
								iconName="solar:phone-bold-duotone"
								placeholder="(11) 99999-9999"
								type="tel"
							/>
						</div>
						<div className="space-y-2">
							<span className="font-medium text-slate-300 text-xs">
								Quantidade de unidades
							</span>
							<select className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white transition-all placeholder:text-slate-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50">
								<option>Selecione</option>
								<option>1 a 2 unidades</option>
								<option>3 a 10 unidades</option>
								<option>11 ou mais unidades</option>
							</select>
						</div>
					</div>
					<Button className="mt-9 gap-2 py-3 shadow-lg">
						Quero agendar minha demo
					</Button>
					<p className="mt-4 text-center text-[10px] text-slate-600">
						Retorno em até 24h úteis. Seus dados são usados apenas para agendar
						a demo.
					</p>
				</form>
			</div>
		</Dialog>
	)
}
