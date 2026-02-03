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
			id={SIGN_IN_MODAL_ID}
			isOpen={isOpen(SIGN_IN_MODAL_ID)}
			onClick={handleCloseDialog}
		>
			<div className="space-y-6">
				<div className="space-y-2 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
						<Icon icon="solar:user-bold-duotone" width="24" />
					</div>
					<h3 className="font-semibold text-2xl text-white tracking-tight">
						Bem-vindo de volta
					</h3>
					<p className="text-slate-400 text-sm">
						Entre na sua conta para continuar
					</p>
				</div>
				<button
					className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 text-slate-300 text-sm transition-colors hover:bg-white/10"
					name="Entrar Com Google"
					type="button"
				>
					<Icon icon="devicon:google" width="16" /> Continuar com o Google
				</button>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-white/10 border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-[#0f111a] px-2 text-slate-500">
							Ou continue com
						</span>
					</div>
				</div>

				<SignInForm onNavigate={handleCloseDialog} />

				<div className="text-center text-slate-500 text-sm">
					Não tem uma conta?{" "}
					<Button fullWidth={false} onClick={handleOnSignUp} variant="ghost">
						Criar conta
					</Button>
				</div>
			</div>
		</BaseComponent>
	)
}
