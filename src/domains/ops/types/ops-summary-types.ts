export interface OpsSummaryStats {
	inbox: {
		received: number
		processing: number
		failed: number
	}
	dlq: {
		open: number
		resolved: number
	}
}
