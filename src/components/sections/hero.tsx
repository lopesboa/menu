import { Icon } from "@iconify-icon/react"
import { useEffect, useRef } from "react"
import { Link } from "react-router"

interface HeroSectionProps {
	onShowDemo: (params: { ctaLabel: string; ctaPosition: string }) => void
	onStartRegister: (params: { ctaLabel: string; ctaPosition: string }) => void
}

export function HeroSection({ onShowDemo, onStartRegister }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: "0px 0px -50px 0px",
		}

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add("animate-reveal")
					if (entry.target.classList.contains("reveal-trigger")) {
						entry.target.classList.add("visible")
					}
					observer.unobserve(entry.target)
				}
			}
		}, observerOptions)

		const section = sectionRef.current
		if (section) {
			const elements = section.querySelectorAll(
				".scroll-reveal, .reveal-trigger"
			)
			for (const el of elements) {
				observer.observe(el)
			}
		}

		const handleLoad = () => {
			const textClipElements = document.querySelectorAll(".text-clip-reveal")
			for (const el of textClipElements) {
				el.classList.add("visible")
			}
		}

		if (document.readyState === "complete") {
			handleLoad()
		} else {
			window.addEventListener("load", handleLoad)
		}

		return () => {
			observer.disconnect()
			window.removeEventListener("load", handleLoad)
		}
	}, [])

	return (
		<section
			className="relative overflow-hidden pt-20 pb-10 md:min-h-screen md:pt-28 md:pb-16"
			ref={sectionRef}
		>
			<div className="pointer-events-none absolute inset-0 z-0 mx-auto grid max-w-7xl grid-cols-6 gap-0 border-white/5 border-x px-6 opacity-40 md:grid-cols-12">
				<div className="animate-clip bg-grid-col delay-100" />
				<div className="animate-clip bg-grid-col delay-200" />
				<div className="animate-clip bg-grid-col delay-300" />
				<div className="hidden animate-clip bg-grid-col delay-500 md:block" />
				<div className="hidden animate-clip bg-grid-col delay-100 md:block" />
				<div className="hidden animate-clip bg-grid-col delay-200 md:block" />
				<div className="hidden animate-clip bg-grid-col delay-300 md:block" />
				<div className="hidden animate-clip bg-grid-col delay-100 md:block" />
				<div className="hidden animate-clip bg-grid-col delay-500 md:block" />
				<div className="hidden animate-clip bg-grid-col delay-200 md:block" />
				<div className="animate-clip bg-grid-col delay-300" />
				<div className="animate-clip bg-grid-col delay-100" />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6">
				<div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-12">
					<div className="max-w-2xl text-left">
						<h1 className="mb-6 font-medium text-4xl text-slate-50 leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							<div className="reveal-trigger overflow-hidden text-clip-reveal">
								<span className="pb-2">Controle pedidos, estoque</span>
							</div>
							<div className="reveal-trigger overflow-hidden text-clip-reveal delay-100">
								<span className="pb-2">
									e atendimento sem travar a operação
								</span>
							</div>
						</h1>

						<p className="mb-7 max-w-xl animate-reveal text-base text-slate-300 leading-relaxed delay-300 md:mb-8 md:text-lg">
							Organize salão, delivery e balcão em um sistema que reduz erros no
							horário de pico, acelera a equipe e dá visibilidade do estoque
							antes de virar problema.
						</p>

						<div className="flex animate-reveal flex-col items-stretch gap-2.5 delay-500 sm:flex-row sm:items-center sm:gap-3">
							<Link
								aria-label="Navegar para criar conta grátis"
								className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-white px-6 py-3 font-medium text-black text-sm shadow-[0_10px_30px_rgba(255,255,255,0.14)] transition-all hover:bg-slate-200 hover:shadow-[0_12px_36px_rgba(255,255,255,0.2)] sm:min-w-56"
								onClick={() => {
									onStartRegister({
										ctaLabel: "Criar conta grátis",
										ctaPosition: "hero_primary",
									})
								}}
								to="/register"
							>
								<span className="flex items-center gap-2">
									Criar conta grátis
									<Icon
										className="transition-transform group-hover:translate-x-0.5"
										icon="solar:arrow-right-bold-duotone"
									/>
								</span>
							</Link>
							<button
								className="inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2 font-medium text-slate-300 text-sm transition-colors hover:text-white sm:min-w-44 sm:border sm:border-white/10 sm:bg-white/5 sm:px-6 sm:py-3 sm:hover:border-white/20 sm:hover:bg-white/10"
								name="Ver demonstração"
								onClick={() => {
									onShowDemo({
										ctaLabel: "Ver demonstração",
										ctaPosition: "hero_secondary",
									})
								}}
								type="button"
							>
								Ver demonstração
							</button>
						</div>

						<div className="mt-4 animate-reveal text-slate-500 text-sm delay-700 md:mt-5">
							Sem cartão de crédito para começar.
						</div>

						<div className="mt-6 grid animate-reveal gap-2.5 delay-700 sm:mt-8 sm:grid-cols-3 sm:gap-3">
							<div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4 backdrop-blur-sm">
								<p className="font-medium text-slate-100 text-sm">
									Feito para horário de pico
								</p>
								<p className="mt-1 text-slate-400 text-sm">
									Organize pedidos de canais diferentes sem perder prioridade
									nem contexto.
								</p>
							</div>
							<div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4 backdrop-blur-sm">
								<p className="font-medium text-slate-100 text-sm">
									Um fluxo para a operação
								</p>
								<p className="mt-1 text-slate-400 text-sm">
									Salão, delivery e balcão no mesmo painel para a equipe agir
									mais rápido.
								</p>
							</div>
							<div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4 backdrop-blur-sm">
								<p className="font-medium text-slate-100 text-sm">
									Contexto antes da decisão
								</p>
								<p className="mt-1 text-slate-400 text-sm">
									Logo abaixo, você vê os tipos de operação que já usam o Menu
									Bão no dia a dia.
								</p>
							</div>
						</div>
					</div>

					<div className="relative animate-reveal delay-500 lg:pl-2">
						<div className="absolute inset-0 rounded-[28px] bg-linear-to-br from-indigo-500/15 via-transparent to-cyan-500/10 blur-3xl" />
						<div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0f111a]/95 shadow-2xl">
							<div className="flex items-center justify-between border-white/5 border-b px-5 py-4">
								<div>
									<p className="font-medium text-slate-100 text-sm">
										Resumo do turno
									</p>
									<p className="text-slate-500 text-xs">
										Painel operacional em tempo real
									</p>
								</div>
								<div className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-300 text-xs">
									Equipe online
								</div>
							</div>
							<div className="space-y-4 p-5">
								<div className="grid gap-3 sm:grid-cols-3">
									<div className="rounded-2xl border border-white/8 bg-white/4 p-4">
										<p className="text-slate-500 text-xs">Pedidos em preparo</p>
										<p className="mt-2 font-medium text-2xl text-white">18</p>
										<p className="mt-1 text-emerald-300 text-xs">
											Fila organizada por prioridade
										</p>
									</div>
									<div className="rounded-2xl border border-white/8 bg-white/4 p-4">
										<p className="text-slate-500 text-xs">
											Itens com estoque baixo
										</p>
										<p className="mt-2 font-medium text-2xl text-white">3</p>
										<p className="mt-1 text-amber-300 text-xs">
											Alertas antes da ruptura
										</p>
									</div>
									<div className="rounded-2xl border border-white/8 bg-white/4 p-4">
										<p className="text-slate-500 text-xs">
											Tempo médio do pedido
										</p>
										<p className="mt-2 font-medium text-2xl text-white">
											12 min
										</p>
										<p className="mt-1 text-sky-300 text-xs">
											Visão por canal e etapa
										</p>
									</div>
								</div>
								<div className="rounded-3xl border border-white/8 bg-black/30 p-4">
									<div className="mb-4 flex items-center justify-between">
										<div>
											<p className="font-medium text-slate-100 text-sm">
												Fluxo do atendimento
											</p>
											<p className="text-slate-500 text-xs">
												Pedidos centralizados por canal
											</p>
										</div>
										<div className="flex gap-2 text-[11px]">
											<span className="rounded-full bg-white/6 px-2 py-1 text-slate-400">
												Salão
											</span>
											<span className="rounded-full bg-white/6 px-2 py-1 text-slate-400">
												Delivery
											</span>
											<span className="rounded-full bg-white/6 px-2 py-1 text-slate-400">
												Balcão
											</span>
										</div>
									</div>
									<div className="space-y-3">
										<div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/4 px-4 py-3">
											<div>
												<p className="font-medium text-slate-100 text-sm">
													Pedido #2841
												</p>
												<p className="text-slate-500 text-xs">
													iFood • 3 itens • pago
												</p>
											</div>
											<span className="rounded-full bg-indigo-500/15 px-2.5 py-1 font-medium text-indigo-300 text-xs">
												Em preparo
											</span>
										</div>
										<div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/4 px-4 py-3">
											<div>
												<p className="font-medium text-slate-100 text-sm">
													Mesa 07
												</p>
												<p className="text-slate-500 text-xs">
													Salão • aguardando fechamento
												</p>
											</div>
											<span className="rounded-full bg-amber-500/15 px-2.5 py-1 font-medium text-amber-300 text-xs">
												Atenção
											</span>
										</div>
										<div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/4 px-4 py-3">
											<div>
												<p className="font-medium text-slate-100 text-sm">
													Retirada 192
												</p>
												<p className="text-slate-500 text-xs">
													Balcão • pronto para entrega
												</p>
											</div>
											<span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-medium text-emerald-300 text-xs">
												Pronto
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
