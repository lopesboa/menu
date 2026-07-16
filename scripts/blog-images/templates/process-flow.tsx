import { brandColors, ImageCanvas, Surface } from "../brand"

type StepTone = "amber" | "emerald" | "indigo" | "purple" | "sky"

interface ProcessStep {
	description: string
	id: string
	label: string
	tone: StepTone
}

interface ProcessFlowProps {
	steps: ProcessStep[]
	subtitle: string
	title: string
}

const toneColors: Record<StepTone, string> = {
	amber: brandColors.amber,
	emerald: brandColors.emerald,
	indigo: brandColors.indigo,
	purple: brandColors.purple,
	sky: brandColors.sky,
}

export function ProcessFlow({ steps, subtitle, title }: ProcessFlowProps) {
	const cardWidth = steps.length <= 3 ? 300 : 220

	return (
		<ImageCanvas accent="purple" height={675} width={1200}>
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
						flexDirection: "column",
						marginTop: 0,
					}}
				>
					<div
						style={{
							display: "flex",
							fontSize: 50,
							fontWeight: 700,
							letterSpacing: "-0.045em",
							lineHeight: 1.05,
						}}
					>
						{title}
					</div>
					<div
						style={{
							color: brandColors.muted,
							display: "flex",
							fontSize: 23,
							marginTop: 12,
						}}
					>
						{subtitle}
					</div>
				</div>
				<div
					style={{
						alignItems: "stretch",
						display: "flex",
						gap: 18,
						marginTop: 42,
					}}
				>
					{steps.map((step, index) => (
						<div
							key={step.id}
							style={{
								alignItems: "center",
								display: "flex",
								flexGrow: 1,
								gap: 18,
							}}
						>
							<StepCard index={index + 1} step={step} width={cardWidth} />
							{index < steps.length - 1 ? <FlowArrow /> : null}
						</div>
					))}
				</div>
			</div>
		</ImageCanvas>
	)
}

function StepCard({
	index,
	step,
	width,
}: {
	index: number
	step: ProcessStep
	width: number
}) {
	const color = toneColors[step.tone]

	return (
		<Surface
			style={{
				flexDirection: "column",
				height: 210,
				padding: 24,
				width,
			}}
		>
			<div
				style={{
					alignItems: "center",
					backgroundColor: `${color}1f`,
					border: `1px solid ${color}66`,
					borderRadius: 999,
					color,
					display: "flex",
					fontSize: 18,
					fontWeight: 700,
					height: 36,
					justifyContent: "center",
					width: 36,
				}}
			>
				{index}
			</div>
			<div
				style={{
					display: "flex",
					fontSize: 27,
					fontWeight: 600,
					marginTop: 20,
				}}
			>
				{step.label}
			</div>
			<div
				style={{
					color: brandColors.muted,
					display: "flex",
					fontSize: 19,
					lineHeight: 1.35,
					marginTop: 10,
				}}
			>
				{step.description}
			</div>
		</Surface>
	)
}

function FlowArrow() {
	return (
		<div
			style={{
				alignItems: "center",
				color: brandColors.muted,
				display: "flex",
				fontSize: 30,
				justifyContent: "center",
				width: 24,
			}}
		>
			→
		</div>
	)
}
