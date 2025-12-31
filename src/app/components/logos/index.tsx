import { Icon } from "@iconify-icon/react"

export function LogoSection() {
	return (
		<section className="py-12 border-y border-white/5 bg-black/20">
			<p className="text-center text-xs font-medium text-slate-500 mb-8 uppercase tracking-widest">
				Utilizado pelas melhores cozinhas
			</p>
			<div className="marquee-container overflow-hidden relative max-w-6xl mx-auto">
				<div className="marquee-content flex gap-12 items-center whitespace-nowrap">
					<div className="flex items-center gap-12 text-slate-500 opacity-60">
						<div className="flex items-center gap-2">
							<Icon icon="solar:chef-hat-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">BISTRÔ</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:cup-hot-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">CAFÉ</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:donut-bitten-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">DOCE</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:wine-glass-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">ADEGA</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:pizza-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">FORNO</span>
						</div>
					</div>
					<div className="flex items-center gap-12 text-slate-500 opacity-60">
						<div className="flex items-center gap-2">
							<Icon icon="solar:chef-hat-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">BISTRÔ</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:cup-hot-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">CAFÉ</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:donut-bitten-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">DOCE</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:wine-glass-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">ADEGA</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:pizza-bold-duotone" width="24" />
							<span className="font-bold tracking-tighter text-lg">FORNO</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
