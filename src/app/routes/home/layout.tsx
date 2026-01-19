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

			<section className="py-32 relative overflow-hidden flex items-center justify-center">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-500/10 via-[#030712] to-[#030712]"></div>

				<div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-8 scroll-reveal">
					<h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
						Pronto Para Otimizar
						<br />
						Suas Operações?
					</h2>
					<p className="text-lg text-slate-400">
						Junte-se a mais de 500 restaurantes que escalaram com o Menu Bão.
						Cancele quando quiser.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
						<Button
							onClick={handleOnSignUp}
							className="sm:w-auto px-8 py-4 rounded-full hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
						>
							Começar Teste Grátis
						</Button>
						<Button
							onClick={handleOnShowDemo}
							className="sm:w-auto px-8 py-4 rounded-full"
							variant="secondary"
						>
							Começar Teste Grátis
						</Button>
					</div>
					<p className="text-xs text-slate-500 mt-6">
						Não é necessário cartão de crédito para começar.
					</p>
				</div>
			</section>
			<DemoSales />
			<Footer />
		</>
	)
}
