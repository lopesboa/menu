import { motion } from "framer-motion"
import type React from "react"
import { cn } from "@/utils/misc"

interface BorderBeamProps {
	children: React.ReactNode
	className?: string
	color?: string
	duration?: number
}

export function BorderBeam({
	children,
	className,
	color = "rgba(255, 255, 255, 0.5)",
	duration = 3,
}: BorderBeamProps) {
	return (
		<div className={cn("relative overflow-hidden rounded-xl", className)}>
			<div className="absolute inset-0 rounded-xl border-2 border-transparent">
				<motion.div
					className="absolute inset-0 rounded-xl"
					style={{
						border: `1px solid ${color}`,
						mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
						maskComposite: "exclude",
						padding: "1px",
					}}
				>
					<motion.div
						animate={{
							backgroundPosition: ["0% 0%", "200% 0%"],
						}}
						className="absolute inset-0 rounded-xl"
						style={{
							background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
							backgroundSize: "200% 100%",
						}}
						transition={{
							duration,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					/>
				</motion.div>
			</div>
			<div className="relative">{children}</div>
		</div>
	)
}

interface GlowingBorderProps {
	children: React.ReactNode
	className?: string
	glowColor?: string
}

export function GlowingBorder({
	children,
	className,
	glowColor = "#22c55e",
}: GlowingBorderProps) {
	return (
		<div className={cn("relative rounded-xl", className)}>
			<div
				className="absolute -inset-0.5 rounded-xl opacity-30 blur"
				style={{ background: glowColor }}
			/>
			<div className="relative rounded-xl bg-white">{children}</div>
		</div>
	)
}
