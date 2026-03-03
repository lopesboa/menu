export function TestimonialsSection() {
	return (
		<section
			className="border-white/5 border-y bg-black/20 py-20"
			id="testimonials"
		>
			<div className="marquee-container relative overflow-hidden">
				<div className="marquee-content flex items-center gap-6">
					<div className="w-80 shrink-0 rounded-xl border border-white/5 bg-white/5 p-6">
						<p className="mb-4 text-slate-300 text-sm">
							"O Menu Bão transformou nosso delivery. Economizamos cerca de 20
							horas por semana."
						</p>
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-slate-700" />
							<div className="text-xs">
								<div className="font-medium text-white">Alex Silva</div>
								<div className="text-slate-500">Dono, Dim Sum Co.</div>
							</div>
						</div>
					</div>
					<div className="w-80 shrink-0 rounded-xl border border-white/5 bg-white/5 p-6">
						<p className="mb-4 text-slate-300 text-sm">
							"A interface é muito limpa. O treinamento da equipe levou menos de
							15 minutos."
						</p>
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-slate-700" />
							<div className="text-xs">
								<div className="font-medium text-white">Sarah Costa</div>
								<div className="text-slate-500">Gerente, The Grind</div>
							</div>
						</div>
					</div>
					<div className="w-80 shrink-0 rounded-xl border border-white/5 bg-white/5 p-6">
						<p className="mb-4 text-slate-300 text-sm">
							"Melhor investimento do ano. Os relatórios são incríveis."
						</p>
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-slate-700" />
							<div className="text-xs">
								<div className="font-medium text-white">Julia Lopes</div>
								<div className="text-slate-500">Fundadora, Bowl'd</div>
							</div>
						</div>
					</div>
					<div className="w-80 shrink-0 rounded-xl border border-white/5 bg-white/5 p-6">
						<p className="mb-4 text-slate-300 text-sm">
							"O suporte é sensacional. Resolveram meu problema em 5 minutos."
						</p>
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-slate-700" />
							<div className="text-xs">
								<div className="font-medium text-white">Mike Rocha</div>
								<div className="text-slate-500">Chef, Italianio</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
