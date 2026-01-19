import { cn } from "@/utils/misc"

export function EmptyDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-description"
			className={cn(
				"text-muted-foreground [&>a:hover]:text-white text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
				className,
			)}
			{...props}
		/>
	)
}
