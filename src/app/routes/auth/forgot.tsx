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
				},
			)
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	return (
		<div data-slot="auth-forgot" className="flex flex-col gap-6">
			<Link
				to="/auth/login"
				className="absolute top-0 left-0 text-secondary hover:text-white transition-colors flex items-center gap-1 text-xs"
			>
				<Icon icon="solar:arrow-left-linear" /> Voltar
			</Link>
			<div className="text-center  mb-2 animate-slide-up-fade">
				<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border border-border mb-4">
					<Icon
						icon="solar:lock-password-unlocked-bold-duotone"
						className="text-lg text-secondary"
					/>
				</div>
				<h2 className="text-lg font-medium text-white tracking-tight">
					Recuperar senha
				</h2>
				<p className="text-xs text-secondary mt-1 max-w-65 mx-auto">
					Informe seu e-mail cadastrado e enviaremos as instruções para
					redefinir sua senha.
				</p>
			</div>

			<form
				className="flex flex-col gap-4 animate-slide-up-fade delay-100"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Field
					className="space-y-2"
					label="Email"
					errors={[errors.email?.message]}
					inputProps={{
						type: "email",
						placeholder: "voce@exemplo.com",
						iconName: "solar:letter-bold-duotone",
						...register("email"),
					}}
				/>

				<Button loading={loading} type="submit">
					Enviar Instruções
				</Button>
			</form>
		</div>
	)
}
