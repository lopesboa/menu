import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router"
import { Button } from "@/components"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import { authClient } from "@/lib/client"
import type { VerifyForm } from "@/types/auth"
import { cn } from "@/utils/misc"
import { VerifyFormSchema } from "@/utils/user-validation"

export default function Verify() {
	const location = useLocation()
	const navigate = useNavigate()
	const email = location.state?.email
	const redirectTo = location.state?.redirectTo

	const [loading, setLoading] = useState(false)

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<VerifyForm>({
		resolver: zodResolver(VerifyFormSchema),
		mode: "onBlur",
		defaultValues: {
			otp: "",
			redirectTo: "",
		},
	})

	const onSubmit: SubmitHandler<VerifyForm> = async (data) => {
		try {
			setLoading(true)
			await authClient.emailOtp.verifyEmail(
				{
					email,
					otp: data.otp,
				},
				{
					onSuccess() {
						navigate(redirectTo || "/dashboard", { replace: true })
					},
				}
			)
		} catch (error) {
			console.error("Email verification failed:", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-6">
			<Link
				className="absolute top-0 left-0 flex items-center gap-1 text-secondary text-xs transition-colors hover:text-white"
				to="/login"
			>
				<Icon icon="solar:arrow-left-linear" /> Voltar
			</Link>

			<div className="mt-6 mb-2 animate-slide-up-fade text-center">
				<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-neutral-900">
					<Icon
						className="text-green-500 text-lg"
						icon="solar:shield-check-bold-duotone"
					/>
				</div>
				<h2 className="font-medium text-lg text-white tracking-tight">
					Check your email
				</h2>
				<p className="mx-auto mt-1 max-w-65 text-secondary text-xs">
					We sent a verification code to{" "}
					<span className="text-white" id="display-email">
						{email}
					</span>
				</p>
			</div>

			<form
				className="flex animate-slide-up-fade flex-col justify-center gap-4 delay-100"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex justify-center">
					<Controller
						control={control}
						name="otp"
						render={({ field }) => (
							<InputOTP
								className={cn(errors.otp?.message ? "border-red-400" : "")}
								maxLength={6}
								onChange={field.onChange}
								value={field.value}
							>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
								</InputOTPGroup>
								<InputOTPSeparator />
								<InputOTPGroup>
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						)}
					/>
					{errors.otp?.message && (
						<span className="text-[10px] text-foreground-destructive text-red-700">
							{errors.otp?.message}
						</span>
					)}
				</div>

				<Button loading={loading} type="submit">
					Verificar E-mail
				</Button>
			</form>

			<p className="animate-slide-up-fade text-center text-secondary text-xs delay-200">
				Não recebeu o e-mail?{" "}
				<button
					className="text-white underline-offset-2 hover:underline"
					type="button"
				>
					Click para reenviar
				</button>
			</p>
		</div>
	)
}
