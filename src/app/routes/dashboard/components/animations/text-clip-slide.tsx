import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TextClipSlideProps {
	text: string
	delay?: number
	duration?: number
	className?: string
	as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export function TextClipSlide({
	text,
	delay = 0,
	duration = 0.5,
	className,
	as: Component = "h2",
}: TextClipSlideProps) {
	const ref = useRef<HTMLHeadingElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-10%" })

	const words = text.split(" ")

	return (
		<Component className={className} ref={ref}>
			<span className="sr-only">{text}</span>
			{isInView && (
				<motion.div
					animate="visible"
					className="flex flex-wrap gap-x-3 overflow-hidden"
					initial="hidden"
					transition={{ staggerChildren: 0.05, delayChildren: delay }}
				>
					{words.map((word, i) => (
						<motion.span
							className="inline-block"
							key={word}
							variants={{
								hidden: {
									clipPath: "inset(0 100% 0 0)",
									y: 50,
								},
								visible: {
									clipPath: "inset(0 0% 0 0)",
									y: 0,
									transition: {
										duration,
										ease: [0.33, 1, 0.68, 1],
									},
								},
							}}
						>
							{word}
							{i < words.length - 1 && "\u00A0"}
						</motion.span>
					))}
				</motion.div>
			)}
			{!isInView && <span className="inline-block opacity-0">{text}</span>}
		</Component>
	)
}

interface LetterRevealProps {
	text: string
	delay?: number
	duration?: number
	className?: string
	stagger?: number
}

export function LetterReveal({
	text,
	delay = 0,
	duration = 0.3,
	className,
	stagger = 0.02,
}: LetterRevealProps) {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-10%" })

	const letters = text.split("")

	return (
		<div className={className} ref={ref}>
			{isInView && (
				<motion.div
					animate="visible"
					className="flex flex-wrap"
					initial="hidden"
					transition={{ staggerChildren: stagger, delayChildren: delay }}
				>
					{letters.map((letter, i) => (
						<motion.span
							className="inline-block"
							key={i}
							variants={{
								hidden: {
									opacity: 0,
									y: 20,
								},
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration,
										ease: "easeOut",
									},
								},
							}}
						>
							{letter === " " ? "\u00A0" : letter}
						</motion.span>
					))}
				</motion.div>
			)}
			{!isInView && <span className="opacity-0">{text}</span>}
		</div>
	)
}
