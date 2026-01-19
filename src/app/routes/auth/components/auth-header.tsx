import { Icon } from "@iconify-icon/react"

export function AuthHeader() {
	return (
		<div
			data-slot="auth-header"
			className="mb-10 text-center animate-slide-up-fade delay-100"
		>
			<div
				data-slot="auth-header-logo"
				className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border shadow-2xl mb-6 shadow-neutral-900/50"
			>
				<Icon
					icon="solar:hamburger-menu-bold-duotone"
					className="text-2xl text-white"
				/>
			</div>
			<h3 className="text-xl tracking-tight font-medium text-white clip-text-wrapper">
				<span className="animate-text-reveal delay-200">MENU</span>
				<span className="mx-1 animate-text-reveal delay-300">BÃO</span>
			</h3>
		</div>
	)
}
