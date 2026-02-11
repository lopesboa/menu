import { cn } from "@/utils/misc"

interface SkeletonProps {
	className?: string
}

export function Skeleton({ className }: SkeletonProps) {
	return (
		<div className={cn("animate-pulse rounded bg-surface-200", className)} />
	)
}

export function SkeletonCard() {
	return (
		<div className="rounded-2xl border border-surface-100 bg-white p-6">
			<Skeleton className="mb-4 h-4 w-24" />
			<Skeleton className="mb-2 h-8 w-32" />
			<Skeleton className="h-4 w-16" />
		</div>
	)
}

export function SkeletonTable({
	rows = 5,
	cols = 4,
}: {
	rows?: number
	cols?: number
}) {
	return (
		<div className="space-y-3">
			<div className="flex gap-4 border-surface-100 border-b pb-3">
				{Array.from({ length: cols }).map((_) => (
					<Skeleton className="h-4 flex-1" key={cols.toString()} />
				))}
			</div>
			{Array.from({ length: rows }).map((_) => (
				<div className="flex gap-4 py-2" key={rows.toString()}>
					{Array.from({ length: cols }).map((_) => (
						<Skeleton className="h-4 flex-1" key={cols.toString()} />
					))}
				</div>
			))}
		</div>
	)
}

export function SkeletonList({ items = 4 }: { items?: number }) {
	return (
		<div className="space-y-3">
			{Array.from({ length: items }).map((_, i) => (
				<div
					className="flex items-center gap-4 rounded-xl border border-surface-100 bg-white p-4"
					key={i}
				>
					<Skeleton className="h-12 w-12 rounded-xl" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				</div>
			))}
		</div>
	)
}

export function SkeletonDashboard() {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<SkeletonCard key={i} />
				))}
			</div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="rounded-2xl border border-surface-100 bg-white p-6">
					<Skeleton className="mb-4 h-6 w-48" />
					<Skeleton className="h-64 w-full" />
				</div>
				<div className="rounded-2xl border border-surface-100 bg-white p-6">
					<Skeleton className="mb-4 h-6 w-48" />
					<SkeletonList items={5} />
				</div>
			</div>
		</div>
	)
}
