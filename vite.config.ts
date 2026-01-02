import { fileURLToPath, URL } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// const env = loadEnv(mode, process.cwd(), "")

	return {
		plugins: [
			react({
				babel: {
					plugins: [["babel-plugin-react-compiler"]],
				},
			}),
			tailwindcss(),
		],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				"~": fileURLToPath(new URL("./", import.meta.url)),
				// "@": path.resolve(__dirname, "./src"),
				// "~": path.resolve(__dirname, "./"),
			},
		},
		server: {
			watch: {
				usePolling: true,
			},
			host: true,
			strictPort: true,
			port: 3030,
		},
		build: {
			outDir: "dist",
			emptyOutDir: true,
			sourcemap: mode === "development",
			target: "ES2022",
			minify: "esbuild",
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes("node_modules")) {
							if (id.includes("react-dom") || id.includes("react")) {
								return "react-vendor"
							}

							if (id.includes("zustand")) {
								return "zustand-vendor"
							}
							return "vendor"
						}
					},
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
				},
			},
			cssCodeSplit: true,
			cssMinify: true,
		},

		optimizeDeps: {
			include: ["react", "react-dom", "zustand"],
		},
		define: {
			__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		},
		preview: {
			port: 4173,
			host: true,
		},
		esbuild: {
			drop: mode === "production" ? ["console", "debugger"] : [],
			legalComments: "none",
			treeShaking: true,
		},
	}
})
