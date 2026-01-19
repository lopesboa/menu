import { Button } from "@/components/ui/button"
import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"

export default function Login() {
	return (
		<div
			data-slot="auth-login"
			id="view-login"
			className="view-section active flex-col gap-5 animate-slide-up-fade delay-300"
		>
			<div className="text-center mb-2">
				<h2 className="text-lg font-medium text-white tracking-tight">
					Bem-vindo de volta
				</h2>
				<p className="text-xs text-secondary mt-1">
					Entre na sua conta para continuar
				</p>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<button
					type="button"
					className="flex items-center justify-center gap-2 bg-surface hover:bg-neutral-900 border border-border rounded-lg py-2.5 px-4 transition-colors duration-200 group cursor-pointer"
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
					className="flex items-center justify-center gap-2 bg-surface hover:bg-neutral-900 border border-border rounded-lg py-2.5 px-4 transition-colors duration-200 group cursor-pointer"
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

			<div className="relative flex items-center py-2">
				<div className="grow border-t border-neutral-800"></div>
				<span className="shrink-0 mx-4 text-[10px] uppercase tracking-widest text-neutral-600 font-medium">
					Ou continuar com
				</span>
				<div className="grow border-t border-neutral-800"></div>
			</div>

			<form className="flex flex-col gap-4 mb-6">
				<div className="group relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Icon
							icon="solar:letter-bold-duotone"
							className="text-neutral-500 group-focus-within:text-white transition-colors"
						/>
					</div>
					<input
						type="email"
						placeholder="voce@exemplo.com"
						className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
					/>
				</div>

				<div className="group relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Icon
							icon="solar:lock-password-bold-duotone"
							className="text-neutral-500 group-focus-within:text-white transition-colors"
						/>
					</div>
					<input
						type="password"
						placeholder="Password"
						className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
					/>
				</div>

				<div className="flex items-center justify-between">
					<label className="flex items-center gap-2 cursor-pointer group">
						<div className="relative flex items-center">
							<input
								type="checkbox"
								className="peer h-3.5 w-3.5 appearance-none rounded border border-neutral-700 checked:bg-white checked:border-white transition-all"
							/>
							<Icon
								icon="solar:check-read-linear"
								className="absolute inset-0 m-auto text-black text-[10px] opacity-0 peer-checked:opacity-100 pointer-events-none"
							/>
						</div>
						<span className="text-xs text-secondary group-hover:text-white transition-colors">
							Me Lembrar
						</span>
					</label>
					<Link
						to="/auth/forgot"
						className="text-xs text-secondary hover:text-white transition-colors cursor-pointer"
					>
						Esqueceu sua senha?
					</Link>
				</div>

				<Button type="submit">Entrar na plataforma</Button>
			</form>

			<p className="text-center text-xs text-secondary">
				Não tem uma conta?{" "}
				<Link
					to="/auth/register"
					className="text-white hover:underline underline-offset-2 cursor-pointer"
				>
					Criar conta
				</Link>
			</p>
		</div>
	)
}
