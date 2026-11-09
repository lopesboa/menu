import { type FormEvent, useState } from "react"
import { Link } from "react-router"
import { z } from "zod"

import { SEOHead } from "@/components/seo/seo-head"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitAccountDeletionRequest } from "@/services/account-deletion-request-service"

const requestSchema = z.object({
	name: z.string().trim().min(2, "Informe seu nome.").max(120),
	email: z.string().trim().pipe(z.email("Informe um e-mail válido.").max(255)),
})

export default function AccountDeletionRequestPage() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
	const [submitError, setSubmitError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setSubmitError("")

		const result = requestSchema.safeParse({ name, email })
		if (!result.success) {
			const fieldErrors = result.error.flatten().fieldErrors
			setErrors({ name: fieldErrors.name?.[0], email: fieldErrors.email?.[0] })
			return
		}

		setErrors({})
		setIsSubmitting(true)

		try {
			await submitAccountDeletionRequest(result.data)
			setIsSubmitted(true)
		} catch {
			setSubmitError(
				"Não foi possível enviar agora. Tente novamente ou escreva para privacidade@grupoboa.com.br."
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<main className="min-h-screen px-6 pt-28 pb-20">
			<SEOHead
				canonicalPath="/exclusao-de-conta"
				description="Solicite a exclusão da sua conta do Menu Bão e saiba como tratamos dados que precisem ser mantidos por obrigação legal."
				robots="index, follow"
				title="Solicitar exclusão da conta | Menu Bão"
			/>

			<div className="mx-auto max-w-3xl">
				<Link
					className="mb-6 inline-flex text-slate-400 text-sm transition-colors hover:text-white"
					to="/privacidade"
				>
					← Política de Privacidade
				</Link>
				<p className="mb-3 font-medium text-brand-urucum text-xs uppercase tracking-[0.2em]">
					Menu Bão para clientes
				</p>
				<h1 className="font-brand font-semibold text-4xl text-white tracking-tight sm:text-5xl">
					Solicitar exclusão da conta
				</h1>
				<p className="mt-5 max-w-2xl text-base text-slate-400 leading-7">
					Use este formulário para pedir a exclusão da sua conta do aplicativo
					Menu Bão. O envio inicia uma análise; não apaga sua conta
					automaticamente.
				</p>

				<div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
					<section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
						{isSubmitted ? (
							<div aria-live="polite" className="space-y-4">
								<h2 className="font-brand font-semibold text-2xl text-white">
									Solicitação recebida
								</h2>
								<p className="text-slate-300 leading-7">
									Enviamos seu pedido ao canal de privacidade. A equipe poderá
									entrar em contato para confirmar que você é titular da conta e
									informar o resultado da análise.
								</p>
								<p className="text-slate-400 text-sm leading-6">
									Alguns registros podem ser mantidos quando houver uma
									obrigação legal ou outra hipótese permitida pela LGPD. Nessa
									situação, serão mantidos apenas os dados necessários e pelo
									período aplicável; os demais serão excluídos ou anonimizados.
								</p>
							</div>
						) : (
							<form className="space-y-5" onSubmit={handleSubmit}>
								<div className="space-y-2">
									<label
										className="font-medium text-slate-300 text-sm"
										htmlFor="deletion-name"
									>
										Nome
									</label>
									<Input
										aria-describedby={
											errors.name ? "deletion-name-error" : undefined
										}
										aria-invalid={Boolean(errors.name)}
										autoComplete="name"
										id="deletion-name"
										maxLength={120}
										name="name"
										onChange={(event) => setName(event.target.value)}
										placeholder="Seu nome"
										required
										value={name}
									/>
									{errors.name ? (
										<p
											className="text-red-300 text-sm"
											id="deletion-name-error"
										>
											{errors.name}
										</p>
									) : null}
								</div>
								<div className="space-y-2">
									<label
										className="font-medium text-slate-300 text-sm"
										htmlFor="deletion-email"
									>
										E-mail da conta
									</label>
									<Input
										aria-describedby={
											errors.email ? "deletion-email-error" : undefined
										}
										aria-invalid={Boolean(errors.email)}
										autoComplete="email"
										id="deletion-email"
										maxLength={255}
										name="email"
										onChange={(event) => setEmail(event.target.value)}
										placeholder="voce@exemplo.com"
										required
										type="email"
										value={email}
									/>
									{errors.email ? (
										<p
											className="text-red-300 text-sm"
											id="deletion-email-error"
										>
											{errors.email}
										</p>
									) : null}
								</div>
								{submitError ? (
									<p aria-live="assertive" className="text-red-300 text-sm">
										{submitError}
									</p>
								) : null}
								<Button loading={isSubmitting} type="submit">
									Enviar solicitação
								</Button>
							</form>
						)}
					</section>

					<aside className="h-fit space-y-4 rounded-2xl border border-white/10 p-6">
						<h2 className="font-medium text-white">O que acontece depois?</h2>
						<ul className="list-disc space-y-3 pl-5 text-slate-400 text-sm leading-6 marker:text-brand-urucum">
							<li>
								Confirmamos que a solicitação é da pessoa titular da conta.
							</li>
							<li>
								Excluímos ou anonimizamos os dados que não precisam mais ser
								mantidos.
							</li>
							<li>
								Se algum registro precisar ser preservado por uma hipótese
								legal, limitamos seu uso ao necessário e ao período aplicável.
							</li>
						</ul>
						<p className="text-slate-500 text-xs leading-5">
							Dúvidas? Escreva para{" "}
							<a
								className="text-brand-paper underline underline-offset-4"
								href="mailto:privacidade@grupoboa.com.br"
							>
								privacidade@grupoboa.com.br
							</a>
							.
						</p>
					</aside>
				</div>
			</div>
		</main>
	)
}
