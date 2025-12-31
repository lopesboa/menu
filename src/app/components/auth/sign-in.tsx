import { Icon } from "@iconify-icon/react"
import { SIGN_IN_MODAL_ID, SIGN_UP_MODAL_ID } from "@/app/constants"
import { useDialog, useDialogActions } from "@/app/store/dialog"
import { Button } from "../ui/button"
import { BaseComponent } from "./base"
import { SignInForm } from "./form/sign-in-form"

export function SignIn() {
	const { closeDialog, openDialog } = useDialogActions()
	const { isOpen } = useDialog()

	const handleCloseDialog = () => {
		closeDialog(SIGN_IN_MODAL_ID)
	}

	const handleOnSignUp = () => {
		closeDialog(SIGN_IN_MODAL_ID)
		openDialog(SIGN_UP_MODAL_ID)
	}

	return (
		<BaseComponent
			onClick={handleCloseDialog}
			isOpen={isOpen(SIGN_IN_MODAL_ID)}
			id={SIGN_IN_MODAL_ID}
		>
			<div className="space-y-6">
				<div className="text-center space-y-2">
					<div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white">
						<Icon icon="solar:user-bold-duotone" width="24" />
					</div>
					<h3 className="text-2xl font-semibold text-white tracking-tight">
						Bem-vindo de volta
					</h3>
					<p className="text-sm text-slate-400">
						Entre na sua conta para continuar
					</p>
				</div>
				<SignInForm />

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-white/10"></div>
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-[#0f111a] px-2 text-slate-500">
							Ou continue com
						</span>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<button
						type="button"
						className="flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm text-slate-300"
					>
						<Icon icon="devicon:google" width="16" /> Google
					</button>
					<button
						type="button"
						className="flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm text-slate-300"
					>
						<Icon icon="devicon:github" width="16" /> GitHub
					</button>
				</div>

				<div className="text-center text-sm text-slate-500">
					Não tem uma conta?{" "}
					<Button onClick={handleOnSignUp} fullWidth={false} variant="ghost">
						Criar conta
					</Button>
				</div>
			</div>
		</BaseComponent>
	)
}
