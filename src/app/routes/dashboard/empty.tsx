import "./styles.css"

import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Empty } from "./components/empty/empty"
import { EmptyContent } from "./components/empty/empty-content"
import { EmptyDescription } from "./components/empty/empty-description"
import { EmptyHeader } from "./components/empty/empty-header"
import { EmptyMedia } from "./components/empty/empty-media"
import { EmptyTitle } from "./components/empty/empty-title"

export default function DashboardEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia>
					<Icon className="h-15 w-15" icon="solar:add-folder-bold-duotone" />
				</EmptyMedia>
				<EmptyTitle>Seu negócio começa aqui.</EmptyTitle>
				<EmptyDescription>
					Crie seu estabelicimento e gerencie cardápois, equipe e vendas de
					forma simples e eficiente.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button type="button">
					<Link
						aria-label="Navegar para adicoinar estabelicimento "
						to="/dashboard/add-org"
					>
						Adicionar Estabelecimento
					</Link>
				</Button>
			</EmptyContent>
		</Empty>
	)
}
