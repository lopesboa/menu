import { Icon } from "@iconify-icon/react"

type HeroSectionProps = {
	signUp: () => void
	onShowDemo: () => void
}

export function HeroSection({ signUp, onShowDemo }: HeroSectionProps) {
	const handleOnStartNow = () => {
		signUp()
	}
	const handleOnShowDemo = () => {
		onShowDemo()
	}

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

	document
		.querySelectorAll(".scroll-reveal, .reveal-trigger")
		.forEach((el) => observer.observe(el))

	window.addEventListener("load", () => {
		document
			.querySelectorAll(".text-clip-reveal")
			.forEach((el) => el.classList.add("visible"))
	})
	return (
		<section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
			<div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 gap-0 pointer-events-none opacity-40 z-0 px-6 max-w-7xl mx-auto border-x border-white/5">
				<div className="bg-grid-col animate-clip delay-100"></div>
				<div className="bg-grid-col animate-clip delay-200"></div>
				<div className="bg-grid-col animate-clip delay-300"></div>
				<div className="bg-grid-col animate-clip delay-500 hidden md:block"></div>
				<div className="bg-grid-col animate-clip delay-100 hidden md:block"></div>
				<div className="bg-grid-col animate-clip delay-200 hidden md:block"></div>
				<div className="bg-grid-col animate-clip delay-300 hidden md:block"></div>
				<div className="bg-grid-col animate-clip delay-100 hidden md:block"></div>
				<div className="bg-grid-col animate-clip delay-500 hidden md:block"></div>
				<div className="bg-grid-col animate-clip delay-200 hidden md:block"></div>
				<div className="bg-grid-col animate-clip delay-300"></div>
				<div className="bg-grid-col animate-clip delay-100"></div>
			</div>

			<div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-10">
				<div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium animate-reveal delay-100">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
					</span>
					v2.0 já está disponível
				</div>

				<h1 className="text-5xl md:text-7xl font-medium tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 mb-6 leading-[1.1]">
					<div className="overflow-hidden text-clip-reveal reveal-trigger">
						<span className="pb-2">O sistema operacional</span>
					</div>
					<div className="overflow-hidden text-clip-reveal reveal-trigger delay-100">
						<span className="pb-2">para restaurantes modernos</span>
					</div>
				</h1>

				<p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed animate-reveal delay-300">
					Agilize pedidos, gerencie estoque e encante clientes com uma interface
					mágica. Rápido, bonito e totalmente personalizável.
				</p>

				<div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-reveal delay-500">
					<button
						type="button"
						onClick={handleOnStartNow}
						className="relative group cursor-pointer"
					>
						<div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-200"></div>
						<div className="relative px-8 py-3 bg-black rounded-full leading-none flex items-center divide-x divide-slate-600">
							<span className="flex items-center gap-2 text-slate-100 pr-4 group-hover:text-white transition-colors text-sm font-medium">
								Começar Agora
							</span>
							<span className="pl-4 text-slate-400 group-hover:text-slate-200 transition-colors text-sm">
								<Icon icon="solar:arrow-right-bold-duotone" />
							</span>
						</div>
					</button>
					<button
						type="button"
						className="px-8 py-3 rounded-full text-sm font-medium text-slate-300 hover:text-white transition-colors border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10"
						onClick={handleOnShowDemo}
					>
						Ver Demo
					</button>
				</div>
			</div>

			<div className="mt-20 relative w-full max-w-5xl px-4 animate-reveal delay-700">
				<div className="absolute inset-0 bg-linear-to-t from-[#030712] via-transparent to-transparent z-10 h-full w-full"></div>
				<div className="relative rounded-t-xl border border-white/10 bg-[#0f111a] shadow-2xl overflow-hidden aspect-video md:aspect-21/9">
					<div className="h-10 border-b border-white/5 flex items-center px-4 gap-2">
						<div className="flex gap-1.5">
							<div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
							<div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
							<div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
						</div>
						<div className="mx-auto text-[10px] text-slate-500 font-mono">
							dashboard.menubao.com.br
						</div>
					</div>
					<div className="p-6 grid grid-cols-4 gap-4 opacity-50">
						<div className="col-span-1 h-32 rounded bg-white/5"></div>
						<div className="col-span-1 h-32 rounded bg-white/5"></div>
						<div className="col-span-2 h-32 rounded bg-white/5"></div>
						<div className="col-span-4 h-48 rounded bg-white/5"></div>
					</div>
				</div>
			</div>
		</section>
	)
}
