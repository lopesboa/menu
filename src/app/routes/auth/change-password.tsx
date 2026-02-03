import { Icon } from "@iconify-icon/react"
import { Button } from "@/components"
import { Field } from "@/components/form"

export default function ChangePassword() {
	return (
		<div className="flex flex-col gap-6">
			<div className="mt-6 mb-2 animate-slide-up-fade text-center">
				<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-neutral-900">
					<Icon
						className="text-lg text-white"
						icon="solar:key-square-bold-duotone"
					/>
				</div>
				<h2 className="font-medium text-lg text-white tracking-tight">
					Set new password
				</h2>
				<p className="mt-1 text-secondary text-xs">
					Your new password must be different to previously used passwords.
				</p>
			</div>

			<form className="flex animate-slide-up-fade flex-col gap-4 delay-100">
				<Field
					className="space-y-2"
					inputProps={{
						type: "password",
						placeholder: "Nova senha",
						iconName: "solar:lock-password-bold-duotone",
						// ...register("email"),
					}}
					// errors={[errors.email?.message]}
					label="Nova senha"
				/>
				<Field
					className="space-y-2"
					inputProps={{
						type: "password",
						placeholder: "Confirmar senha",
						iconName: "solar:lock-password-bold-duotone",
						// ...register("email"),
					}}
					// errors={[errors.email?.message]}
					label="Confirmar senha"
				/>

				<Button type="submit">Alterar Senha</Button>
			</form>
		</div>
	)
}
