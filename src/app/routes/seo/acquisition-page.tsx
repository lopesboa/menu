import { useEffect } from "react"
import { useParams } from "react-router"
import { DEMO_SALES_ID } from "@/app/constants"
import { NotFoundPage } from "@/app/routes/error-pages/not-found"
import {
	type AcquisitionPage,
	acquisitionPages,
} from "@/app/routes/seo/data/acquisition-pages"
import { useDialogActions } from "@/app/store/dialog"
import { DemoSales } from "@/components/sections/sales"
import { AcquisitionSEOTemplate } from "@/components/seo/acquisition-seo-template"
import { SEOHead } from "@/components/seo/seo-head"
import { usePostHogEvent } from "@/hooks/use-posthog"
import { AnalyticsEvents } from "@/lib/analytics/events"
import {
	buildLandingEventProperties,
	persistLandingAttribution,
	rememberLandingRegisterIntent,
} from "@/lib/analytics/landing"
import { buildAbsoluteUrl } from "@/lib/site-url"

export default function AcquisitionPageRoute() {
	const { landingSlug } = useParams<{ landingSlug: string }>()
	const page = landingSlug ? acquisitionPages[landingSlug] : undefined

	if (!page) {
		return <NotFoundPage />
	}

	return <AcquisitionPageContent page={page} />
}

function AcquisitionPageContent({ page }: { page: AcquisitionPage }) {
	const { capture } = usePostHogEvent()
	const { openDialog } = useDialogActions()

	useEffect(() => {
		persistLandingAttribution()
		capture(
			AnalyticsEvents.PAGE_VIEWED,
			buildLandingEventProperties({
				cta_label: "page_view",
				cta_position: "seo_landing",
				page: page.page,
			})
		)
	}, [capture, page.page])

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
			page: page.page,
		})

		capture(AnalyticsEvents.CTA_CLICKED, properties)
		capture(AnalyticsEvents.DEMO_OPENED, properties)
		openDialog(DEMO_SALES_ID)
	}

	const handleRegisterClick = ({
		ctaLabel,
		ctaPosition,
	}: {
		ctaLabel: string
		ctaPosition: string
	}) => {
		const properties = buildLandingEventProperties({
			cta_label: ctaLabel,
			cta_position: ctaPosition,
			page: page.page,
		})

		capture(AnalyticsEvents.CTA_CLICKED, properties)
		capture(AnalyticsEvents.REGISTER_STARTED, properties)
		rememberLandingRegisterIntent(properties)
	}

	return (
		<>
			<SEOHead
				canonicalPath={`/solucoes/${page.slug}`}
				description={page.seo.description}
				keywords={page.seo.keywords}
				robots={page.seo.robots}
				structuredData={buildAcquisitionStructuredData(page)}
				title={page.seo.title}
			/>
			<AcquisitionSEOTemplate
				onShowDemo={handleOnShowDemo}
				onStartRegister={handleRegisterClick}
				page={page}
			/>
			<DemoSales />
		</>
	)
}

function buildAcquisitionStructuredData(page: AcquisitionPage) {
	const pageUrl = buildAbsoluteUrl(`/solucoes/${page.slug}`)

	return [
		{
			"@context": "https://schema.org",
			"@type": "WebPage",
			name: page.seo.title,
			description: page.seo.description,
			url: pageUrl,
			inLanguage: "pt-BR",
		},
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: page.faq.map((faq) => ({
				"@type": "Question",
				name: faq.question,
				acceptedAnswer: {
					"@type": "Answer",
					text: faq.answer,
				},
			})),
		},
	]
}
