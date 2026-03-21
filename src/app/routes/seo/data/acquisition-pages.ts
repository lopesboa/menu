export interface AcquisitionFAQ {
	question: string
	answer: string
}

export interface AcquisitionSection {
	title: string
	description: string
}

export interface AcquisitionProof {
	title: string
	description: string
	source: string
}

export interface AcquisitionInternalLink {
	label: string
	href: string
	description: string
}

export interface AcquisitionPage {
	slug: string
	page: string
	category: "segmento" | "integracao" | "caso-de-uso"
	seo: {
		title: string
		description: string
		keywords: string
		robots?: string
	}
	hero: {
		eyebrow: string
		title: string
		description: string
		supportingPoints: string[]
		trustNote: string
		primaryCta: string
		secondaryCta: string
	}
	fitProfile: string[]
	problems: string[]
	solutions: AcquisitionSection[]
	operationFlow: AcquisitionSection[]
	proof: AcquisitionProof
	ctaBand: {
		title: string
		description: string
		note: string
	}
	faq: AcquisitionFAQ[]
	internalLinks: AcquisitionInternalLink[]
}

export const acquisitionPages: Record<string, AcquisitionPage> = {
	"sistema-para-restaurante": {
		slug: "sistema-para-restaurante",
		page: "seo_sistema_para_restaurante",
		category: "segmento",
		seo: {
			title: "Sistema para restaurante com PDV e delivery | Menu Bão",
			description:
				"Organize pedidos, frente de caixa e integrações de delivery em um único sistema para restaurante. Veja como reduzir erros operacionais no horário de pico.",
			keywords:
				"sistema para restaurante, sistema de gestão para restaurante, pdv para restaurante, sistema para delivery",
		},
		hero: {
			eyebrow: "Solução por segmento",
			title:
				"Sistema para restaurante que organiza salão, balcão e delivery no horário de pico",
			description:
				"Tenha uma rotina única de pedidos para o time atender mais rápido, reduzir erros de produção e fechar o caixa com segurança, mesmo nos turnos mais corridos.",
			supportingPoints: [
				"Fila única para pedidos do salão, retirada e apps de entrega.",
				"Status em tempo real entre atendimento, cozinha e expedição.",
				"Visão consolidada de vendas para fechar turno sem planilhas paralelas.",
			],
			trustNote:
				"Implantação em etapas para não travar a operação durante a mudança.",
			primaryCta: "Criar conta grátis",
			secondaryCta: "Falar com especialista",
		},
		fitProfile: [
			"Restaurante com salão e delivery operando no mesmo turno.",
			"Equipe que precisa reduzir retrabalho entre atendimento e cozinha.",
			"Gestão buscando controle diário de vendas, ticket e fechamento.",
		],
		problems: [
			"Pedidos chegam em canais separados e o time perde prioridade de produção.",
			"Comandas, cardápio e caixa ficam em rotinas diferentes, gerando retrabalho.",
			"Sem visão única por turno, decisões de escala e compra ficam no achismo.",
		],
		solutions: [
			{
				title: "Fila operacional única",
				description:
					"Consolide pedidos de todos os canais em um fluxo central para priorizar produção sem conflito entre telas.",
			},
			{
				title: "Status compartilhado por setor",
				description:
					"Acompanhe cada etapa do pedido em tempo real para alinhar atendimento, cozinha e expedição sem ruído.",
			},
			{
				title: "Indicadores para decidir com dados",
				description:
					"Monitore faturamento, ticket médio e volume por turno para ajustar escala, promoções e reposição com segurança.",
			},
		],
		operationFlow: [
			{
				title: "Diagnóstico rápido da operação",
				description:
					"Mapeamos canais de venda, gargalos do pico e rotina de fechamento para configurar o fluxo ideal do restaurante.",
			},
			{
				title: "Configuração guiada por prioridade",
				description:
					"Você começa pelo essencial: cardápio, setores e rotinas críticas. As demais etapas entram sem interromper o atendimento.",
			},
			{
				title: "Virada assistida e ajuste fino",
				description:
					"Após os primeiros turnos, o time ajusta regras e relatórios para ganhar previsibilidade nas semanas seguintes.",
			},
		],
		proof: {
			title: "Resultados observados em restaurantes ativos",
			description:
				"Dados reportados por restaurantes ativos na base Menu Bão entre janeiro e março de 2026 indicam redução de retrabalho operacional após centralização dos pedidos em uma única rotina de execução.",
			source: "Base interna Menu Bão, jan-mar/2026.",
		},
		ctaBand: {
			title: "Quer avaliar no seu contexto antes de trocar a rotina inteira?",
			description:
				"Veja como estruturar sua operação por etapas, mantendo salão e delivery rodando enquanto o time ganha confiança no novo fluxo.",
			note: "Sem compromisso comercial no primeiro diagnóstico.",
		},
		faq: [
			{
				question:
					"O Menu Bão atende restaurante com atendimento no salão e delivery?",
				answer:
					"Sim. A operação pode combinar atendimento presencial, retirada e entrega sem depender de planilhas paralelas.",
			},
			{
				question: "Em quanto tempo dá para começar a operar?",
				answer:
					"Depende da complexidade do cardápio e dos canais conectados, mas a entrada é feita em etapas para já capturar ganhos nos primeiros turnos.",
			},
			{
				question: "Preciso trocar todo meu processo para começar?",
				answer:
					"Não. O onboarding é feito por etapas para manter a operação rodando enquanto o time aprende o fluxo no sistema.",
			},
			{
				question: "Consigo acompanhar desempenho por turno e por canal?",
				answer:
					"Sim. Você visualiza indicadores operacionais e comerciais para identificar gargalos, horários de pico e impacto das ações promocionais.",
			},
			{
				question: "Como funciona suporte no início da operação?",
				answer:
					"Você pode começar no self-service e acionar nosso time para orientar configuração de cardápio, rotinas e integrações prioritárias.",
			},
		],
		internalLinks: [
			{
				label: "Integrações para delivery",
				href: "/#integrations",
				description: "Veja como conectar canais de venda na mesma operação.",
			},
			{
				label: "Planos e implantação",
				href: "/#pricing",
				description:
					"Compare planos e escolha o formato ideal para sua equipe.",
			},
			{
				label: "Página principal Menu Bão",
				href: "/",
				description: "Conheça a visão geral da plataforma e próximos passos.",
			},
		],
	},
}
