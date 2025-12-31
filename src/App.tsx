import { useEffect } from "react"
import {
	DemoSales,
	FeaturesSection,
	Footer,
	HeroSection,
	IntegrationSection,
	LogoSection,
	Navbar,
	PricingSection,
	ROISection,
	SignIn,
	SignUp,
	TestimonialsSection,
} from "./app/components"
import { Button } from "./app/components/ui/button"
import {
	DEMO_SALES_ID,
	SIGN_IN_MODAL_ID,
	SIGN_UP_MODAL_ID,
} from "./app/constants"
import { useDialogActions } from "./app/store/dialog"

function App() {
	const { openDialog } = useDialogActions()

	useEffect(() => {
		let currentCard = 1
		const totalCards = 3
		let autoRotateInterval: NodeJS.Timeout

		// Flashlight effect handler
		const handleMouseMove = (e: MouseEvent) => {
			const cards = document.querySelectorAll(".flashlight-card")
			cards.forEach((card) => {
				const rect = card.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top
				;(card as HTMLElement).style.setProperty("--mouse-x", `${x}px`)
				;(card as HTMLElement).style.setProperty("--mouse-y", `${y}px`)
			})
		}

		const showCard = (index: number) => {
			document
				.querySelectorAll(".feature-card")
				// biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
				.forEach((c) => c.classList.remove("active"))

			const targetCard = document.getElementById(`card-${index}`)
			if (targetCard) {
				targetCard.classList.add("active")
			}

			document.querySelectorAll(".feature-nav-btn").forEach((b) => {
				b.classList.remove("bg-white/5", "active")
				const btn = b as HTMLElement
				if (btn.dataset.target === `card-${index}`) {
					b.classList.add("bg-white/5", "active")
				}
			})
			currentCard = index
		}

		const nextCard = () => {
			let next = currentCard + 1
			if (next > totalCards) next = 1
			showCard(next)
		}

		const prevCard = () => {
			let prev = currentCard - 1
			if (prev < 1) prev = totalCards
			showCard(prev)
		}

		const startRotation = () => {
			autoRotateInterval = setInterval(nextCard, 5000)
		}

		const resetRotation = () => {
			clearInterval(autoRotateInterval)
			startRotation()
		}

		// Event Listeners
		const nextBtn = document.getElementById("next-card")
		const prevBtn = document.getElementById("prev-card")

		const handleNextClick = () => {
			nextCard()
			resetRotation()
		}

		const handlePrevClick = () => {
			prevCard()
			resetRotation()
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", handleNextClick)
		}

		if (prevBtn) {
			prevBtn.addEventListener("click", handlePrevClick)
		}

		const navButtons = document.querySelectorAll(".feature-nav-btn")
		const handleNavClick = (e: Event) => {
			const target = e.currentTarget as HTMLElement
			const targetId = target.dataset.target?.split("-")[1]
			if (targetId) {
				showCard(parseInt(targetId, 10))
				resetRotation()
			}
		}

		navButtons.forEach((btn) => {
			btn.addEventListener("click", handleNavClick)
		})

		document.addEventListener("mousemove", handleMouseMove)
		startRotation()

		// Cleanup
		return () => {
			clearInterval(autoRotateInterval)
			document.removeEventListener("mousemove", handleMouseMove)

			if (nextBtn) {
				nextBtn.removeEventListener("click", handleNextClick)
			}

			if (prevBtn) {
				prevBtn.removeEventListener("click", handlePrevClick)
			}

			navButtons.forEach((btn) => {
				btn.removeEventListener("click", handleNavClick)
			})
		}
	}, [])

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
			<HeroSection signUp={handleOnSignUp} onShowDemo={handleOnShowDemo} />
			<LogoSection />
			<SignIn />
			<SignUp />
			<IntegrationSection />
			<FeaturesSection />
			<ROISection />
			<PricingSection onShowDemo={handleOnShowDemo} onSignUp={handleOnSignUp} />
			<TestimonialsSection />

			<section className="py-32 relative overflow-hidden flex items-center justify-center">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-500/10 via-[#030712] to-[#030712]"></div>

				<div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-8 scroll-reveal">
					<h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
						Pronto para otimizar
						<br />
						sua operação?
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

export default App
