import { Icon } from "@iconify-icon/react"
import { useEffect, useRef } from "react"
import { Link } from "react-router"

type HeroSectionProps = {
	onShowDemo: () => void
}

export function HeroSection({ onShowDemo }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: "0px 0px -50px 0px",
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("animate-reveal")
					if (entry.target.classList.contains("reveal-trigger")) {
						entry.target.classList.add("visible")
					}
					observer.unobserve(entry.target)
				}
			})
		}, observerOptions)

		const section = sectionRef.current
		if (section) {
			const elements = section.querySelectorAll(
				".scroll-reveal, .reveal-trigger"
			)
			elements.forEach((el) => observer.observe(el))
		}

		const handleLoad = () => {
			const textClipElements = document.querySelectorAll(".text-clip-reveal")
			textClipElements.forEach((el) => el.classList.add("visible"))
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
			className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20"
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

			<div className="relative z-10 mx-auto mt-10 max-w-4xl px-6 text-center">
				<div className="mb-6 inline-flex animate-reveal items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-medium text-indigo-300 text-xs delay-100">
					<span className="relative flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
						<span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
					</span>
					v2.0 já está disponível
				</div>

				<h1 className="mb-6 bg-linear-to-b from-white to-white/60 bg-clip-text font-medium text-5xl text-transparent leading-[1.1] tracking-tight md:text-7xl">
					<div className="reveal-trigger overflow-hidden text-clip-reveal">
						<span className="pb-2">O sistema operacional</span>
					</div>
					<div className="reveal-trigger overflow-hidden text-clip-reveal delay-100">
						<span className="pb-2">para restaurantes modernos</span>
					</div>
				</h1>

				<p className="mx-auto mb-10 max-w-xl animate-reveal text-base text-slate-400 leading-relaxed delay-300 md:text-lg">
					Agilize pedidos, gerencie estoque e encante clientes com uma interface
					mágica. Rápido, bonito e totalmente personalizável.
				</p>

				<div className="flex animate-reveal flex-col items-center justify-center gap-4 delay-500 md:flex-row">
					<button
						className="group relative cursor-pointer"
						name="Começar Agora"
						type="button"
					>
						<div className="absolute -inset-0.5 rounded-full bg-linear-to-r from-indigo-500 to-purple-600 opacity-50 blur transition duration-200 group-hover:opacity-100" />
						<div className="relative flex items-center divide-x divide-slate-600 rounded-full bg-black px-8 py-3 leading-none">
							<Link
								aria-label="Navegar para criar conta"
								className="flex items-center gap-2 pr-4 font-medium text-slate-100 text-sm transition-colors group-hover:text-white"
								to="/auth/register"
							>
								Começar Agora
							</Link>
							<span className="pl-4 text-slate-400 text-sm transition-colors group-hover:text-slate-200">
								<Icon icon="solar:arrow-right-bold-duotone" />
							</span>
						</div>
					</button>
					<button
						className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-medium text-slate-300 text-sm transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
						name="Ver Demo"
						onClick={onShowDemo}
						type="button"
					>
						Ver Demo
					</button>
				</div>
			</div>

			<div className="relative mt-20 w-full max-w-5xl animate-reveal px-4 delay-700">
				<div className="absolute inset-0 z-10 h-full w-full bg-linear-to-t from-[#030712] via-transparent to-transparent" />
				<div className="relative aspect-video overflow-hidden rounded-t-xl border border-white/10 bg-[#0f111a] shadow-2xl md:aspect-21/9">
					<div className="flex h-10 items-center gap-2 border-white/5 border-b px-4">
						<div className="flex gap-1.5">
							<div className="h-2.5 w-2.5 rounded-full border border-red-500/50 bg-red-500/20" />
							<div className="h-2.5 w-2.5 rounded-full border border-yellow-500/50 bg-yellow-500/20" />
							<div className="h-2.5 w-2.5 rounded-full border border-green-500/50 bg-green-500/20" />
						</div>
						<div className="mx-auto font-mono text-[10px] text-slate-500">
							dashboard.menubao.com.br
						</div>
					</div>
					<div className="grid grid-cols-4 gap-4 p-6 opacity-50">
						<div className="col-span-1 h-32 rounded bg-white/5" />
						<div className="col-span-1 h-32 rounded bg-white/5" />
						<div className="col-span-2 h-32 rounded bg-white/5" />
						<div className="col-span-4 h-48 rounded bg-white/5" />
					</div>
				</div>
			</div>
		</section>
	)
}
