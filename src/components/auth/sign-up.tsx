import { Icon } from "@iconify-icon/react"
import { SIGN_IN_MODAL_ID, SIGN_UP_MODAL_ID } from "@/app/constants"
import { useDialog, useDialogActions } from "@/app/store/dialog"
import { Button } from "../ui/button"
import { BaseComponent } from "./base"
import { SignUpForm } from "./form/sign-up-form"

//TODO: ADD logic to remove the scale-95 when dialog is open

export function SignUp() {
	const { closeDialog, openDialog } = useDialogActions()
	const { isOpen } = useDialog()

	const handleCloseDialog = () => {
		closeDialog(SIGN_UP_MODAL_ID)
	}

	const handleOnSignIn = () => {
		closeDialog(SIGN_UP_MODAL_ID)
		openDialog(SIGN_IN_MODAL_ID)
	}

	return (
		<BaseComponent
			onClick={handleCloseDialog}
			isOpen={isOpen(SIGN_UP_MODAL_ID)}
			id={SIGN_UP_MODAL_ID}
		>
			<div className="space-y-6">
				<div className="text-center space-y-2">
					<div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-indigo-400">
						<Icon icon="solar:rocket-2-bold-duotone" width="24" />
					</div>
					<h3 className="text-2xl font-semibold text-white tracking-tight">
						Crie sua conta
					</h3>
					<p className="text-sm text-slate-400">
						Comece seu teste de 14 dias grátis
					</p>
				</div>

				<SignUpForm />
				<div className="text-center text-sm text-slate-500">
					Já tem uma conta?{" "}
					<Button onClick={handleOnSignIn} fullWidth={false} variant="ghost">
						Entrar
					</Button>
				</div>
			</div>
		</BaseComponent>
	)
}
