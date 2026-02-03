import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { Button } from "@/components"
import { Field } from "@/components/form"
import { authClient } from "@/lib/client"
import { ForgotFormSchema } from "@/utils/user-validation"

type ForgotForm = {
	email: string
	redirectTo?: string
}

export default function Forgot() {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const {
		handleSubmit,
		register,

		formState: { errors },
	} = useForm<ForgotForm>({
		resolver: zodResolver(ForgotFormSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			redirectTo: "",
		},
	})

	const onSubmit: SubmitHandler<ForgotForm> = async (data) => {
		try {
			setLoading(true)
			await authClient.emailOtp.sendVerificationOtp(
				{
					email: data.email,
					type: "forget-password",
				},
				{
					onSuccess() {
						navigate(data?.redirectTo || "/auth/verify", {
							replace: true,
							state: { redirectTo: "/auth/change-password" },
						})
					},
				}
			)
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-6" data-slot="auth-forgot">
			<Link
				className="absolute top-0 left-0 flex items-center gap-1 text-secondary text-xs transition-colors hover:text-white"
				to="/auth/login"
			>
				<Icon icon="solar:arrow-left-linear" /> Voltar
			</Link>
			<div className="mb-2 animate-slide-up-fade text-center">
				<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-neutral-900">
					<Icon
						className="text-lg text-secondary"
						icon="solar:lock-password-unlocked-bold-duotone"
					/>
				</div>
				<h2 className="font-medium text-lg text-white tracking-tight">
					Recuperar senha
				</h2>
				<p className="mx-auto mt-1 max-w-65 text-secondary text-xs">
					Informe seu e-mail cadastrado e enviaremos as instruções para
					redefinir sua senha.
				</p>
			</div>

			<form
				className="flex animate-slide-up-fade flex-col gap-4 delay-100"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Field
					className="space-y-2"
					errors={[errors.email?.message]}
					inputProps={{
						type: "email",
						placeholder: "voce@exemplo.com",
						iconName: "solar:letter-bold-duotone",
						...register("email"),
					}}
					label="Email"
				/>

				<Button loading={loading} type="submit">
					Enviar Instruções
				</Button>
			</form>
		</div>
	)
}
