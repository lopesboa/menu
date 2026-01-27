import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router"
import { Input } from "@/components"
import { Field } from "@/components/form"
import { Button } from "@/components/ui/button"
import { usePostHogEvent } from "@/hooks"
import { authClient } from "@/lib/client"
import { SignInFormSchema } from "@/utils/user-validation"

type LogInForm = {
	email: string
	password: string
	redirectTo?: string
	remember?: boolean
}

export default function Login() {
	const [loading, setLoading] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const { capture } = usePostHogEvent()

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
			await authClient.signIn.email({
				email: data.email,
				password: data.password,
				callbackURL: "/dashboard",
				rememberMe,
			})
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	const handleOnRemember = (event) => {
		setRememberMe(event.target.checked)
	}

	return (
		<div
			data-slot="auth-login"
			id="view-login"
			className="flex flex-col gap-5 animate-slide-up-fade delay-300"
		>
			<div className="text-center mb-2">
				<h2 className="text-lg font-medium text-white tracking-tight">
					Bem-vindo de volta
				</h2>
				<p className="text-xs text-secondary mt-1">
					Entre na sua conta para continuar
				</p>
			</div>

			<button
				type="button"
				className="flex w-full items-center justify-center gap-2 bg-surface hover:bg-neutral-900 border border-border rounded-lg py-2.5 px-4 transition-colors duration-200 group cursor-pointer"
			>
				<Icon
					icon="logos:google-icon"
					className="text-sm opacity-80 group-hover:opacity-100 transition-opacity"
				/>
				<span className="text-xs font-medium text-secondary group-hover:text-white">
					Continuar com Google
				</span>
			</button>

			<div className="relative flex items-center py-2">
				<div className="grow border-t border-neutral-800"></div>
				<span className="shrink-0 mx-4 text-[10px] uppercase tracking-widest text-neutral-600 font-medium">
					Ou continuar com
				</span>
				<div className="grow border-t border-neutral-800"></div>
			</div>

			<form
				className="flex flex-col gap-4 mb-6"
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

				<div className="group relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Icon
							icon="solar:lock-password-bold-duotone"
							className="text-neutral-500 group-focus-within:text-white transition-colors"
						/>
					</div>
					<Input
						type="password"
						placeholder="••••••••"
						iconName="solar:lock-password-bold-duotone"
						{...register("password")}
					/>
				</div>

				<div className="flex items-center justify-between">
					<label className="flex items-center gap-2 cursor-pointer group">
						<input
							type="checkbox"
							className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-[#16181d] text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
							onClick={handleOnRemember}
						/>

						<span className="text-xs text-secondary group-hover:text-white transition-colors">
							Me Lembrar
						</span>
					</label>
					<Link
						to="/auth/forgot"
						className="text-xs text-secondary hover:text-white transition-colors cursor-pointer"
					>
						Esqueceu sua senha?
					</Link>
				</div>

				<Button
					onClick={() => {
						capture("button_clicked", { button_name: "login" })
					}}
					loading={loading}
					type="submit"
				>
					Entrar na plataforma
				</Button>
			</form>

			<p className="text-center text-xs text-secondary">
				Não tem uma conta?{" "}
				<Link
					to="/auth/register"
					className="text-white hover:underline underline-offset-2 cursor-pointer"
					onClick={() => capture("link_clicked", { link_name: "register" })}
				>
					Criar conta
				</Link>
			</p>
		</div>
	)
}
