import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Field } from "@/components/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/client"
import { SignInFormSchema } from "@/utils/user-validation"

type LogInForm = {
	email: string
	password: string
	redirectTo?: string
	remember?: boolean
}

export function SignInForm({ onNavigate }: { onNavigate?: () => void }) {
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LogInForm>({
		resolver: zodResolver(SignInFormSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
			redirectTo: "",
			remember: false,
		},
	})

	const onSubmit: SubmitHandler<LogInForm> = async (data) => {
		try {
			setLoading(true)
			await authClient.signIn.email(
				{
					email: data.email,
					password: data.password,
					callbackURL: "/dashboard",
				},
				{
					onSuccess: () => {
						onNavigate?.()
					},
				},
			)
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}
	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
			<div className="space-y-2">
				<div className="flex justify-between">
					<span className="text-xs font-medium text-slate-300">Senha</span>
					<a
						href="/forget-password"
						aria-label="Não lembra sua senha? Redefina clicando aqui"
						className="text-xs text-indigo-400 hover:text-indigo-300"
					>
						Esqueceu?
					</a>
				</div>
				<Input
					type="password"
					placeholder="••••••••"
					iconName="solar:lock-password-bold-duotone"
					{...register("password")}
				/>
			</div>
			<Button loading={loading} type="submit">
				Entrar na plataforma
			</Button>
		</form>
	)
}
