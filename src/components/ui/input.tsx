import { Icon } from "@iconify-icon/react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	iconName?: string
}

export function Input({ iconName, ...rest }: InputProps) {
	return (
		<div className="relative">
			<input
				className="w-full rounded-lg border border-white/10 bg-black/50 px-10 py-2.5 text-sm text-white transition-all placeholder:text-slate-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
				{...rest}
			/>
			{iconName && (
				<Icon
					className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
					icon={iconName}
					width="18"
				/>
			)}
		</div>
	)
}
