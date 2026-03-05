export function TestimonialsSection() {
	const testimonials = [
		{
			quote:
				"Em 45 dias, reportamos +18% no ticket médio com adoção simples da equipe.",
			author: "Camila Ferreira",
			role: "Proprietária",
			context: "Hamburgueria artesanal · Belo Horizonte/MG",
			result: "+18% no ticket médio",
			period: "45 dias de uso (dados reportados)",
		},
		{
			quote:
				"Após 30 dias, reportamos -22% no tempo médio de atendimento no delivery.",
			author: "Rafael Nogueira",
			role: "Sócio-operador",
			context: "Pizzaria delivery · Curitiba/PR",
			result: "-22% no tempo de atendimento",
			period: "30 dias de uso (dados reportados)",
		},
		{
			quote:
				"Em 60 dias, reportamos -35% em retrabalho de pedidos com processo padronizado.",
			author: "Juliana Matos",
			role: "Gerente de operações",
			context: "Cafeteria · São Paulo/SP",
			result: "-35% em retrabalho de pedidos",
			period: "60 dias de uso (dados reportados)",
		},
		{
			quote:
				"Após 90 dias, reportamos +27% em pedidos diretos no canal próprio.",
			author: "André Luiz Santos",
			role: "Diretor",
			context: "Restaurante por quilo · Recife/PE",
			result: "+27% em pedidos diretos",
			period: "90 dias de uso (dados reportados)",
		},
	]

	return (
		<section
			className="border-white/5 border-y bg-black/20 py-20"
			id="testimonials"
		>
			<div className="mx-auto mb-10 max-w-3xl px-6 text-center">
				<h2 className="mb-3 font-medium text-3xl text-white tracking-tight md:text-4xl">
					Resultados reais, com contexto
				</h2>
				<p className="text-slate-400 text-sm md:text-base">
					Dados reportados por clientes ativos entre jan/2026 e mar/2026, após
					período mínimo de uso da plataforma.
				</p>
			</div>

			<div className="marquee-container relative overflow-hidden">
				<div className="marquee-content flex items-center gap-6">
					{testimonials.map((testimonial) => (
						<article
							className="w-80 shrink-0 rounded-xl border border-white/5 bg-white/5 p-6"
							key={testimonial.author}
						>
							<blockquote className="mb-4 text-slate-300 text-sm">
								&quot;{testimonial.quote}&quot;
							</blockquote>
							<div className="mb-3 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs">
								<div className="font-medium text-emerald-300">
									{testimonial.result}
								</div>
								<div className="text-slate-500">{testimonial.period}</div>
							</div>
							<footer className="flex items-center gap-3">
								<div className="h-8 w-8 rounded-full bg-slate-700" />
								<div className="text-xs">
									<div className="font-medium text-white">
										{testimonial.author}
									</div>
									<div className="text-slate-400">{testimonial.role}</div>
									<div className="text-slate-500">{testimonial.context}</div>
								</div>
							</footer>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
