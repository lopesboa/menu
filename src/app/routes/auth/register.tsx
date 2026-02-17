import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { Field } from "@/components/form"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/client"
import type { SignUpForm } from "@/types/auth"
import { SignUpFormSchema } from "@/utils/user-validation"

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
				} as never,
				{
					onSuccess() {
						navigate(data.redirectTo || "/verify", {
							state: { email: data.email, redirectTo: data.redirectTo },
						})
					},
				}
			)
		} catch {
			toast.error("Falha no cadastro", {
				description: "Por favor, tente novamente mais tarde.",
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-5" data-slot="auth-register">
			<div className="mb-2 animate-slide-up-fade text-center">
				<h2 className="font-medium text-lg text-white tracking-tight">
					Crie sua conta
				</h2>
				<p className="mt-1 text-secondary text-xs">
					Comece seu teste de 14 dias grátis
				</p>
			</div>

			<button
				className="group flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 transition-colors duration-200 hover:bg-neutral-900"
				type="button"
			>
				<Icon
					className="text-sm opacity-80 transition-opacity group-hover:opacity-100"
					icon="logos:google-icon"
				/>
				<span className="font-medium text-secondary text-xs group-hover:text-white">
					Continuar com Google
				</span>
			</button>
			<div className="relative flex animate-slide-up-fade items-center py-2 delay-100">
				<div className="grow border-neutral-800 border-t" />
				<span className="mx-4 shrink-0 font-medium text-[10px] text-neutral-600 uppercase tracking-widest">
					Ou criar conta com email
				</span>
				<div className="grow border-neutral-800 border-t" />
			</div>

			<form
				className="mb-6 flex animate-slide-up-fade flex-col gap-4 delay-200"
				onSubmit={handleSubmit(onSubmit)}
			>
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

			<p className="animate-slide-up-fade text-center text-secondary text-xs delay-300">
				Já tem uma conta?{" "}
				<Link
					className="text-white underline-offset-2 hover:underline"
					to="/login"
				>
					Entrar
				</Link>
			</p>
		</div>
	)
}
