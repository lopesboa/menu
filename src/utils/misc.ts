import * as clsx from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: clsx.ClassValue[]) {
	return twMerge(clsx.clsx(inputs))
}

export function createOrgSlug(name: string): string {
	return name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "")
}
