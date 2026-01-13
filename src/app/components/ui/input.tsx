import { Icon } from "@iconify-icon/react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	iconName?: string
}

export function Input({ iconName, ...rest }: InputProps) {
	return (
		<div className="relative">
			<input
				className="w-full bg-black/50 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
				{...rest}
			/>
			{iconName && (
				<Icon
					icon={iconName}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
					width="18"
				/>
			)}
		</div>
	)
}
