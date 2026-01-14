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
					label="Primeiro nome"
					inputProps={{
						type: "text",
						placeholder: "José",
						iconName: "solar:user-bold-duotone",
						...register("firstName"),
					}}
				/>
				<Field
					errors={[errors?.lastName?.message]}
					label="Sobrenome"
					inputProps={{
						type: "text",
						placeholder: "Felipe",
						iconName: "solar:user-bold-duotone",
						...register("lastName"),
					}}
				/>
			</div>

			<Field
				errors={[errors?.email?.message]}
				className="space-y-2"
				label="Email"
				inputProps={{
					type: "email",
					placeholder: "voce@exemplo.com",
					iconName: "solar:letter-bold-duotone",
					...register("email"),
				}}
			/>
			<Field
				errors={[errors.password?.message]}
				className="space-y-2"
				label="Senha"
				inputProps={{
					type: "password",
					placeholder: "Mínimo 8 caracteres",
					iconName: "solar:lock-password-bold-duotone",
					...register("password"),
				}}
			/>
			<Field
				errors={[errors.confirmPassword?.message]}
				className="space-y-2"
				label="Confirmar senha"
				inputProps={{
					type: "password",
					placeholder: "Mínimo 8 caracteres",
					iconName: "solar:lock-password-bold-duotone",
					...register("confirmPassword"),
				}}
			/>

			<Button loading={loading} type="submit">
				Criar Conta
			</Button>
		</form>
	)
}
