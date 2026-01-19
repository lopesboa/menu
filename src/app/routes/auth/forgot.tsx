import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"

export default function Forgot() {
	return (
		<div data-slot="auth-forgot" className="flex-col gap-6">
			<Link
				to="/auth/login"
				className="absolute top-0 left-0 text-secondary hover:text-white transition-colors flex items-center gap-1 text-xs"
			>
				<Icon icon="solar:arrow-left-linear" /> Back
			</Link>
			<div className="text-center mt-6 mb-2 animate-slide-up-fade">
				<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border border-border mb-4">
					<Icon
						icon="solar:lock-password-unlocked-bold-duotone"
						className="text-lg text-secondary"
					/>
				</div>
				<h2 className="text-lg font-medium text-white tracking-tight">
					Reset password
				</h2>
				<p className="text-xs text-secondary mt-1 max-w-65 mx-auto">
					Enter the email associated with your account and we'll send you a
					code.
				</p>
			</div>

			<form className="flex flex-col gap-4 animate-slide-up-fade delay-100">
				<div className="group relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Icon
							icon="solar:letter-bold-duotone"
							className="text-neutral-500 group-focus-within:text-white transition-colors"
						/>
					</div>
					<input
						type="email"
						required
						id="forgot-email"
						placeholder="email@domain.com"
						className="w-full bg-surface border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-neutral-200 transition-colors shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
				>
					Send instructions
				</button>
			</form>
		</div>
	)
}
