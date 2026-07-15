import type { ReactNode } from "react"
import { brandColors, ImageCanvas, Surface } from "../brand"

interface EditorialCoverProps {
	summary: string
	title: string
	visual?: ReactNode
}

export function EditorialCover({
	summary,
	title,
	visual,
}: EditorialCoverProps) {
	return (
		<ImageCanvas height={630} width={1200}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: 630,
					justifyContent: "center",
					padding: "58px 64px",
					position: "relative",
					width: 1200,
				}}
			>
				<div
					style={{
						alignItems: "stretch",
						display: "flex",
						gap: 52,
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							width: 650,
						}}
					>
						<div
							style={{
								display: "flex",
								fontSize: 68,
								fontWeight: 700,
								letterSpacing: "-0.055em",
								lineHeight: 0.98,
								wordBreak: "break-word",
							}}
						>
							{title}
						</div>
						<div
							style={{
								color: brandColors.muted,
								display: "flex",
								fontSize: 24,
								lineHeight: 1.35,
								marginTop: 24,
								maxWidth: 600,
							}}
						>
							{summary}
						</div>
					</div>
					<div style={{ display: "flex", flexGrow: 1 }}>
						{visual ?? <DefaultEditorialVisual />}
					</div>
				</div>
			</div>
		</ImageCanvas>
	)
}

function DefaultEditorialVisual() {
	return (
		<Surface
			style={{
				alignItems: "center",
				flexDirection: "column",
				gap: 18,
				justifyContent: "center",
				padding: 28,
				transform: "rotate(2deg)",
				width: "100%",
			}}
		>
			<VisualLayer color={brandColors.sky} label="Ideia" width="72%" />
			<VisualLayer color={brandColors.purple} label="Estrutura" width="86%" />
			<VisualLayer color={brandColors.indigo} label="Imagem" width="100%" />
		</Surface>
	)
}

function VisualLayer({
	color,
	label,
	width,
}: {
	color: string
	label: string
	width: string
}) {
	return (
		<div
			style={{
				alignItems: "center",
				backgroundColor: `${color}1f`,
				border: `1px solid ${color}66`,
				borderRadius: 16,
				color,
				display: "flex",
				fontSize: 22,
				fontWeight: 600,
				justifyContent: "center",
				padding: "20px 24px",
				width,
			}}
		>
			{label}
		</div>
	)
}
