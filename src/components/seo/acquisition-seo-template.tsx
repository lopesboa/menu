import { Link } from "react-router"
import type { AcquisitionPage } from "@/app/routes/seo/data/acquisition-pages"
import { Button } from "@/components/ui/button"

interface AcquisitionSEOProps {
	page: AcquisitionPage
	onShowDemo: (payload: { ctaLabel: string; ctaPosition: string }) => void
	onStartRegister: (payload: { ctaLabel: string; ctaPosition: string }) => void
}

export function AcquisitionSEOTemplate({
	page,
	onShowDemo,
	onStartRegister,
}: AcquisitionSEOProps) {
	return (
		<main className="relative overflow-hidden">
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_45%)]" />

			<div className="mx-auto max-w-6xl px-6 pt-28 pb-24 md:pt-32">
				<nav
					aria-label="Breadcrumb"
					className="mb-8 animate-reveal text-slate-400 text-sm"
				>
					<ol className="flex flex-wrap items-center gap-2">
						<li>
							<Link className="hover:text-white" to="/">
								Início
							</Link>
						</li>
						<li aria-hidden className="text-slate-600">
							/
						</li>
						<li>
							<Link
								className="hover:text-white"
								to="/solucoes/sistema-para-restaurante"
							>
								Soluções
							</Link>
						</li>
						<li aria-hidden className="text-slate-600">
							/
						</li>
						<li aria-current="page" className="text-slate-200">
							{page.hero.eyebrow}
						</li>
					</ol>
				</nav>

				<header className="max-w-4xl space-y-6">
					<p className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 font-medium text-indigo-200 text-xs uppercase tracking-wide">
						{page.hero.eyebrow}
					</p>
					<h1 className="animate-reveal font-semibold text-4xl text-white leading-tight tracking-tight delay-100 md:text-5xl">
						{page.hero.title}
					</h1>
					<p className="max-w-3xl animate-reveal text-lg text-slate-300 leading-relaxed delay-200">
						{page.hero.description}
					</p>
					<ul className="grid animate-reveal gap-3 text-slate-200 text-sm leading-relaxed delay-300 sm:grid-cols-2">
						{page.hero.supportingPoints.map((point) => (
							<li
								className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indigo-300/40 hover:bg-white/[0.06]"
								key={point}
							>
								{point}
							</li>
						))}
					</ul>
					<div className="flex animate-reveal flex-col gap-4 pt-2 delay-400 sm:flex-row sm:items-center">
						<Button className="rounded-full px-8 py-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] active:scale-[0.98] sm:w-auto">
							<Link
								aria-label="Navegar para criar conta grátis"
								onClick={() => {
									onStartRegister({
										ctaLabel: page.hero.primaryCta,
										ctaPosition: "hero_primary",
									})
								}}
								to="/register"
							>
								{page.hero.primaryCta}
							</Link>
						</Button>
						<Button
							className="rounded-full px-8 py-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indigo-300/50 active:scale-[0.98] sm:w-auto"
							onClick={() => {
								onShowDemo({
									ctaLabel: page.hero.secondaryCta,
									ctaPosition: "hero_secondary",
								})
							}}
							variant="secondary"
						>
							{page.hero.secondaryCta}
						</Button>
					</div>
					<p className="animate-reveal text-slate-400 text-sm delay-500">
						{page.hero.trustNote}
					</p>
				</header>

				<section aria-labelledby="perfil-operacao" className="mt-16">
					<h2
						className="font-semibold text-2xl text-white tracking-tight"
						id="perfil-operacao"
					>
						Para quem esta solucao faz sentido
					</h2>
					<ul className="mt-6 grid gap-4 md:grid-cols-3">
						{page.fitProfile.map((profile) => (
							<li
								className="rounded-2xl border border-white/10 bg-black/25 p-5 text-slate-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-400/35 hover:bg-black/35"
								key={profile}
							>
								{profile}
							</li>
						))}
					</ul>
				</section>

				<section
					aria-labelledby="prova-operacional"
					className="mt-16 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-7"
				>
					<h2
						className="font-semibold text-2xl text-white tracking-tight"
						id="prova-operacional"
					>
						{page.proof.title}
					</h2>
					<p className="mt-3 text-slate-200 leading-relaxed">
						{page.proof.description}
					</p>
					<p className="mt-3 text-emerald-200 text-sm">
						Fonte: {page.proof.source}
					</p>
				</section>

				<section aria-labelledby="desafios-operacao" className="mt-16">
					<h2
						className="font-semibold text-2xl text-white tracking-tight"
						id="desafios-operacao"
					>
						Desafios operacionais mais comuns
					</h2>
					<ul className="mt-6 grid gap-4 md:grid-cols-3">
						{page.problems.map((problem) => (
							<li
								className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-slate-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-400/35 hover:bg-white/[0.04]"
								key={problem}
							>
								{problem}
							</li>
						))}
					</ul>
				</section>

				<section aria-labelledby="estrutura-solucao" className="mt-16">
					<h2
						className="font-semibold text-2xl text-white tracking-tight"
						id="estrutura-solucao"
					>
						Como o Menu Bão organiza sua operação
					</h2>
					<div className="mt-6 grid gap-4 md:grid-cols-3">
						{page.solutions.map((item) => (
							<section
								className="rounded-2xl border border-white/10 bg-black/30 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-400/35 hover:bg-black/40"
								key={item.title}
							>
								<h3 className="font-medium text-lg text-white">{item.title}</h3>
								<p className="mt-3 text-slate-300 leading-relaxed">
									{item.description}
								</p>
							</section>
						))}
					</div>
				</section>

				<section aria-labelledby="como-implantar" className="mt-16">
					<h2
						className="font-semibold text-2xl text-white tracking-tight"
						id="como-implantar"
					>
						Como implantar sem parar a operacao
					</h2>
					<div className="mt-6 grid gap-4 md:grid-cols-3">
						{page.operationFlow.map((step, index) => (
							<section
								className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-400/35 hover:bg-white/[0.04]"
								key={step.title}
							>
								<p className="font-medium text-indigo-200 text-xs uppercase tracking-wide">
									Etapa {index + 1}
								</p>
								<h3 className="mt-2 font-medium text-lg text-white">
									{step.title}
								</h3>
								<p className="mt-3 text-slate-300 leading-relaxed">
									{step.description}
								</p>
							</section>
						))}
					</div>
				</section>

				<section className="mt-16 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-7">
					<h2 className="font-semibold text-2xl text-white tracking-tight">
						{page.ctaBand.title}
					</h2>
					<p className="mt-3 max-w-3xl text-slate-200 leading-relaxed">
						{page.ctaBand.description}
					</p>
					<div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
						<Button className="rounded-full px-8 py-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] active:scale-[0.98] sm:w-auto">
							<Link
								aria-label="Navegar para criar conta grátis"
								onClick={() => {
									onStartRegister({
										ctaLabel: page.hero.primaryCta,
										ctaPosition: "mid_primary",
									})
								}}
								to="/register"
							>
								{page.hero.primaryCta}
							</Link>
						</Button>
						<Button
							className="rounded-full px-8 py-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indigo-300/50 active:scale-[0.98] sm:w-auto"
							onClick={() => {
								onShowDemo({
									ctaLabel: page.hero.secondaryCta,
									ctaPosition: "mid_secondary",
								})
							}}
							variant="secondary"
						>
							{page.hero.secondaryCta}
						</Button>
					</div>
					<p className="mt-4 text-indigo-100 text-sm">{page.ctaBand.note}</p>
				</section>

				<section aria-labelledby="faq-solucoes" className="mt-16">
					<h2 className="font-semibold text-2xl text-white" id="faq-solucoes">
						Perguntas frequentes
					</h2>
					<div className="mt-6 space-y-4">
						{page.faq.map((faq) => (
							<details
								className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 ease-out open:border-indigo-400/45 hover:border-indigo-400/35 hover:bg-white/[0.04]"
								key={faq.question}
							>
								<summary className="flex cursor-pointer list-none items-center justify-between gap-4 pr-1 font-medium text-white marker:content-none">
									<span>{faq.question}</span>
									<span className="text-indigo-200 transition-transform duration-300 group-open:rotate-45">
										+
									</span>
								</summary>
								<p className="mt-3 text-slate-300 leading-relaxed">
									{faq.answer}
								</p>
							</details>
						))}
					</div>
				</section>

				<section aria-labelledby="links-internos-seo" className="mt-16">
					<h2
						className="font-semibold text-2xl text-white"
						id="links-internos-seo"
					>
						Continue sua avaliação
					</h2>
					<ul className="mt-6 grid gap-4 md:grid-cols-3">
						{page.internalLinks.map((link) => (
							<li
								className="rounded-2xl border border-white/10 bg-black/30 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-400/35 hover:bg-black/40"
								key={link.href}
							>
								<Link
									className="font-medium text-white transition-colors duration-200 hover:text-indigo-200"
									to={link.href}
								>
									{link.label}
								</Link>
								<p className="mt-2 text-slate-400 text-sm">
									{link.description}
								</p>
							</li>
						))}
					</ul>
				</section>
			</div>
		</main>
	)
}
