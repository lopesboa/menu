import { useEffect } from "react"
import { buildAbsoluteUrl } from "@/lib/site-url"

const defaultOgImagePath = "/assets/og-image.jpg"
const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//i

interface SEOHeadProps {
	title: string
	description: string
	canonicalPath: string
	keywords?: string
	robots?: string
	ogImage?: string
	structuredData?: Record<string, unknown> | Record<string, unknown>[]
}

export function SEOHead({
	title,
	description,
	canonicalPath,
	keywords,
	robots = "index, follow, max-image-preview:large",
	ogImage,
	structuredData,
}: SEOHeadProps) {
	useEffect(() => {
		const normalizedPath = canonicalPath.startsWith("/")
			? canonicalPath
			: `/${canonicalPath}`
		const canonicalUrl = buildAbsoluteUrl(normalizedPath)
		const resolvedOgImage = resolveMetaImageUrl(ogImage)

		document.title = title
		upsertMetaTag({ name: "description", content: description })
		upsertMetaTag({ name: "robots", content: robots })

		if (keywords) {
			upsertMetaTag({ name: "keywords", content: keywords })
		}

		upsertCanonical(canonicalUrl)

		upsertMetaTag({ property: "og:type", content: "website" })
		upsertMetaTag({ property: "og:url", content: canonicalUrl })
		upsertMetaTag({ property: "og:title", content: title })
		upsertMetaTag({ property: "og:description", content: description })
		upsertMetaTag({ property: "og:image", content: resolvedOgImage })
		upsertMetaTag({ property: "og:locale", content: "pt_BR" })
		upsertMetaTag({ property: "og:site_name", content: "Menu Bão" })

		upsertMetaTag({ name: "twitter:card", content: "summary_large_image" })
		upsertMetaTag({ name: "twitter:url", content: canonicalUrl })
		upsertMetaTag({ name: "twitter:title", content: title })
		upsertMetaTag({ name: "twitter:description", content: description })
		upsertMetaTag({ name: "twitter:image", content: resolvedOgImage })

		if (structuredData) {
			upsertStructuredData(structuredData)
		}
	}, [
		canonicalPath,
		description,
		keywords,
		ogImage,
		robots,
		structuredData,
		title,
	])

	return null
}

function resolveMetaImageUrl(ogImage?: string) {
	if (!ogImage) {
		return buildAbsoluteUrl(defaultOgImagePath)
	}

	const isAbsoluteUrl = ABSOLUTE_URL_REGEX.test(ogImage)

	if (isAbsoluteUrl) {
		return ogImage
	}

	return buildAbsoluteUrl(ogImage)
}

function upsertMetaTag({
	name,
	property,
	content,
}: {
	name?: string
	property?: string
	content: string
}) {
	const selector = name
		? `meta[name="${name}"]`
		: `meta[property="${property}"]`
	let tag = document.querySelector<HTMLMetaElement>(selector)

	if (!tag) {
		tag = document.createElement("meta")
		if (name) {
			tag.setAttribute("name", name)
		}
		if (property) {
			tag.setAttribute("property", property)
		}
		document.head.append(tag)
	}

	tag.setAttribute("content", content)
}

function upsertCanonical(canonicalUrl: string) {
	let canonical = document.querySelector<HTMLLinkElement>(
		'link[rel="canonical"]'
	)

	if (!canonical) {
		canonical = document.createElement("link")
		canonical.setAttribute("rel", "canonical")
		document.head.append(canonical)
	}

	canonical.setAttribute("href", canonicalUrl)
}

function upsertStructuredData(
	structuredData: Record<string, unknown> | Record<string, unknown>[]
) {
	let script = document.getElementById(
		"menu-bao-structured-data"
	) as HTMLScriptElement | null

	if (!script) {
		script = document.querySelector<HTMLScriptElement>(
			'script[type="application/ld+json"]'
		)
	}

	if (!script) {
		script = document.createElement("script")
		script.type = "application/ld+json"
		document.head.append(script)
	}

	script.id = "menu-bao-structured-data"

	script.textContent = JSON.stringify(structuredData)
}
