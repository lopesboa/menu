import { Icon } from "@iconify-icon/react"

export function LogoSection() {
	return (
		<section className="border-white/5 border-y bg-black/20 py-12">
			<p className="mb-8 text-center font-medium text-slate-500 text-xs uppercase tracking-widest">
				Utilizado pelas melhores cozinhas
			</p>
			<div className="marquee-container relative mx-auto max-w-6xl overflow-hidden">
				<div className="marquee-content flex items-center gap-12 whitespace-nowrap">
					<div className="flex items-center gap-12 text-slate-500 opacity-60">
						<div className="flex items-center gap-2">
							<Icon icon="solar:chef-hat-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">BISTRÔ</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:cup-hot-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">CAFÉ</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:donut-bitten-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">DOCE</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:wine-glass-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">ADEGA</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:pizza-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">FORNO</span>
						</div>
					</div>
					<div className="flex items-center gap-12 text-slate-500 opacity-60">
						<div className="flex items-center gap-2">
							<Icon icon="solar:chef-hat-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">BISTRÔ</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:cup-hot-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">CAFÉ</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:donut-bitten-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">DOCE</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:wine-glass-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">ADEGA</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="solar:pizza-bold-duotone" width="24" />
							<span className="font-bold text-lg tracking-tighter">FORNO</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
