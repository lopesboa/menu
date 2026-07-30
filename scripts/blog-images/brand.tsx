import type { CSSProperties, ReactNode } from "react"

export const brandColors = {
	amber: "#f59e0b",
	background: "#0d2f2e",
	backgroundDeep: "#0a2423",
	border: "#2a5552",
	emerald: "#22c55e",
	indigo: "#6366f1",
	indigoDeep: "#4338ca",
	indigoLight: "#818cf8",
	petroleum: "#123b3a",
	paper: "#fff7e8",
	urucum: "#f05a3c",
	muted: "#c8c0b4",
	purple: "#a855f7",
	sky: "#38bdf8",
	surface: "#123b3a",
	surfaceRaised: "#194745",
	text: "#fff7e8",
} as const

export function BrandMark({
	bodyColor,
	color = brandColors.text,
	size,
	tilColor,
}: {
	bodyColor?: string
	color?: string
	size: number
	tilColor?: string
}) {
	const resolvedBodyColor = bodyColor ?? color
	const resolvedTilColor = tilColor ?? color

	return (
		<svg
			aria-label="Menu Bão"
			height={size}
			role="img"
			viewBox="0 0 64 64"
			width={size}
		>
			<path
				d="M28.5 21C15.5 21 6 29.5 6 41.5s9 20 21.5 20c7.2 0 13.2-3 17.2-8.5v7H57V22H44.7v6.2C40.7 23.2 35 21 28.5 21Zm1.5 10.5c8 0 14 3.5 14 9.5 0 6.5-6 10.5-14 10.5-7.2 0-12.5-4-12.5-10 0-6.2 5.3-9.5 12.5-10Z"
				fill={resolvedBodyColor}
				fillRule="evenodd"
			/>
			<path
				d="M15 10c5-6 13-7 20-1 6 5 11 5 16-2 3-4 7-4 9-1 3 3 2 6-1 9-8 8-18 8-27 2-5-4-8-3-11 1-3 3-7 3-9 0-3-3-2-6 2-8Z"
				fill={resolvedTilColor}
				transform="translate(2 -2) scale(.9)"
			/>
		</svg>
	)
}

export function BrandWordmark({
	color = brandColors.text,
	fontSize,
}: {
	color?: string
	fontSize: number
}) {
	return (
		<div
			aria-label="Menu Bão"
			role="img"
			style={{
				color,
				display: "flex",
				fontFamily: "Bricolage Grotesque",
				fontSize,
				fontWeight: 700,
				letterSpacing: "-0.045em",
				lineHeight: 1,
			}}
		>
			<span style={{ display: "flex" }}>menu b</span>
			<span style={{ display: "flex", position: "relative" }}>
				a
				<svg
					aria-hidden="true"
					height={fontSize * 0.3}
					style={{
						left: "50%",
						position: "absolute",
						top: -fontSize * 0.18,
						transform: "translateX(-50%)",
					}}
					viewBox="10 0 52 20"
					width={fontSize * 0.72}
				>
					<path
						d="M15 10c5-6 13-7 20-1 6 5 11 5 16-2 3-4 7-4 9-1 3 3 2 6-1 9-8 8-18 8-27 2-5-4-8-3-11 1-3 3-7 3-9 0-3-3-2-6 2-8Z"
						fill={color}
						transform="translate(2 -2) scale(.9)"
					/>
				</svg>
			</span>
			<span style={{ display: "flex" }}>o</span>
		</div>
	)
}

type Accent =
	| "amber"
	| "emerald"
	| "indigo"
	| "petroleum"
	| "purple"
	| "sky"
	| "urucum"

interface ImageCanvasProps {
	accent?: Accent
	children: ReactNode
	height: number
	width: number
}

const accentColors: Record<Accent, string> = {
	amber: brandColors.amber,
	emerald: brandColors.emerald,
	indigo: brandColors.indigo,
	petroleum: brandColors.petroleum,
	purple: brandColors.purple,
	sky: brandColors.sky,
	urucum: brandColors.urucum,
}

export function ImageCanvas({
	accent = "indigo",
	children,
	height,
	width,
}: ImageCanvasProps) {
	const accentColor = accentColors[accent]

	return (
		<div
			lang="pt-BR"
			style={{
				alignItems: "stretch",
				backgroundColor: brandColors.background,
				color: brandColors.text,
				display: "flex",
				fontFamily: "Inter",
				height,
				overflow: "hidden",
				position: "relative",
				width,
			}}
		>
			<div
				style={{
					backgroundImage: `radial-gradient(circle, ${accentColor}33 0%, ${accentColor}0 68%)`,
					display: "flex",
					height: 760,
					position: "absolute",
					right: -210,
					top: -310,
					width: 760,
				}}
			/>
			<div
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
					backgroundSize: "48px 48px",
					display: "flex",
					height,
					left: 0,
					maskImage:
						"linear-gradient(to bottom, rgba(0,0,0,0.75), transparent 85%)",
					position: "absolute",
					top: 0,
					width,
				}}
			/>
			{children}
		</div>
	)
}

export function Surface({
	children,
	style,
}: {
	children: ReactNode
	style?: CSSProperties
}) {
	return (
		<div
			style={{
				backgroundColor: brandColors.surface,
				border: `1px solid ${brandColors.border}`,
				borderRadius: 26,
				display: "flex",
				...style,
			}}
		>
			{children}
		</div>
	)
}
