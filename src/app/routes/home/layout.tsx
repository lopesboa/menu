import { Outlet } from "react-router"
import {
	DEMO_SALES_ID,
	SIGN_IN_MODAL_ID,
	SIGN_UP_MODAL_ID,
} from "@/app/constants"
import { useDialogActions } from "@/app/store/dialog"
import { DemoSales, Footer, Navbar } from "@/components"
import { Button } from "@/components/ui/button"

export default function HomeLayout() {
	const { openDialog } = useDialogActions()

	const handleOnSignIn = () => {
		openDialog(SIGN_IN_MODAL_ID)
	}

	const handleOnSignUp = () => {
		openDialog(SIGN_UP_MODAL_ID)
	}

	const handleOnShowDemo = () => {
		openDialog(DEMO_SALES_ID)
	}

	return (
		<>
			<Navbar signIn={handleOnSignIn} signUp={handleOnSignUp} />
			<Outlet />

			<section className="relative flex items-center justify-center overflow-hidden py-32">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-500/10 via-[#030712] to-[#030712]" />

				<div className="scroll-reveal relative z-10 mx-auto max-w-2xl space-y-8 px-6 text-center">
					<h2 className="font-medium text-4xl text-white leading-tight tracking-tight md:text-5xl">
						Pronto Para Otimizar
						<br />
						Suas Operações?
					</h2>
					<p className="text-lg text-slate-400">
						Junte-se a mais de 500 restaurantes que escalaram com o Menu Bão.
						Cancele quando quiser.
					</p>
					<div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
						<Button
							className="rounded-full px-8 py-4 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-slate-200 sm:w-auto"
							onClick={handleOnSignUp}
						>
							Começar Teste Grátis
						</Button>
						<Button
							className="rounded-full px-8 py-4 sm:w-auto"
							onClick={handleOnShowDemo}
							variant="secondary"
						>
							Começar Teste Grátis
						</Button>
					</div>
					<p className="mt-6 text-slate-500 text-xs">
						Não é necessário cartão de crédito para começar.
					</p>
				</div>
			</section>
			<DemoSales />
			<Footer />
		</>
	)
}
