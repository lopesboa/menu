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
					"relative w-full max-w-md transform rounded-2xl border border-white/10 bg-[#0f111a] p-8 shadow-2xl transition-all duration-300",
					isOpen ? "" : "scale-95"
				)}
			>
				<button
					className="absolute top-4 right-4 text-slate-500 transition-colors hover:text-white"
					name="Fechar"
					onClick={onClick}
					type="button"
				>
					<Icon icon="solar:close-circle-bold-duotone" width="24" />
				</button>
				{children}
			</div>
		</Dialog>
	)
}
