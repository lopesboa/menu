import { Icon } from "@iconify-icon/react"
import { Button } from "@/components"
import { Field } from "@/components/form"

export default function ChangePassword() {
	return (
		<div className="flex flex-col gap-6">
			<div className="text-center mt-6 mb-2 animate-slide-up-fade">
				<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border border-border mb-4">
					<Icon
						icon="solar:key-square-bold-duotone"
						className="text-lg text-white"
					/>
				</div>
				<h2 className="text-lg font-medium text-white tracking-tight">
					Set new password
				</h2>
				<p className="text-xs text-secondary mt-1">
					Your new password must be different to previously used passwords.
				</p>
			</div>

			<form className="flex flex-col gap-4 animate-slide-up-fade delay-100">
				<Field
					className="space-y-2"
					label="Nova senha"
					// errors={[errors.email?.message]}
					inputProps={{
						type: "password",
						placeholder: "Nova senha",
						iconName: "solar:lock-password-bold-duotone",
						// ...register("email"),
					}}
				/>
				<Field
					className="space-y-2"
					label="Confirmar senha"
					// errors={[errors.email?.message]}
					inputProps={{
						type: "password",
						placeholder: "Confirmar senha",
						iconName: "solar:lock-password-bold-duotone",
						// ...register("email"),
					}}
				/>

				<Button type="submit">Alterar Senha</Button>
			</form>
		</div>
	)
}
