export function TestimonialsSection() {
	return (
		<section
			id="testimonials"
			className="py-20 border-y border-white/5 bg-black/20"
		>
			<div className="marquee-container overflow-hidden relative">
				<div className="marquee-content flex gap-6 items-center">
					<div className="w-80 p-6 rounded-xl bg-white/5 border border-white/5 shrink-0">
						<p className="text-sm text-slate-300 mb-4">
							"O Menu Bão transformou nosso delivery. Economizamos cerca de 20
							horas por semana."
						</p>
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-full bg-slate-700"></div>
							<div className="text-xs">
								<div className="text-white font-medium">Alex Silva</div>
								<div className="text-slate-500">Dono, Dim Sum Co.</div>
							</div>
						</div>
					</div>
					<div className="w-80 p-6 rounded-xl bg-white/5 border border-white/5 shrink-0">
						<p className="text-sm text-slate-300 mb-4">
							"A interface é muito limpa. O treinamento da equipe levou menos de
							15 minutos."
						</p>
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-full bg-slate-700"></div>
							<div className="text-xs">
								<div className="text-white font-medium">Sarah Costa</div>
								<div className="text-slate-500">Gerente, The Grind</div>
							</div>
						</div>
					</div>
					<div className="w-80 p-6 rounded-xl bg-white/5 border border-white/5 shrink-0">
						<p className="text-sm text-slate-300 mb-4">
							"Melhor investimento do ano. Os relatórios são incríveis."
						</p>
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-full bg-slate-700"></div>
							<div className="text-xs">
								<div className="text-white font-medium">Julia Lopes</div>
								<div className="text-slate-500">Fundadora, Bowl'd</div>
							</div>
						</div>
					</div>
					<div className="w-80 p-6 rounded-xl bg-white/5 border border-white/5 shrink-0">
						<p className="text-sm text-slate-300 mb-4">
							"O suporte é sensacional. Resolveram meu problema em 5 minutos."
						</p>
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-full bg-slate-700"></div>
							<div className="text-xs">
								<div className="text-white font-medium">Mike Rocha</div>
								<div className="text-slate-500">Chef, Italianio</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
