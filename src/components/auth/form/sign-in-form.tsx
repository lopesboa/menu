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
				}
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
				errors={[errors.email?.message]}
				inputProps={{
					type: "email",
					placeholder: "voce@exemplo.com",
					iconName: "solar:letter-bold-duotone",

					...register("email"),
				}}
				label="Email"
			/>
			<div className="space-y-2">
				<div className="flex justify-between">
					<span className="font-medium text-slate-300 text-xs">Senha</span>
					<a
						aria-label="Não lembra sua senha? Redefina clicando aqui"
						className="text-indigo-400 text-xs hover:text-indigo-300"
						href="/forget-password"
					>
						Esqueceu?
					</a>
				</div>
				<Input
					iconName="solar:lock-password-bold-duotone"
					placeholder="••••••••"
					type="password"
					{...register("password")}
				/>
			</div>
			<Button loading={loading} type="submit">
				Entrar na plataforma
			</Button>
		</form>
	)
}
