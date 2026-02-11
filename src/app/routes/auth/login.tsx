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
import type { LogInForm } from "@/types/auth"
import { SignInFormSchema } from "@/utils/user-validation"

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
			console.error("Login failed:", error)
		} finally {
			setLoading(false)
		}
	}

	const handleOnRemember = (event: React.MouseEvent<HTMLInputElement>) => {
		setRememberMe((event.target as HTMLInputElement).checked)
	}

	return (
		<div
			className="flex animate-slide-up-fade flex-col gap-5 delay-300"
			data-slot="auth-login"
			id="view-login"
		>
			<div className="mb-2 text-center">
				<h2 className="font-medium text-lg text-white tracking-tight">
					Bem-vindo de volta
				</h2>
				<p className="mt-1 text-secondary text-xs">
					Entre na sua conta para continuar
				</p>
			</div>

			<button
				className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 transition-colors duration-200 hover:bg-neutral-900"
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

			<div className="relative flex items-center py-2">
				<div className="grow border-neutral-800 border-t" />
				<span className="mx-4 shrink-0 font-medium text-[10px] text-neutral-600 uppercase tracking-widest">
					Ou continuar com
				</span>
				<div className="grow border-neutral-800 border-t" />
			</div>

			<form
				className="mb-6 flex flex-col gap-4"
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

				<div className="group relative">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Icon
							className="text-neutral-500 transition-colors group-focus-within:text-white"
							icon="solar:lock-password-bold-duotone"
						/>
					</div>
					<Input
						iconName="solar:lock-password-bold-duotone"
						placeholder="••••••••"
						type="password"
						{...register("password")}
					/>
				</div>

				<div className="flex items-center justify-between">
					<label className="group flex cursor-pointer items-center gap-2">
						<input
							className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-600 bg-[#16181d] text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-0 focus:ring-offset-transparent"
							onClick={handleOnRemember}
							type="checkbox"
						/>

						<span className="text-secondary text-xs transition-colors group-hover:text-white">
							Me Lembrar
						</span>
					</label>
					<Link
						className="cursor-pointer text-secondary text-xs transition-colors hover:text-white"
						to="/forgot"
					>
						Esqueceu sua senha?
					</Link>
				</div>

				<Button
					loading={loading}
					onClick={() => {
						capture("button_clicked", { button_name: "login" })
					}}
					type="submit"
				>
					Entrar na plataforma
				</Button>
			</form>

			<p className="text-center text-secondary text-xs">
				Não tem uma conta?{" "}
				<Link
					className="cursor-pointer text-white underline-offset-2 hover:underline"
					onClick={() => capture("link_clicked", { link_name: "register" })}
					to="/register"
				>
					Criar conta
				</Link>
			</p>
		</div>
	)
}
