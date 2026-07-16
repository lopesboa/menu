import type { CSSProperties, ReactNode } from "react"

export const brandColors = {
	amber: "#f59e0b",
	background: "#030712",
	backgroundDeep: "#050505",
	border: "#27272a",
	emerald: "#22c55e",
	indigo: "#6366f1",
	muted: "#a1a1aa",
	purple: "#a855f7",
	sky: "#38bdf8",
	surface: "#0f111a",
	surfaceRaised: "#18181b",
	text: "#f8fafc",
} as const

type Accent = "amber" | "emerald" | "indigo" | "purple" | "sky"

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
	purple: brandColors.purple,
	sky: brandColors.sky,
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
