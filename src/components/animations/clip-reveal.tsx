import { motion, useInView } from "framer-motion"
import React, { useRef } from "react"

interface ClipRevealProps {
	children: React.ReactNode
	duration?: number
	delay?: number
	columns?: number
	className?: string
}

export function ClipReveal({
	children,
	duration = 0.8,
	delay = 0,
	columns = 5,
	className,
}: ClipRevealProps) {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-10%" })

	const childrenArray = React.Children.toArray(children)
	const chunks = chunkArray(childrenArray, columns)

	return (
		<div className={className} ref={ref}>
			<div className="relative overflow-hidden">
				{isInView && (
					<motion.div
						className="grid"
						style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
					>
						{chunks.map((chunk, chunkIndex) => (
							<motion.div
								animate={{ clipPath: "inset(0 0 0% 0)" }}
								className="flex flex-col"
								initial={{ clipPath: "inset(0 0 100% 0)" }}
								key={chunk.toString()}
								transition={{
									duration,
									delay: delay + chunkIndex * 0.1,
									ease: [0.33, 1, 0.68, 1],
								}}
							>
								{chunk}
							</motion.div>
						))}
					</motion.div>
				)}
			</div>
		</div>
	)
}

function chunkArray<T>(array: T[], size: number): T[][] {
	const chunks: T[][] = []
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size))
	}
	return chunks
}

interface ColumnRevealProps {
	children: React.ReactNode
	columnCount?: number
	duration?: number
	className?: string
}

export function ColumnReveal({
	children,
	columnCount = 5,
	duration = 0.6,
	className,
}: ColumnRevealProps) {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-10%" })

	const childrenArray = React.Children.toArray(children)
	const itemsPerColumn = Math.ceil(childrenArray.length / columnCount)
	const columns: React.ReactNode[][] = []

	for (let i = 0; i < columnCount; i++) {
		const start = i * itemsPerColumn
		const end = Math.min(start + itemsPerColumn, childrenArray.length)
		columns.push(childrenArray.slice(start, end))
	}

	return (
		<div className={className} ref={ref}>
			{isInView && (
				<div className="flex gap-1">
					{columns.map((column, i) => (
						<motion.div
							animate={{ clipPath: "inset(0 0 0 0)" }}
							className="flex-1"
							initial={{ clipPath: "inset(100% 0 0 0)" }}
							key={column.toString()}
							transition={{
								duration,
								ease: [0.33, 1, 0.68, 1],
								delay: i * 0.08,
							}}
						>
							<div className="space-y-1">{column}</div>
						</motion.div>
					))}
				</div>
			)}
			{!isInView && <div className="opacity-0">{children}</div>}
		</div>
	)
}
