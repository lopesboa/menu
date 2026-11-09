import { Link } from "react-router"
import { SEOHead } from "@/components/seo/seo-head"

const sections = [
	{ id: "responsavel", label: "Quem é responsável pelos dados" },
	{ id: "dados", label: "Dados tratados" },
	{ id: "uso", label: "Como usamos os dados" },
	{ id: "compartilhamento", label: "Compartilhamento" },
	{ id: "localizacao", label: "Localização e notificações" },
	{ id: "retencao", label: "Retenção e segurança" },
	{ id: "direitos", label: "Seus direitos e solicitações" },
	{ id: "menores", label: "Crianças e adolescentes" },
	{ id: "alteracoes", label: "Alterações desta política" },
] as const

const privacyEmail = "privacidade@grupoboa.com.br"

export default function PrivacyPolicy() {
	return (
		<main className="min-h-screen px-6 pt-28 pb-20" id="conteudo">
			<SEOHead
				canonicalPath="/privacidade"
				description="Saiba como o Menu Bão trata dados pessoais no aplicativo, incluindo cadastro, pedidos, entrega, localização e métricas de uso."
				robots="index, follow"
				title="Política de Privacidade | Menu Bão"
			/>

			<div className="mx-auto max-w-4xl">
				<header className="mb-12 border-white/10 border-b pb-10">
					<Link
						className="mb-6 inline-flex text-slate-400 text-sm transition-colors hover:text-white"
						to="/"
					>
						<span aria-hidden="true" className="mr-2">
							←
						</span>
						Voltar ao início
					</Link>
					<p className="mb-3 font-medium text-brand-urucum text-xs uppercase tracking-[0.2em]">
						Menu Bão para clientes
					</p>
					<h1 className="font-brand font-semibold text-4xl text-white tracking-tight sm:text-5xl">
						Política de Privacidade
					</h1>
					<p className="mt-5 max-w-2xl text-base text-slate-400 leading-7">
						Esta política explica como tratamos dados pessoais quando você usa o
						aplicativo Menu Bão para conhecer restaurantes e fazer pedidos.
					</p>
					<p className="mt-4 text-slate-500 text-sm">
						Última atualização: 12 de outubro de 2026
					</p>
				</header>

				<div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
					<nav
						aria-label="Nesta política"
						className="h-fit rounded-xl border border-white/10 bg-white/[0.03] p-5 lg:sticky lg:top-24"
					>
						<h2 className="mb-4 font-medium text-sm text-white">
							Nesta política
						</h2>
						<ol className="space-y-3">
							{sections.map((section) => (
								<li key={section.id}>
									<a
										className="text-slate-400 text-sm transition-colors hover:text-white"
										href={`#${section.id}`}
									>
										{section.label}
									</a>
								</li>
							))}
						</ol>
					</nav>

					<div className="space-y-10 text-[15px] text-slate-300 leading-7">
						<section className="scroll-mt-24 space-y-4" id="responsavel">
							<h2 className="font-brand font-semibold text-2xl text-white">
								1. Quem é responsável pelos dados
							</h2>
							<p>
								A controladora dos dados tratados no aplicativo é a{" "}
								<strong className="text-white">BOA CONSULTORIA</strong>, nome
								fantasia do Grupo Boa, inscrita no CNPJ sob o nº
								61.845.946/0001-43.
							</p>
							<p>
								Se tiver dúvidas ou quiser exercer seus direitos sobre dados
								pessoais, fale com nosso canal de privacidade pelo e-mail{" "}
								<a
									className="text-brand-paper underline decoration-white/30 underline-offset-4 hover:decoration-white"
									href={`mailto:${privacyEmail}`}
								>
									{privacyEmail}
								</a>
								.
							</p>
						</section>

						<section className="scroll-mt-24 space-y-4" id="dados">
							<h2 className="font-brand font-semibold text-2xl text-white">
								2. Dados tratados
							</h2>
							<p>
								Os dados dependem de como você usa o aplicativo. Podemos tratar:
							</p>
							<ul className="list-disc space-y-2 pl-6 marker:text-brand-urucum">
								<li>
									Dados de cadastro e conta que você informa, como dados de
									identificação e contato.
								</li>
								<li>
									Dados necessários para registrar e acompanhar pedidos, como
									itens escolhidos, instruções e informações de entrega.
								</li>
								<li>
									Localização do dispositivo, quando você autoriza o acesso e
									usa recursos que dependem dela.
								</li>
								<li>
									Informações sobre o uso do aplicativo e dados técnicos do
									dispositivo, utilizados para métricas, funcionamento e
									diagnóstico.
								</li>
								<li>
									Dados técnicos necessários para enviar notificações, caso esse
									recurso esteja habilitado no dispositivo.
								</li>
							</ul>
							<p>
								No MVP, o aplicativo não oferece pagamento integrado. Por isso,
								não coletamos dados de cartão para processar pagamentos dentro
								do app.
							</p>
						</section>

						<section className="scroll-mt-24 space-y-4" id="uso">
							<h2 className="font-brand font-semibold text-2xl text-white">
								3. Como usamos os dados
							</h2>
							<p>Tratamos os dados para:</p>
							<ul className="list-disc space-y-2 pl-6 marker:text-brand-urucum">
								<li>criar e manter sua conta;</li>
								<li>
									permitir a consulta de restaurantes e a realização de pedidos;
								</li>
								<li>encaminhar e acompanhar pedidos e entregas;</li>
								<li>
									mostrar recursos próximos a você quando a localização estiver
									habilitada;
								</li>
								<li>
									entender o uso do aplicativo, corrigir falhas e melhorar seu
									funcionamento;
								</li>
								<li>
									proteger o serviço, prevenir abusos e atender obrigações
									legais.
								</li>
							</ul>
							<p>
								O tratamento pode se basear, conforme a finalidade, na execução
								dos serviços que você solicita, no cumprimento de obrigações
								legais, em interesses legítimos relacionados à segurança e
								melhoria do serviço ou no seu consentimento, quando ele for
								necessário. Quando o tratamento depender de consentimento, você
								poderá revogá-lo pelos meios disponíveis ou pelo canal de
								privacidade.
							</p>
						</section>

						<section className="scroll-mt-24 space-y-4" id="compartilhamento">
							<h2 className="font-brand font-semibold text-2xl text-white">
								4. Compartilhamento
							</h2>
							<p>
								Compartilhamos apenas os dados necessários para as finalidades
								desta política. Isso pode incluir:
							</p>
							<ul className="list-disc space-y-2 pl-6 marker:text-brand-urucum">
								<li>
									restaurantes envolvidos no pedido, para que possam prepará-lo
									e atender você;
								</li>
								<li>
									entregadores ou parceiros de entrega, quando necessários para
									concluir a entrega;
								</li>
								<li>
									fornecedores de tecnologia que apoiam hospedagem,
									funcionamento, métricas, diagnóstico e envio de notificações;
								</li>
								<li>
									autoridades públicas, quando houver obrigação legal ou
									solicitação válida.
								</li>
							</ul>
							<p>
								Restaurantes e parceiros podem tratar os dados recebidos
								conforme suas próprias responsabilidades e políticas.
								Recomendamos consultar as informações de privacidade
								apresentadas por eles, quando aplicável.
							</p>
						</section>

						<section className="scroll-mt-24 space-y-4" id="localizacao">
							<h2 className="font-brand font-semibold text-2xl text-white">
								5. Localização e notificações
							</h2>
							<p>
								O acesso à localização depende da permissão do sistema
								operacional e pode ser desativado nas configurações do
								dispositivo. Sem essa permissão, alguns recursos de busca por
								proximidade podem não funcionar; você ainda pode informar
								manualmente os dados necessários para o pedido.
							</p>
							<p>
								Você também pode gerenciar as notificações nas configurações do
								dispositivo. A desativação pode impedir o recebimento de
								atualizações sobre pedidos.
							</p>
						</section>

						<section className="scroll-mt-24 space-y-4" id="retencao">
							<h2 className="font-brand font-semibold text-2xl text-white">
								6. Retenção e segurança
							</h2>
							<p>
								Mantemos os dados pelo tempo necessário para oferecer o serviço,
								cumprir obrigações legais, resolver solicitações e proteger
								nossos direitos. O período pode variar conforme o tipo de dado e
								a finalidade. Quando não houver mais necessidade de manter os
								dados, eles serão eliminados ou anonimizados, salvo quando a lei
								permitir ou exigir sua conservação.
							</p>
							<p>
								Adotamos medidas técnicas e organizacionais para proteger os
								dados contra acessos não autorizados, perda e uso indevido.
								Nenhuma medida elimina todos os riscos, mas trabalhamos para
								manter proteções adequadas à operação.
							</p>
						</section>

						<section className="scroll-mt-24 space-y-4" id="direitos">
							<h2 className="font-brand font-semibold text-2xl text-white">
								7. Seus direitos e solicitações
							</h2>
							<p>
								A LGPD garante direitos sobre seus dados pessoais, incluindo
								confirmar o tratamento, acessar, corrigir, solicitar
								anonimização ou eliminação quando cabível, saber sobre
								compartilhamentos e revogar consentimento.
							</p>
							<p>
								Para fazer uma solicitação, escreva para{" "}
								<a
									className="text-brand-paper underline decoration-white/30 underline-offset-4 hover:decoration-white"
									href={`mailto:${privacyEmail}?subject=Solicita%C3%A7%C3%A3o%20sobre%20dados%20pessoais`}
								>
									{privacyEmail}
								</a>
								. Para ajudar a localizar seus dados, use o e-mail associado à
								conta. Podemos solicitar informações adicionais apenas quando
								necessário para confirmar sua identidade e proteger sua conta.
							</p>
							<div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
								<h3 className="font-medium text-white">
									Como solicitar a exclusão da conta
								</h3>
								<p className="mt-2">
									Preencha o{" "}
									<Link
										className="text-brand-paper underline decoration-white/30 underline-offset-4 hover:decoration-white"
										to="/exclusao-de-conta"
									>
										formulário de solicitação de exclusão
									</Link>{" "}
									ou escreva para{" "}
									<a
										className="text-brand-paper underline decoration-white/30 underline-offset-4 hover:decoration-white"
										href={`mailto:${privacyEmail}?subject=Exclus%C3%A3o%20da%20conta%20Menu%20B%C3%A3o`}
									>
										{privacyEmail}
									</a>
									. Receber o pedido não significa que todos os dados serão
									apagados: vamos confirmar a titularidade e avaliar se algum
									registro precisa ser mantido por obrigação legal ou outra
									hipótese permitida pela LGPD. Nesses casos, manteremos somente
									os dados necessários e pelo período aplicável; os demais serão
									excluídos ou anonimizados.
								</p>
							</div>
						</section>

						<section className="scroll-mt-24 space-y-4" id="menores">
							<h2 className="font-brand font-semibold text-2xl text-white">
								8. Crianças e adolescentes
							</h2>
							<p>
								O aplicativo não é direcionado a crianças. Se você acredita que
								uma criança nos enviou dados pessoais sem a autorização
								necessária, entre em contato pelo canal de privacidade para que
								possamos analisar a situação e tomar as medidas cabíveis.
							</p>
						</section>

						<section className="scroll-mt-24 space-y-4" id="alteracoes">
							<h2 className="font-brand font-semibold text-2xl text-white">
								9. Alterações desta política
							</h2>
							<p>
								Podemos atualizar esta política para refletir mudanças no
								aplicativo, na legislação ou em nossas práticas. A versão atual
								estará sempre disponível nesta página, com a data da última
								atualização. Quando uma mudança exigir comunicação específica,
								avisaremos pelos meios disponíveis no serviço.
							</p>
						</section>

						<p className="border-white/10 border-t pt-6 text-slate-500 text-sm">
							Esta política se aplica ao aplicativo Menu Bão para clientes. Para
							falar sobre privacidade, escreva para{" "}
							<a
								className="text-brand-paper underline decoration-white/30 underline-offset-4 hover:decoration-white"
								href={`mailto:${privacyEmail}`}
							>
								{privacyEmail}
							</a>
							.
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
