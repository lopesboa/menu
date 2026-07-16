import { brandColors, Surface } from "../brand"
import { EditorialCover } from "../templates/editorial-cover"
import { ProcessFlow } from "../templates/process-flow"
import { defineBlogImages } from "../types"

const definition = defineBlogImages({
	images: [
		{
			alt: "Fluxo editorial que transforma o texto de um artigo em uma imagem personalizada usando JSX, SVG e PNG.",
			element: (
				<EditorialCover
					summary="Um sistema visual consistente, mas flexível o bastante para representar a ideia central de cada texto."
					title="Imagens sob medida para cada artigo"
					visual={<RenderingPipeline />}
				/>
			),
			height: 630,
			name: "cover",
			width: 1200,
		},
		{
			alt: "Processo em quatro etapas: analisar o artigo, compor a imagem em JSX, gerar o SVG com Satori e exportar o PNG.",
			element: (
				<ProcessFlow
					steps={[
						{
							description: "Encontre a tese e o conceito visual.",
							id: "article",
							label: "Artigo",
							tone: "sky",
						},
						{
							description: "Monte uma composição específica.",
							id: "jsx",
							label: "JSX",
							tone: "purple",
						},
						{
							description: "Converta o layout vetorialmente.",
							id: "svg",
							label: "SVG",
							tone: "indigo",
						},
						{
							description: "Exporte a imagem pronta para publicar.",
							id: "png",
							label: "PNG",
							tone: "emerald",
						},
					]}
					subtitle="A inteligência está na tradução do argumento, não em um template genérico."
					title="Do texto à imagem publicável"
				/>
			),
			height: 675,
			name: "inline-processo",
			width: 1200,
		},
	],
	slug: "satori-workflow",
})

export default definition

function RenderingPipeline() {
	return (
		<Surface
			style={{
				flexDirection: "column",
				gap: 16,
				justifyContent: "center",
				padding: 28,
				transform: "rotate(2deg)",
				width: 342,
			}}
		>
			<PipelineNode color={brandColors.sky} label="texto.md" />
			<Connector />
			<PipelineNode color={brandColors.purple} label="composição.tsx" />
			<Connector />
			<div style={{ display: "flex", gap: 12 }}>
				<PipelineNode color={brandColors.indigo} label="SVG" small />
				<PipelineNode color={brandColors.emerald} label="PNG" small />
			</div>
		</Surface>
	)
}

function PipelineNode({
	color,
	label,
	small = false,
}: {
	color: string
	label: string
	small?: boolean
}) {
	return (
		<div
			style={{
				alignItems: "center",
				backgroundColor: `${color}1f`,
				border: `1px solid ${color}66`,
				borderRadius: 16,
				color,
				display: "flex",
				fontSize: small ? 20 : 21,
				fontWeight: 600,
				justifyContent: "center",
				padding: "18px 20px",
				width: small ? 137 : 286,
			}}
		>
			{label}
		</div>
	)
}

function Connector() {
	return (
		<div
			style={{
				alignItems: "center",
				color: brandColors.muted,
				display: "flex",
				fontSize: 22,
				height: 10,
				justifyContent: "center",
			}}
		>
			↓
		</div>
	)
}
