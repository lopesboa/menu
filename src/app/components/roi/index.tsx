import { Icon } from "@iconify-icon/react"
import { ROI_ID, SIGN_UP_MODAL_ID } from "../../constants"
import { useDialogActions } from "../../store/dialog"
import { ShowROI } from "./show-roi"

export function ROISection() {
	const { openDialog, toggleDialog } = useDialogActions()

	const handleOnToggleROIDemo = () => {
		toggleDialog(ROI_ID)
	}

	const handleOnStartNow = () => {
		toggleDialog(ROI_ID)
		openDialog(SIGN_UP_MODAL_ID)
	}

	return (
		<>
			<section className="py-24 bg-black border-y border-white/5 relative">
				<div className="max-w-7xl mx-auto px-6">
					<div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 scroll-reveal">
						<div>
							<h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-2">
								Resultados reais
							</h2>
							<p className="text-slate-400">
								Não acredite apenas na nossa palavra. Veja os números.
							</p>
						</div>

						<button
							type="button"
							onClick={handleOnToggleROIDemo}
							className="relative px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
						>
							Calcular seu ROI{" "}
							<Icon icon="solar:calculator-minimalistic-bold-duotone" />
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-125">
						<div className="md:col-span-2 md:row-span-2 rounded-2xl bg-[#0f111a] border border-white/10 p-8 flex flex-col relative overflow-hidden group scroll-reveal delay-100">
							<div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-all"></div>
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
									<Icon icon="solar:graph-new-up-bold-duotone" width="24" />
								</div>
								<span className="text-sm font-medium text-slate-300">
									Crescimento Médio
								</span>
							</div>
							<div className="text-5xl md:text-6xl font-semibold text-white mb-2 tracking-tight">
								+30%
							</div>
							<p className="text-slate-400 text-sm mb-auto">
								Aumento de receita no primeiro trimestre de uso.
							</p>

							<div className="h-32 w-full flex items-end gap-1 mt-8 opacity-50">
								<div className="w-full bg-white/5 h-[20%] rounded-t-sm"></div>
								<div className="w-full bg-white/5 h-[35%] rounded-t-sm"></div>
								<div className="w-full bg-white/5 h-[50%] rounded-t-sm"></div>
								<div className="w-full bg-white/5 h-[40%] rounded-t-sm"></div>
								<div className="w-full bg-indigo-500 h-[75%] rounded-t-sm shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
								<div className="w-full bg-white/5 h-[60%] rounded-t-sm"></div>
							</div>
						</div>

						<div className="md:col-span-2 md:row-span-1 rounded-2xl bg-[#0f111a] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 scroll-reveal delay-200 group">
							<div>
								<div className="flex items-center gap-2 mb-2">
									<Icon
										icon="solar:clock-circle-bold-duotone"
										className="text-emerald-400"
									/>
									<span className="text-sm font-medium text-slate-300">
										Tempo Economizado
									</span>
								</div>
								<div className="text-3xl font-medium text-white">
									-15 Horas/sem
								</div>
								<p className="text-xs text-slate-500 mt-1">
									Em gestão manual de pedidos.
								</p>
							</div>
							<div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center animate-spin animation-duration">
								<Icon
									icon="solar:check-read-bold-duotone"
									className="text-emerald-400 text-xl animate-none remove-animation"
								/>
							</div>
						</div>

						<div className="md:col-span-1 md:row-span-1 rounded-2xl bg-[#0f111a] border border-white/10 p-6 scroll-reveal delay-300 hover:border-white/20 transition-colors">
							<div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
								<Icon icon="solar:chat-round-dots-bold-duotone" width="20" />
							</div>
							<h3 className="text-lg font-medium text-white mb-1">
								WhatsApp IA
							</h3>
							<p className="text-xs text-slate-400">
								Atendimento automático 24/7.
							</p>
						</div>

						<div className="md:col-span-1 md:row-span-1 rounded-2xl bg-[#0f111a] border border-white/10 p-6 scroll-reveal delay-400 hover:border-white/20 transition-colors">
							<div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
								<Icon icon="solar:shield-warning-bold-duotone" width="20" />
							</div>
							<h3 className="text-lg font-medium text-white mb-1">
								Zero Erros
							</h3>
							<p className="text-xs text-slate-400">Fim dos pedidos errados.</p>
						</div>
					</div>
				</div>
			</section>
			<ShowROI
				onCloseDemo={handleOnToggleROIDemo}
				onStartNow={handleOnStartNow}
			/>
		</>
	)
}
