import { brandColors, ImageCanvas, Surface } from "../brand"

interface ComparisonSide {
	description: string
	items: string[]
	label: string
	tone: "amber" | "emerald"
}

interface ConceptComparisonProps {
	left: ComparisonSide
	right: ComparisonSide
	title: string
}

export function ConceptComparison({
	left,
	right,
	title,
}: ConceptComparisonProps) {
	return (
		<ImageCanvas accent="emerald" height={675} width={1200}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: 675,
					justifyContent: "center",
					padding: "54px 64px",
					position: "relative",
					width: 1200,
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 50,
						fontWeight: 700,
						letterSpacing: "-0.045em",
						lineHeight: 1.05,
						marginTop: 0,
					}}
				>
					{title}
				</div>
				<div
					style={{
						alignItems: "stretch",
						display: "flex",
						gap: 24,
						marginTop: 34,
					}}
				>
					<ComparisonCard side={left} />
					<div
						style={{
							alignItems: "center",
							color: brandColors.muted,
							display: "flex",
							fontSize: 18,
							fontWeight: 700,
							justifyContent: "center",
							width: 42,
						}}
					>
						VS
					</div>
					<ComparisonCard side={right} />
				</div>
			</div>
		</ImageCanvas>
	)
}

function ComparisonCard({ side }: { side: ComparisonSide }) {
	const color =
		side.tone === "emerald" ? brandColors.emerald : brandColors.amber

	return (
		<Surface
			style={{
				borderColor: `${color}55`,
				flexDirection: "column",
				flexGrow: 1,
				minHeight: 330,
				padding: 28,
			}}
		>
			<div
				style={{
					color,
					display: "flex",
					fontSize: 28,
					fontWeight: 700,
				}}
			>
				{side.label}
			</div>
			<div
				style={{
					color: brandColors.muted,
					display: "flex",
					fontSize: 20,
					lineHeight: 1.35,
					marginTop: 10,
				}}
			>
				{side.description}
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 12,
					marginTop: 22,
				}}
			>
				{side.items.map((item) => (
					<div
						key={item}
						style={{
							alignItems: "center",
							display: "flex",
							fontSize: 20,
							gap: 12,
						}}
					>
						<div
							style={{
								backgroundColor: color,
								borderRadius: 999,
								display: "flex",
								height: 8,
								width: 8,
							}}
						/>
						{item}
					</div>
				))}
			</div>
		</Surface>
	)
}
