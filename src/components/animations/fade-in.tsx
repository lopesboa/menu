import { type HTMLMotionProps, motion, type Variants } from "framer-motion"
import React from "react"

interface FadeInProps extends HTMLMotionProps<"div"> {
	children: React.ReactNode
	delay?: number
	duration?: number
	staggerChildren?: number
	staggerParent?: boolean
}

export function FadeIn({
	children,
	delay = 0,
	duration = 0.4,
	staggerChildren,
	staggerParent = false,
	className,
	...props
}: FadeInProps) {
	const containerVariants = staggerParent
		? {
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						staggerChildren: staggerChildren || 0.1,
					},
				},
			}
		: undefined

	const childVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration,
				delay,
				ease: "easeOut",
			},
		},
	} satisfies Variants

	if (staggerParent) {
		return (
			<motion.div
				animate="visible"
				className={className}
				initial="hidden"
				variants={containerVariants}
				{...props}
			>
				{React.Children.map(children, (child) => (
					<motion.span variants={childVariants}>{child}</motion.span>
				))}
			</motion.div>
		)
	}

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className={className}
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration, delay, ease: "easeOut" }}
			{...props}
		>
			{children}
		</motion.div>
	)
}
