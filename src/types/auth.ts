export interface LogInForm {
	email: string
	password: string
	redirectTo?: string
	remember?: boolean
}

export interface SignUpForm {
	email: string
	password: string
	firstName: string
	lastName: string
	confirmPassword: string
	redirectTo?: string
}

export interface ForgotForm {
	email: string
	redirectTo?: string
}

export interface ChangePasswordForm {
	password: string
	confirmPassword: string
}

export interface VerifyForm {
	otp: string
	redirectTo?: string
}
