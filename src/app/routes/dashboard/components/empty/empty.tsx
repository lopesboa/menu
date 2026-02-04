import { cn } from "@/utils/misc"
// relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20
export function Empty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex min-h-screen min-w-0 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
				className
			)}
			data-slot="empty"
			{...props}
		/>
	)
}
