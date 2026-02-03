import { cn } from "@/utils/misc"

export function EmptyHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex max-w-sm flex-col items-center gap-2 text-center",
				className
			)}
			data-slot="empty-header"
			{...props}
		/>
	)
}
