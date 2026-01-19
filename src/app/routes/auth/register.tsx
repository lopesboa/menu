import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

export default function Register() {
	return (
		<div data-slot="auth-register" className="flex-col gap-5">
			<div className="text-center mb-2 animate-slide-up-fade">
				<h2 className="text-lg font-medium text-white tracking-tight">
					Create account
				</h2>
				<p className="text-xs text-secondary mt-1">
					Start your 30-day free trial today.
				</p>
			</div>

			<div className="grid grid-cols-2 gap-3 animate-slide-up-fade delay-100">
				<button
					type="button"
					className="flex items-center justify-center gap-2 bg-surface hover:bg-neutral-900 border border-border rounded-lg py-2.5 px-4 transition-colors duration-200 group"
				>
					<Icon
						icon="logos:google-icon"
						className="text-sm opacity-80 group-hover:opacity-100 transition-opacity"
					/>
					<span className="text-xs font-medium text-secondary group-hover:text-white">
						Google
					</span>
				</button>
				<button
					type="button"
					className="flex items-center justify-center gap-2 bg-surface hover:bg-neutral-900 border border-border rounded-lg py-2.5 px-4 transition-colors duration-200 group"
				>
					<Icon
						icon="logos:github-icon"
						className="text-sm opacity-80 group-hover:opacity-100 transition-opacity filter invert"
					/>
					<span className="text-xs font-medium text-secondary group-hover:text-white">
						GitHub
					</span>
				</button>
			</div>

			<div className="relative flex items-center py-2 animate-slide-up-fade delay-100">
				<div className="grow border-t border-neutral-800"></div>
				<span className="shrink-0 mx-4 text-[10px] uppercase tracking-widest text-neutral-600 font-medium">
					Or register with email
				</span>
				<div className="grow border-t border-neutral-800"></div>
			</div>

			<form className="flex flex-col gap-4 animate-slide-up-fade delay-200 mb-6">
				<div className="group relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Icon
							icon="solar:user-circle-bold-duotone"
							className="text-neutral-500 group-focus-within:text-white transition-colors"
						/>
					</div>
					<input
						type="text"
						required
						placeholder="Full Name"
						className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
					/>
				</div>

				<div className="group relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Icon
							icon="solar:letter-bold-duotone"
							className="text-neutral-500 group-focus-within:text-white transition-colors"
						/>
					</div>
					<input
						type="email"
						required
						id="reg-email"
						placeholder="email@domain.com"
						className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
					/>
				</div>

				<div className="group relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Icon
							icon="solar:lock-keyhole-bold-duotone"
							className="text-neutral-500 group-focus-within:text-white transition-colors"
						/>
					</div>
					<input
						type="password"
						required
						placeholder="Create Password"
						className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
					/>
				</div>

				<Button
					type="submit"
					// className="w-full bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-neutral-200 transition-colors shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] mt-2"
				>
					Criar Conta
				</Button>
			</form>

			<p className="text-center text-xs text-secondary animate-slide-up-fade delay-300">
				Já tem uma conta?{" "}
				<Link
					to="/auth/login"
					className="text-white hover:underline underline-offset-2"
				>
					Entrar
				</Link>
			</p>
		</div>
	)
}
