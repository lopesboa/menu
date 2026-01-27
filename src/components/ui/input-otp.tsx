import { Icon } from "@iconify-icon/react"
import { OTPInput, OTPInputContext } from "input-otp"
import { useContext } from "react"
import { cn } from "@/utils/misc"

function InputOTP({
	className,
	containerClassName,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string
}) {
	return (
		<OTPInput
			data-slot="input-otp"
			containerClassName={cn(
				"flex items-center gap-2 has-disabled:opacity-50",
				containerClassName,
			)}
			className={cn("disabled:cursor-not-allowed", className)}
			{...props}
		/>
	)
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn("flex items-center", className)}
			{...props}
		/>
	)
}

function InputOTPSlot({
	index,
	className,
	...props
}: React.ComponentProps<"div"> & {
	index: number
}) {
	const inputOTPContext = useContext(OTPInputContext)
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

	// bg-surface border border-border rounded-lg text-center text-lg text-white font-medium focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all"
	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			className={cn(
				"data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-12 w-12 items-center justify-center border-y border-r text-lg shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
				</div>
			)}
		</div>
	)
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
	return (
		<div data-slot="input-otp-separator" role="separator" {...props}>
			<Icon icon="lucide:minus" />
		</div>
	)
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
