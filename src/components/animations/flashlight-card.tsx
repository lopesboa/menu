import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/utils/misc"

interface FlashlightCardProps {
	children: React.ReactNode
	className?: string
	spotlightSize?: number
	spotlightColor?: string
}

export function FlashlightCard({
	children,
	className,
	spotlightSize = 300,
	spotlightColor = "rgba(34, 197, 94, 0.15)",
}: FlashlightCardProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!cardRef.current) {
				return
			}
			const rect = cardRef.current.getBoundingClientRect()
			setMousePosition({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			})
		}

		const card = cardRef.current
		if (card) {
			card.addEventListener("mousemove", handleMouseMove)
		}

		return () => {
			if (card) {
				card.removeEventListener("mousemove", handleMouseMove)
			}
		}
	}, [])

	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-2xl border border-surface-100 bg-white",
				className
			)}
			ref={cardRef}
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
				style={{
					opacity: 1,
					background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 100%)`,
				}}
			/>
			<div className="relative z-10">{children}</div>
		</div>
	)
}

interface SpotlightCardProps {
	children: React.ReactNode
	className?: string
	gradientPosition?: { x: number; y: number }
}

export function SpotlightCard({
	children,
	className,
	gradientPosition = { x: 50, y: 0 },
}: SpotlightCardProps) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-2xl border border-surface-100 bg-white",
				className
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.div
				animate={{ opacity: isHovered ? 1 : 0 }}
				className="pointer-events-none absolute -inset-px opacity-0"
				style={{
					background: `radial-gradient(600px circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(34, 197, 94, 0.1), transparent 40%)`,
				}}
				transition={{ duration: 0.3 }}
			/>
			<div className="relative z-10">{children}</div>
		</div>
	)
}
