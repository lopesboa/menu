import { useEffect } from "react"
import { Link } from "react-router"
import { DEMO_SALES_ID } from "@/app/constants"
import { useDialogActions } from "@/app/store/dialog"
import { LogoSection } from "@/components/logos"
import { FeaturesSection } from "@/components/sections/features"
import { HeroSection } from "@/components/sections/hero"
import { IntegrationSection } from "@/components/sections/integrations"
import { PricingSection } from "@/components/sections/pricing"
import { ROISection } from "@/components/sections/roi"
import { DemoSales } from "@/components/sections/sales"
import { TestimonialsSection } from "@/components/sections/testimonial"
import { SEOHead } from "@/components/seo/seo-head"
import { Button } from "@/components/ui/button"
import { usePostHogEvent } from "@/hooks/use-posthog"
import { AnalyticsEvents } from "@/lib/analytics/events"
import {
	buildLandingEventProperties,
	persistLandingAttribution,
	rememberLandingRegisterIntent,
} from "@/lib/analytics/landing"

export default function Home() {
	const { openDialog } = useDialogActions()
	const { capture } = usePostHogEvent()

	useEffect(() => {
		const featuresSection = document.getElementById("features")
		if (!featuresSection) {
			return
		}

		let teardownFeatureInteractions: (() => void) | null = null

		const setupFeatureInteractions = () => {
			let currentCard = 1
			const totalCards = 3
			let autoRotateInterval: ReturnType<typeof setInterval> | null = null
			let animationFrame: number | null = null
			let pointerX = 0
			let pointerY = 0

			const flashlightContainer = document.querySelector<HTMLElement>(
				".flashlight-container"
			)

			const updateFlashlightPosition = () => {
				const cards = document.querySelectorAll<HTMLElement>(".flashlight-card")
				for (const card of cards) {
					const rect = card.getBoundingClientRect()
					const x = pointerX - rect.left
					const y = pointerY - rect.top
					card.style.setProperty("--mouse-x", `${x}px`)
					card.style.setProperty("--mouse-y", `${y}px`)
				}

				animationFrame = null
			}

			const handlePointerMove = (event: PointerEvent) => {
				pointerX = event.clientX
				pointerY = event.clientY

				if (animationFrame === null) {
					animationFrame = requestAnimationFrame(updateFlashlightPosition)
				}
			}

			const showCard = (index: number) => {
				const featureCard = document.querySelectorAll(".feature-card")

				for (const c of featureCard) {
					c.classList.remove("active")
				}

				const targetCard = document.getElementById(`card-${index}`)
				if (targetCard) {
					targetCard.classList.add("active")
				}

				const featureNavBtn = document.querySelectorAll(".feature-nav-btn")
				for (const b of featureNavBtn) {
					b.classList.remove("bg-white/5", "active")
					const btn = b as HTMLElement
					if (btn.dataset.target === `card-${index}`) {
						b.classList.add("bg-white/5", "active")
					}
				}

				currentCard = index
			}

			const nextCard = () => {
				let next = currentCard + 1
				if (next > totalCards) {
					next = 1
				}
				showCard(next)
			}

			const prevCard = () => {
				let prev = currentCard - 1
				if (prev < 1) {
					prev = totalCards
				}
				showCard(prev)
			}

			const startRotation = () => {
				autoRotateInterval = setInterval(nextCard, 5000)
			}

			const resetRotation = () => {
				if (autoRotateInterval) {
					clearInterval(autoRotateInterval)
				}
				startRotation()
			}

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
			const handleNavClick = (event: Event) => {
				const target = event.currentTarget as HTMLElement
				const targetId = target.dataset.target?.split("-")[1]
				if (targetId) {
					showCard(Number.parseInt(targetId, 10))
					resetRotation()
				}
			}

			for (const btn of navButtons) {
				btn.addEventListener("click", handleNavClick)
			}

			flashlightContainer?.addEventListener("pointermove", handlePointerMove, {
				passive: true,
			})
			startRotation()

			return () => {
				if (autoRotateInterval) {
					clearInterval(autoRotateInterval)
				}

				if (animationFrame !== null) {
					cancelAnimationFrame(animationFrame)
				}

				flashlightContainer?.removeEventListener(
					"pointermove",
					handlePointerMove
				)

				if (nextBtn) {
					nextBtn.removeEventListener("click", handleNextClick)
				}

				if (prevBtn) {
					prevBtn.removeEventListener("click", handlePrevClick)
				}

				for (const btn of navButtons) {
					btn.removeEventListener("click", handleNavClick)
				}
			}
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						teardownFeatureInteractions = setupFeatureInteractions()
						observer.disconnect()
						break
					}
				}
			},
			{
				threshold: 0.1,
				rootMargin: "200px 0px",
			}
		)

		observer.observe(featuresSection)

		return () => {
			observer.disconnect()
			teardownFeatureInteractions?.()
		}
	}, [])

	useEffect(() => {
		persistLandingAttribution()
		capture(
			AnalyticsEvents.PAGE_VIEWED,
			buildLandingEventProperties({
				cta_label: "page_view",
				cta_position: "home",
			})
		)
	}, [capture])

	const handleOnShowDemo = ({
		ctaLabel,
		ctaPosition,
	}: {
		ctaLabel: string
		ctaPosition: string
	}) => {
		const properties = buildLandingEventProperties({
			cta_label: ctaLabel,
			cta_position: ctaPosition,
		})

		capture(AnalyticsEvents.CTA_CLICKED, properties)
		capture(AnalyticsEvents.DEMO_OPENED, properties)
		openDialog(DEMO_SALES_ID)
	}

	const handleRegisterClick = ({
		ctaLabel,
		ctaPosition,
		plan,
	}: {
		ctaLabel: string
		ctaPosition: string
		plan?: string
	}) => {
		const properties = buildLandingEventProperties({
			cta_label: ctaLabel,
			cta_position: ctaPosition,
			plan,
		})

		capture(AnalyticsEvents.CTA_CLICKED, properties)
		capture(AnalyticsEvents.REGISTER_STARTED, properties)
		rememberLandingRegisterIntent(properties)
	}

	return (
		<main>
			<SEOHead
				canonicalPath="/"
				description="O sistema operacional completo para restaurantes modernos. Centralize iFood, Rappi, Cardápio Digital e Gestão Financeira em uma única tela. Teste grátis!"
				keywords="sistema para restaurante, sistema pdv, cardápio digital, gestão de delivery, ifood integração, frente de caixa, automação comercial, menu bão"
				structuredData={{
					"@context": "https://schema.org",
					"@type": "SoftwareApplication",
					name: "Menu Bão",
					operatingSystem: "Web, Android, iOS",
					applicationCategory: "BusinessApplication",
					aggregateRating: {
						"@type": "AggregateRating",
						ratingValue: "4.9",
						ratingCount: "500",
					},
					offers: {
						"@type": "Offer",
						price: "0",
						priceCurrency: "BRL",
					},
					description:
						"Sistema operacional completo para gestão de restaurantes, delivery e cardápio digital.",
				}}
				title="Menu Bão - Sistema PDV e Gestão para Restaurantes e Delivery"
			/>
			<HeroSection
				onShowDemo={handleOnShowDemo}
				onStartRegister={handleRegisterClick}
			/>
			<LogoSection />
			<IntegrationSection />
			<FeaturesSection />
			<ROISection />
			<PricingSection
				onShowDemo={handleOnShowDemo}
				onStartRegister={handleRegisterClick}
			/>
			<TestimonialsSection />
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
						<Button className="rounded-full px-8 py-4 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-slate-200 sm:w-auto">
							<Link
								aria-label="Navegar para criar conta grátis"
								onClick={() => {
									handleRegisterClick({
										ctaLabel: "Criar conta grátis",
										ctaPosition: "bottom_primary",
									})
								}}
								to="/register"
							>
								Criar conta grátis
							</Link>
						</Button>
						<Button
							className="rounded-full px-8 py-4 sm:w-auto"
							onClick={() => {
								handleOnShowDemo({
									ctaLabel: "Falar com especialista",
									ctaPosition: "bottom_secondary",
								})
							}}
							variant="secondary"
						>
							Falar com especialista
						</Button>
					</div>
					<p className="mt-6 text-slate-500 text-xs">
						Não é necessário cartão de crédito para começar.
					</p>
				</div>
			</section>
			<DemoSales />
		</main>
	)
}
