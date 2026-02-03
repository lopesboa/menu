import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { authClient } from "@/lib/client"
import { SignUpFormSchema } from "@/utils/user-validation"
import { Field } from "../../form"
import { Button } from "../../ui/button"

type SignUpForm = {
	email: string
	password: string
	firstName: string
	lastName: string
	confirmPassword: string
	redirectTo?: string
}

export function SignUpForm() {
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpForm>({
		resolver: zodResolver(SignUpFormSchema),
		mode: "onBlur",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			redirectTo: "",
		},
	})

	const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
		try {
			setLoading(true)
			await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: `${data.firstName} ${data.lastName}`,
				firstName: data.firstName,
				lastName: data.lastName,
				callbackURL: "/verify-password",
			} as any)
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-row gap-4">
				<Field
					errors={[errors?.firstName?.message]}
					inputProps={{
						type: "text",
						placeholder: "José",
						iconName: "solar:user-bold-duotone",
						...register("firstName"),
					}}
					label="Primeiro nome"
				/>
				<Field
					errors={[errors?.lastName?.message]}
					inputProps={{
						type: "text",
						placeholder: "Felipe",
						iconName: "solar:user-bold-duotone",
						...register("lastName"),
					}}
					label="Sobrenome"
				/>
			</div>

			<Field
				className="space-y-2"
				errors={[errors?.email?.message]}
				inputProps={{
					type: "email",
					placeholder: "voce@exemplo.com",
					iconName: "solar:letter-bold-duotone",
					...register("email"),
				}}
				label="Email"
			/>
			<Field
				className="space-y-2"
				errors={[errors.password?.message]}
				inputProps={{
					type: "password",
					placeholder: "Mínimo 8 caracteres",
					iconName: "solar:lock-password-bold-duotone",
					...register("password"),
				}}
				label="Senha"
			/>
			<Field
				className="space-y-2"
				errors={[errors.confirmPassword?.message]}
				inputProps={{
					type: "password",
					placeholder: "Mínimo 8 caracteres",
					iconName: "solar:lock-password-bold-duotone",
					...register("confirmPassword"),
				}}
				label="Confirmar senha"
			/>

			<Button loading={loading} type="submit">
				Criar Conta
			</Button>
		</form>
	)
}
