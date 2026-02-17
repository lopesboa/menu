import { Component, type ReactNode } from "react"
import { DefaultErrorFallback } from "@/components/ui/default-error-fallback"
import { sentryCaptureException } from "@/lib/sentry"

interface ErrorBoundaryProps {
	children: ReactNode
	fallback?: ReactNode
	onReset?: () => void
}

interface State {
	hasError: boolean
	error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
	state: State = { hasError: false, error: null }

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
		sentryCaptureException(error, {
			extra: { componentStack: errorInfo.componentStack },
		})
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null })
		this.props.onReset?.()
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}
			return (
				<DefaultErrorFallback
					error={this.state.error}
					onReset={this.handleReset}
				/>
			)
		}
		return this.props.children
	}
}
