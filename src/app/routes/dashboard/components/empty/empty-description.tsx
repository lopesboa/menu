import { cn } from "@/utils/misc"

export function EmptyDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"text-muted-foreground text-sm/relaxed [&>a:hover]:text-white [&>a]:underline [&>a]:underline-offset-4",
				className
			)}
			data-slot="empty-description"
			{...props}
		/>
	)
}
