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
import { cn } from "@/utils/misc"
import { VerifyFormSchema } from "@/utils/user-validation"

type VerifyForm = {
	otp: string
	redirectTo?: string
}
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
				},
			)
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-6">
			<Link
				to="/auth/login"
				className="absolute top-0 left-0 text-secondary hover:text-white transition-colors flex items-center gap-1 text-xs"
			>
				<Icon icon="solar:arrow-left-linear" /> Voltar
			</Link>

			<div className="text-center mt-6 mb-2 animate-slide-up-fade">
				<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border border-border mb-4">
					<Icon
						icon="solar:shield-check-bold-duotone"
						className="text-lg text-green-500"
					/>
				</div>
				<h2 className="text-lg font-medium text-white tracking-tight">
					Check your email
				</h2>
				<p className="text-xs text-secondary mt-1 max-w-65 mx-auto">
					We sent a verification code to{" "}
					<span id="display-email" className="text-white">
						{email}
					</span>
				</p>
			</div>

			<form
				className="flex flex-col justify-center gap-4 animate-slide-up-fade delay-100"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex justify-center">
					<Controller
						name="otp"
						control={control}
						render={({ field }) => (
							<InputOTP
								maxLength={6}
								value={field.value}
								onChange={field.onChange}
								className={cn(errors.otp?.message ? "border-red-400" : "")}
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

			<p className="text-center text-xs text-secondary animate-slide-up-fade delay-200">
				Não recebeu o e-mail?{" "}
				<button
					type="button"
					className="text-white hover:underline underline-offset-2"
				>
					Click para reenviar
				</button>
			</p>
		</div>
	)
}
