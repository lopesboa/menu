import { z } from "zod/v4"

export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 30

export const PasswordSchema = z
	.string()
	.min(1, { error: "Senha é obrigatório" })
	.min(6, { error: "Senha muito curta" })
	// NOTE: bcrypt has a limit of 72 bytes (which should be plenty long)
	.refine((val) => new TextEncoder().encode(val).length <= 72, {
		error: "Sua senha é muito longa. O limite é de 70 caracteres.",
	})

export const NameSchema = z
	.string()
	.min(1, { error: "Nome é obrigatório" })
	.min(3, { error: "Nome é muito curto" })
	.max(40, { error: "Nome longo de mais" })

export const EmailSchema = z
	.email("Email invalido")
	.min(3, { error: "Email é muito curto" })
	.max(100, { error: "Email é muito longo" })
	.transform((value) => value.toLowerCase())

export const PasswordAndConfirmPasswordSchema = z
	.object({ password: PasswordSchema, confirmPassword: PasswordSchema })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				path: ["confirmPassword"],
				code: "custom",
				message: "As senhas não são iguais. Verifique e tente novamente",
			})
		}
	})

export const MetadataSchema = z.record(z.string(), z.unknown()).optional()

export const SignInFormSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
	redirectTo: z.string().optional(),
	remember: z.boolean().optional(),
})

export const RestaurantFormSchema = z.object({
	slug: z.string(),
	logo: z.string().optional(),
	restaurantName: NameSchema,
	metadata: MetadataSchema,
	redirectTo: z.string().optional(),
	keepCurrentActiveOrganization: z.boolean(),
})

export const SignUpFormSchema = z
	.object({
		firstName: NameSchema,
		lastName: NameSchema,
		email: EmailSchema,
		password: PasswordSchema,
	})
	.and(PasswordAndConfirmPasswordSchema)
