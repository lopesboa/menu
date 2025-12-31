import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

export function SignUpForm() {
	return (
		<form className="space-y-4">
			<div className="space-y-2">
				<span className="text-xs font-medium text-slate-300">
					Nome do Restaurante
				</span>
				<Input
					type="text"
					placeholder="Bistrô do Chef"
					iconName="solar:shop-bold-duotone"
				/>
			</div>
			<div className="space-y-2">
				<span className="text-xs font-medium text-slate-300">Email</span>
				<Input
					type="email"
					placeholder="voce@exemplo.com"
					iconName="solar:letter-bold-duotone"
				/>
			</div>
			<div className="space-y-2">
				<span className="text-xs font-medium text-slate-300">Senha</span>
				<Input
					type="password"
					placeholder="Mínimo 8 caracteres"
					iconName="solar:lock-password-bold-duotone"
				/>
			</div>

			<Button>Criar Conta</Button>
		</form>
	)
}
