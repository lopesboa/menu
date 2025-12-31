import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

export function SignInForm() {
	return (
		<form className="space-y-4">
			<div className="space-y-2">
				<span className="text-xs font-medium text-slate-300">Email</span>
				<Input
					type="email"
					placeholder="voce@exemplo.com"
					iconName="solar:letter-bold-duotone"
				/>
			</div>
			<div className="space-y-2">
				<div className="flex justify-between">
					<span className="text-xs font-medium text-slate-300">Senha</span>
					<a
						href="/forget-password"
						className="text-xs text-indigo-400 hover:text-indigo-300"
					>
						Esqueceu?
					</a>
				</div>
				<Input
					type="password"
					placeholder="••••••••"
					iconName="solar:lock-password-bold-duotone"
				/>
			</div>
			<Button>Entrar na plataforma</Button>
		</form>
	)
}
