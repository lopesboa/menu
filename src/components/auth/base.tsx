import { Icon } from "@iconify-icon/react"
import type { PropsWithChildren } from "react"
import { cn } from "@/utils/misc"
import { Dialog } from "../ui/dialog"

type BaseComponentProps = PropsWithChildren & {
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
	id: string
	isOpen: boolean
}

export function BaseComponent({
	onClick,
	id,
	children,
	isOpen,
}: BaseComponentProps) {
	return (
		<Dialog id={id}>
			<div
				className={cn(
					"relative w-full max-w-md bg-[#0f111a] border border-white/10 rounded-2xl p-8 shadow-2xl transform transition-all duration-300",
					!isOpen ? "scale-95" : "",
				)}
			>
				<button
					type="button"
					name="Fechar"
					onClick={onClick}
					className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
				>
					<Icon icon="solar:close-circle-bold-duotone" width="24" />
				</button>
				{children}
			</div>
		</Dialog>
	)
}
