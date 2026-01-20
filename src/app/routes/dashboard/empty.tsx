import "./styles.css"

import { Icon } from "@iconify-icon/react"
import { useDialogActions } from "@/app/store/dialog"
import { Button } from "@/components/ui/button"
import { AddOrgForm } from "./components/add-org"
import { Empty } from "./components/empty/empty"
import { EmptyContent } from "./components/empty/empty-content"
import { EmptyDescription } from "./components/empty/empty-description"
import { EmptyHeader } from "./components/empty/empty-header"
import { EmptyMedia } from "./components/empty/empty-media"
import { EmptyTitle } from "./components/empty/empty-title"

export default function DashboardEmpty() {
	const { openDialog } = useDialogActions()
	return (
		<>
			<Empty>
				<EmptyHeader>
					<EmptyMedia>
						<Icon icon="solar:add-folder-bold-duotone" className="w-15 h-15" />
					</EmptyMedia>
					<EmptyTitle>Seu negócio começa aqui.</EmptyTitle>
					<EmptyDescription>
						Crie seu estabelicimento e gerencie cardápois, equipe e vendas de
						forma simples e eficiente.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button
						type="button"
						onClick={() => {
							openDialog("add-org")
						}}
					>
						Adicionar Estabelecimento
					</Button>
				</EmptyContent>
			</Empty>
			<AddOrgForm />
		</>
	)
}
