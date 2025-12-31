import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "../../utils/misc"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant
	children: ReactNode
	fullWidth?: boolean
}

export function Button({
	variant = "primary",
	children,
	className,
	fullWidth = true,
	type = "button",
	disabled,
	...props
}: ButtonProps) {
	const baseStyle =
		"group cursor-pointer font-medium text-sm py-2.5 rounded-lg transition-colors transition-all"

	const widthStyle = fullWidth ? "w-full " : ""

	const variantStyles = {
		primary:
			"bg-white text-black  hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 mt-2",
		secondary:
			"relative mt-auto py-2 border border-white/10 hover:bg-white/5  text-white",
		ghost:
			"text-indigo-400 hover:text-indigo-300 font-medium transition-colors",
	}

	const disabledStyle = disabled
		? "relative  bg-white/10 overflow-hidden text-white hover:bg-white/15 transition-all mt-2"
		: ""

	return (
		<button
			type={type}
			className={cn(
				baseStyle,
				widthStyle,
				variantStyles[variant],
				disabledStyle,
				className,
			)}
			{...props}
		>
			{variant === "secondary" ? (
				<span className="relative z-10">{children}</span>
			) : (
				children
			)}
		</button>
	)
}
