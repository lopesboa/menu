import { create } from "zustand"
import { persist } from "zustand/middleware"

type ThemeMode = "light" | "dark" | "system"

interface ThemeState {
	theme: ThemeMode
	systemPreference: "light" | "dark"
	setTheme: (theme: ThemeMode) => void
	resolvedTheme: "light" | "dark"
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			theme: "system",
			systemPreference: "light",
			setTheme: (theme) => {
				set({ theme })
				if (theme === "system" && typeof window !== "undefined") {
					const systemDark = window.matchMedia(
						"(prefers-color-scheme: dark)"
					).matches
					set({ systemPreference: systemDark ? "dark" : "light" })
				}
			},
			resolvedTheme: "light",
		}),
		{
			name: "theme-storage",
			onRehydrateStorage: () => (state) => {
				if (state && typeof window !== "undefined") {
					const updateResolvedTheme = () => {
						if (state.theme === "system") {
							const systemDark = window.matchMedia(
								"(prefers-color-scheme: dark)"
							).matches
							state.systemPreference = systemDark ? "dark" : "light"
							state.resolvedTheme = state.systemPreference
						} else {
							state.resolvedTheme = state.theme
						}
					}
					updateResolvedTheme()
					const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
					mediaQuery.addEventListener("change", updateResolvedTheme)
					return () => {
						mediaQuery.removeEventListener("change", updateResolvedTheme)
					}
				}
			},
		}
	)
)
