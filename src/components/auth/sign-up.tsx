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
			id={SIGN_UP_MODAL_ID}
			isOpen={isOpen(SIGN_UP_MODAL_ID)}
			onClick={handleCloseDialog}
		>
			<div className="space-y-6">
				<div className="space-y-2 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-400">
						<Icon icon="solar:rocket-2-bold-duotone" width="24" />
					</div>
					<h3 className="font-semibold text-2xl text-white tracking-tight">
						Crie sua conta
					</h3>
					<p className="text-slate-400 text-sm">
						Comece seu teste de 14 dias grátis
					</p>
				</div>

				<SignUpForm />
				<div className="text-center text-slate-500 text-sm">
					Já tem uma conta?{" "}
					<Button fullWidth={false} onClick={handleOnSignIn} variant="ghost">
						Entrar
					</Button>
				</div>
			</div>
		</BaseComponent>
	)
}
