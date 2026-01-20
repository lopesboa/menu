import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { Field } from "@/components/form"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/client"
import { SignUpFormSchema } from "@/utils/user-validation"

type SignUpForm = {
	email: string
	password: string
	firstName: string
	lastName: string
	confirmPassword: string
	redirectTo?: string
}

export default function Register() {
	const navigate = useNavigate()
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
			await authClient.signUp.email(
				{
					email: data.email,
					password: data.password,
					name: `${data.firstName} ${data.lastName}`,
					firstName: data.firstName,
					lastName: data.lastName,
				} as any,
				{
					onSuccess() {
						navigate("/auth/verify", {
							state: { email: data.email },
						})
					},
				},
			)
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	return (
		<div data-slot="auth-register" className="flex flex-col gap-5">
			<div className="text-center mb-2 animate-slide-up-fade">
				<h2 className="text-lg font-medium text-white tracking-tight">
					Crie sua conta
				</h2>
				<p className="text-xs text-secondary mt-1">
					Comece seu teste de 14 dias grátis
				</p>
			</div>

			<button
				type="button"
				className="w-full flex items-center justify-center gap-2 bg-surface hover:bg-neutral-900 border border-border rounded-lg py-2.5 px-4 transition-colors duration-200 group"
			>
				<Icon
					icon="logos:google-icon"
					className="text-sm opacity-80 group-hover:opacity-100 transition-opacity"
				/>
				<span className="text-xs font-medium text-secondary group-hover:text-white">
					Continuar com Google
				</span>
			</button>
			<div className="relative flex items-center py-2  animate-slide-up-fade delay-100">
				<div className="grow border-t border-neutral-800"></div>
				<span className="shrink-0 mx-4 text-[10px] uppercase tracking-widest text-neutral-600 font-medium">
					Ou criar conta com email
				</span>
				<div className="grow border-t border-neutral-800"></div>
			</div>

			<form
				className="flex flex-col gap-4 animate-slide-up-fade delay-200 mb-6"
				onSubmit={handleSubmit(onSubmit)}
			>
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
