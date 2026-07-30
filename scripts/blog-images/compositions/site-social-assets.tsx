import {
	BrandMark,
	BrandWordmark,
	brandColors,
	ImageCanvas,
	Surface,
} from "../brand"
import { defineBlogImages } from "../types"

const definition = defineBlogImages({
	images: [
		{
			alt: "Salão, delivery e balcão conectados em um único fluxo operacional do Menu Bão.",
			element: (
				<SocialCard
					height={630}
					summary="Pedidos, estoque e atendimento conectados para a equipe agir com contexto no horário de pico."
					title="Sua operação inteira em um só fluxo"
				/>
			),
			height: 630,
			name: "og-image",
			width: 1200,
		},
		{
			alt: "Fluxo do Menu Bão organizando os canais de salão, delivery e balcão durante o horário de pico.",
			element: (
				<SocialCard
					height={630}
					summary="Centralize os canais, reduza erros e dê à equipe a informação certa antes de virar problema."
					title="Controle o horário de pico sem perder o fluxo"
				/>
			),
			height: 630,
			name: "twitter-image",
			width: 1200,
		},
		{
			alt: "Símbolo ã do Menu Bão em papel sobre fundo petróleo.",
			element: <AppleTouchIcon />,
			height: 180,
			name: "apple-touch-icon",
			width: 180,
		},
		{
			alt: "Símbolo do Menu Bão construído a partir do ã do nome da marca.",
			element: <BrandSymbolAsset />,
			height: 512,
			name: "brand-symbol",
			width: 512,
		},
		{
			alt: "Assinatura Menu Bão com símbolo ã e wordmark personalizado.",
			element: <BrandLockupAsset />,
			height: 180,
			name: "brand-lockup",
			width: 640,
		},
	],
	outputDirectory: "assets",
	slug: "site-social-assets",
})

export default definition

function SocialCard({
	height,
	summary,
	title,
}: {
	height: number
	summary: string
	title: string
}) {
	return (
		<ImageCanvas accent="urucum" height={height} width={1200}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height,
					justifyContent: "center",
					padding: "58px 64px",
					position: "relative",
					width: 1200,
				}}
			>
				<BrandSignature />
				<div
					style={{
						alignItems: "center",
						display: "flex",
						gap: 54,
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							width: 650,
						}}
					>
						<div
							style={{
								display: "flex",
								fontSize: 67,
								fontWeight: 700,
								letterSpacing: "-0.055em",
								lineHeight: 0.98,
							}}
						>
							{title}
						</div>
						<div
							style={{
								color: brandColors.muted,
								display: "flex",
								fontSize: 23,
								lineHeight: 1.35,
								marginTop: 24,
								maxWidth: 610,
							}}
						>
							{summary}
						</div>
					</div>
					<OperationFlow />
				</div>
			</div>
		</ImageCanvas>
	)
}

function BrandSignature() {
	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				gap: 12,
				left: 64,
				position: "absolute",
				top: 48,
			}}
		>
			<BrandMark
				bodyColor={brandColors.paper}
				size={34}
				tilColor={brandColors.urucum}
			/>
			<BrandWordmark color={brandColors.paper} fontSize={22} />
		</div>
	)
}

function OperationFlow() {
	return (
		<Surface
			style={{
				alignItems: "center",
				flexDirection: "column",
				gap: 13,
				padding: 26,
				transform: "rotate(2deg)",
				width: 368,
			}}
		>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					gap: 8,
					justifyContent: "center",
				}}
			>
				<Channel color={brandColors.sky} label="Salão" />
				<Channel color={brandColors.urucum} label="Delivery" />
				<Channel color={brandColors.amber} label="Balcão" />
			</div>
			<FlowArrow />
			<div
				style={{
					alignItems: "center",
					backgroundImage: `linear-gradient(135deg, ${brandColors.urucum}33, ${brandColors.amber}18)`,
					border: `1px solid ${brandColors.urucum}77`,
					borderRadius: 18,
					display: "flex",
					flexDirection: "column",
					gap: 5,
					padding: "18px 20px",
					width: 310,
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 23,
						fontWeight: 700,
					}}
				>
					Um fluxo operacional
				</div>
				<div
					style={{
						color: brandColors.muted,
						display: "flex",
						fontSize: 17,
					}}
				>
					Prioridade e contexto compartilhados
				</div>
			</div>
			<FlowArrow />
			<div style={{ display: "flex", gap: 9 }}>
				<Outcome label="Pedidos" />
				<Outcome label="Estoque" />
				<Outcome label="Equipe" />
			</div>
		</Surface>
	)
}

function Channel({ color, label }: { color: string; label: string }) {
	return (
		<div
			style={{
				backgroundColor: `${color}1a`,
				border: `1px solid ${color}55`,
				borderRadius: 999,
				color,
				display: "flex",
				fontSize: 16,
				fontWeight: 600,
				padding: "9px 12px",
			}}
		>
			{label}
		</div>
	)
}

function Outcome({ label }: { label: string }) {
	return (
		<div
			style={{
				backgroundColor: `${brandColors.emerald}14`,
				border: `1px solid ${brandColors.emerald}44`,
				borderRadius: 11,
				color: brandColors.emerald,
				display: "flex",
				fontSize: 15,
				fontWeight: 600,
				justifyContent: "center",
				padding: "10px 12px",
				width: 96,
			}}
		>
			{label}
		</div>
	)
}

function FlowArrow() {
	return (
		<div
			style={{
				alignItems: "center",
				color: brandColors.muted,
				display: "flex",
				fontSize: 20,
				height: 10,
				justifyContent: "center",
			}}
		>
			↓
		</div>
	)
}

function AppleTouchIcon() {
	return (
		<div
			style={{
				alignItems: "center",
				backgroundColor: brandColors.petroleum,
				display: "flex",
				height: 180,
				justifyContent: "center",
				width: 180,
			}}
		>
			<BrandMark color={brandColors.paper} size={132} />
		</div>
	)
}

function BrandSymbolAsset() {
	return (
		<div
			style={{
				alignItems: "center",
				backgroundColor: brandColors.petroleum,
				display: "flex",
				height: 512,
				justifyContent: "center",
				width: 512,
			}}
		>
			<BrandMark color={brandColors.paper} size={380} />
		</div>
	)
}

function BrandLockupAsset() {
	return (
		<div
			style={{
				alignItems: "center",
				backgroundColor: "transparent",
				display: "flex",
				gap: 28,
				height: 180,
				justifyContent: "center",
				width: 640,
			}}
		>
			<BrandMark
				bodyColor={brandColors.petroleum}
				size={92}
				tilColor={brandColors.urucum}
			/>
			<BrandWordmark color={brandColors.petroleum} fontSize={54} />
		</div>
	)
}
