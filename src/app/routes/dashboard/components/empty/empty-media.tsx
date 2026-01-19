import { cn } from "@/utils/misc"

export function EmptyMedia({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-media"
			className={cn(
				"bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
				className,
			)}
			{...props}
		/>
	)
}
