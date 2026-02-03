import { Icon } from "@iconify-icon/react"
import { ROI_ID, SIGN_UP_MODAL_ID } from "@/app/constants"
import { useDialogActions } from "@/app/store/dialog"
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
			<section className="relative border-white/5 border-y bg-black py-24">
				<div className="mx-auto max-w-7xl px-6">
					<div className="scroll-reveal mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
						<div>
							<h2 className="mb-2 font-medium text-3xl text-white tracking-tight md:text-4xl">
								Resultados reais
							</h2>
							<p className="text-slate-400">
								Não acredite apenas na nossa palavra. Veja os números.
							</p>
						</div>

						<button
							className="relative flex transform cursor-pointer items-center gap-2 rounded-lg bg-white px-6 py-2.5 font-medium text-black text-sm shadow-lg transition-colors duration-200 hover:scale-105 hover:bg-slate-200 hover:shadow-xl"
							name="Calcular seu ROI"
							onClick={handleOnToggleROIDemo}
							type="button"
						>
							Calcular seu ROI{" "}
							<Icon icon="solar:calculator-minimalistic-bold-duotone" />
						</button>
					</div>

					<div className="grid h-auto grid-cols-1 grid-rows-2 gap-4 md:h-125 md:grid-cols-4">
						<div className="group scroll-reveal relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f111a] p-8 delay-100 md:col-span-2 md:row-span-2">
							<div className="absolute top-0 right-0 rounded-full bg-indigo-500/10 p-32 blur-[80px] transition-all group-hover:bg-indigo-500/20" />
							<div className="mb-6 flex items-center gap-3">
								<div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-400">
									<Icon icon="solar:graph-new-up-bold-duotone" width="24" />
								</div>
								<span className="font-medium text-slate-300 text-sm">
									Crescimento Médio
								</span>
							</div>
							<div className="mb-2 font-semibold text-5xl text-white tracking-tight md:text-6xl">
								+30%
							</div>
							<p className="mb-auto text-slate-400 text-sm">
								Aumento de receita no primeiro trimestre de uso.
							</p>

							<div className="mt-8 flex h-32 w-full items-end gap-1 opacity-50">
								<div className="h-[20%] w-full rounded-t-sm bg-white/5" />
								<div className="h-[35%] w-full rounded-t-sm bg-white/5" />
								<div className="h-[50%] w-full rounded-t-sm bg-white/5" />
								<div className="h-[40%] w-full rounded-t-sm bg-white/5" />
								<div className="h-[75%] w-full rounded-t-sm bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
								<div className="h-[60%] w-full rounded-t-sm bg-white/5" />
							</div>
						</div>

						<div className="scroll-reveal group flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#0f111a] p-6 delay-200 md:col-span-2 md:row-span-1 md:flex-row">
							<div>
								<div className="mb-2 flex items-center gap-2">
									<Icon
										className="text-emerald-400"
										icon="solar:clock-circle-bold-duotone"
									/>
									<span className="font-medium text-slate-300 text-sm">
										Tempo Economizado
									</span>
								</div>
								<div className="font-medium text-3xl text-white">
									-15 Horas/sem
								</div>
								<p className="mt-1 text-slate-500 text-xs">
									Em gestão manual de pedidos.
								</p>
							</div>
							<div className="animation-duration flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-emerald-500/20 border-t-emerald-500">
								<Icon
									className="remove-animation animate-none text-emerald-400 text-xl"
									icon="solar:check-read-bold-duotone"
								/>
							</div>
						</div>

						<div className="scroll-reveal rounded-2xl border border-white/10 bg-[#0f111a] p-6 transition-colors delay-300 hover:border-white/20 md:col-span-1 md:row-span-1">
							<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
								<Icon icon="solar:chat-round-dots-bold-duotone" width="20" />
							</div>
							<h3 className="mb-1 font-medium text-lg text-white">
								WhatsApp IA
							</h3>
							<p className="text-slate-400 text-xs">
								Atendimento automático 24/7.
							</p>
						</div>

						<div className="scroll-reveal rounded-2xl border border-white/10 bg-[#0f111a] p-6 transition-colors delay-400 hover:border-white/20 md:col-span-1 md:row-span-1">
							<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
								<Icon icon="solar:shield-warning-bold-duotone" width="20" />
							</div>
							<h3 className="mb-1 font-medium text-lg text-white">
								Zero Erros
							</h3>
							<p className="text-slate-400 text-xs">Fim dos pedidos errados.</p>
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
