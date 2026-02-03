import { cn } from "@/utils/misc"

export function EmptyMedia({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6",
				className
			)}
			data-slot="empty-media"
			{...props}
		/>
	)
}
