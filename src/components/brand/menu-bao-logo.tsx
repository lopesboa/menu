import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/utils/misc"

export function MenuBaoMark({
	bodyClassName,
	className,
	tilClassName,
	...props
}: ComponentPropsWithoutRef<"svg"> & {
	bodyClassName?: string
	tilClassName?: string
}) {
	return (
		<svg
			aria-hidden="true"
			className={cn("shrink-0", className)}
			fill="none"
			focusable="false"
			viewBox="0 0 64 64"
			{...props}
		>
			<path
				className={bodyClassName}
				d="M28.5 21C15.5 21 6 29.5 6 41.5s9 20 21.5 20c7.2 0 13.2-3 17.2-8.5v7H57V22H44.7v6.2C40.7 23.2 35 21 28.5 21Zm1.5 10.5c8 0 14 3.5 14 9.5 0 6.5-6 10.5-14 10.5-7.2 0-12.5-4-12.5-10 0-6.2 5.3-9.5 12.5-10Z"
				fill="currentColor"
				fillRule="evenodd"
			/>
			<path
				className={tilClassName}
				d="M15 10c5-6 13-7 20-1 6 5 11 5 16-2 3-4 7-4 9-1 3 3 2 6-1 9-8 8-18 8-27 2-5-4-8-3-11 1-3 3-7 3-9 0-3-3-2-6 2-8Z"
				fill="currentColor"
				transform="translate(2 -2) scale(.9)"
			/>
		</svg>
	)
}

interface MenuBaoLogoProps extends ComponentPropsWithoutRef<"span"> {
	markClassName?: string
	markTilClassName?: string
	wordmarkClassName?: string
}

interface MenuBaoWordmarkProps extends ComponentPropsWithoutRef<"span"> {
	tilClassName?: string
}

export function MenuBaoWordmark({
	className,
	tilClassName,
	...props
}: MenuBaoWordmarkProps) {
	return (
		<span
			aria-label="Menu Bão"
			className={cn("font-bold font-brand tracking-[-0.045em]", className)}
			role="img"
			{...props}
		>
			<span aria-hidden="true">
				menu b
				<span className="relative inline-block">
					a
					<svg
						aria-hidden="true"
						className={cn(
							"absolute -top-[0.18em] left-1/2 h-[0.3em] w-[0.72em] -translate-x-1/2 overflow-visible",
							tilClassName
						)}
						viewBox="10 0 52 20"
					>
						<path
							d="M15 10c5-6 13-7 20-1 6 5 11 5 16-2 3-4 7-4 9-1 3 3 2 6-1 9-8 8-18 8-27 2-5-4-8-3-11 1-3 3-7 3-9 0-3-3-2-6 2-8Z"
							fill="currentColor"
							transform="translate(2 -2) scale(.9)"
						/>
					</svg>
				</span>
				o
			</span>
		</span>
	)
}

export function MenuBaoLogo({
	className,
	markClassName,
	markTilClassName,
	wordmarkClassName,
	...props
}: MenuBaoLogoProps) {
	return (
		<span
			aria-label="Menu Bão"
			className={cn("inline-flex items-center gap-2", className)}
			role="img"
			{...props}
		>
			<MenuBaoMark
				className={cn("size-6", markClassName)}
				tilClassName={markTilClassName}
			/>
			<MenuBaoWordmark
				aria-hidden="true"
				className={cn("text-sm", wordmarkClassName)}
				role="presentation"
			/>
		</span>
	)
}
