export function buildAbsoluteUrl(path: string) {
	const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL?.trim()

	const normalizedPath = path.startsWith("/") ? path : `/${path}`

	return `${siteUrl}${normalizedPath}`
}
