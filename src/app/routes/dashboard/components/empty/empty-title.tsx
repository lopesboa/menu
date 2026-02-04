import { cn } from "@/utils/misc"

export function EmptyTitle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("font-medium text-lg tracking-tight", className)}
			data-slot="empty-title"
			{...props}
		/>
	)
}
