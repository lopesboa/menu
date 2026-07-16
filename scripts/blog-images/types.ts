import type { ReactElement } from "react"

export interface BlogImage {
	alt: string
	element: ReactElement
	height: number
	name: string
	width: number
}

export interface BlogImageDefinition {
	images: BlogImage[]
	outputDirectory?: string
	slug: string
}

export function defineBlogImages(
	definition: BlogImageDefinition
): BlogImageDefinition {
	return definition
}
