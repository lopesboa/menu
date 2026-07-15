import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { Resvg } from "@resvg/resvg-js"
import satori from "satori"
import type { BlogImageDefinition } from "./types"

const SAFE_FILE_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SAFE_OUTPUT_DIRECTORY =
	/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/
const OUTPUT_ROOT = path.resolve("public/blog-images")
const PUBLIC_ROOT = path.resolve("public")
const FONT_DIRECTORY = path.resolve("scripts/blog-images/fonts")

interface RenderManifest {
	images: Array<{
		alt: string
		height: number
		name: string
		png: string
		svg: string
		width: number
	}>
	slug: string
}

async function main() {
	const sourceArgument = process.argv
		.slice(2)
		.find((argument) => argument !== "--")

	if (!sourceArgument) {
		throw new Error(
			"Informe uma composição. Exemplo: pnpm blog:image -- scripts/blog-images/compositions/meu-artigo.tsx"
		)
	}

	const definition = await loadDefinition(path.resolve(sourceArgument))
	validateDefinition(definition)

	const [regular, semibold, bold] = await Promise.all([
		readFile(path.join(FONT_DIRECTORY, "Inter-Regular.ttf")),
		readFile(path.join(FONT_DIRECTORY, "Inter-SemiBold.ttf")),
		readFile(path.join(FONT_DIRECTORY, "Inter-Bold.ttf")),
	])
	const outputDirectory = definition.outputDirectory
		? path.join(PUBLIC_ROOT, definition.outputDirectory)
		: path.join(OUTPUT_ROOT, definition.slug)
	await mkdir(outputDirectory, { recursive: true })

	const manifest: RenderManifest = {
		images: [],
		slug: definition.slug,
	}

	for (const image of definition.images) {
		const svg = await satori(image.element, {
			fonts: [
				{ data: regular, name: "Inter", style: "normal", weight: 400 },
				{ data: semibold, name: "Inter", style: "normal", weight: 600 },
				{ data: bold, name: "Inter", style: "normal", weight: 700 },
			],
			height: image.height,
			width: image.width,
		})
		const svgName = `${image.name}.svg`
		const pngName = `${image.name}.png`
		const renderer = new Resvg(svg)
		const rendered = renderer.render()

		if (rendered.width !== image.width || rendered.height !== image.height) {
			throw new Error(
				`A imagem ${image.name} foi renderizada em ${rendered.width}x${rendered.height}, mas deveria ter ${image.width}x${image.height}.`
			)
		}

		await Promise.all([
			writeFile(path.join(outputDirectory, svgName), svg),
			writeFile(path.join(outputDirectory, pngName), rendered.asPng()),
		])

		manifest.images.push({
			alt: image.alt,
			height: image.height,
			name: image.name,
			png: pngName,
			svg: svgName,
			width: image.width,
		})
		console.info(
			`Imagem gerada: ${path.relative(process.cwd(), path.join(outputDirectory, pngName))}`
		)
	}

	await writeFile(
		path.join(outputDirectory, "manifest.json"),
		`${JSON.stringify(manifest, null, 2)}\n`
	)
	console.info(
		`Manifesto gerado: ${path.relative(process.cwd(), path.join(outputDirectory, "manifest.json"))}`
	)
}

async function loadDefinition(sourcePath: string) {
	const sourceUrl = pathToFileURL(sourcePath)
	const imported = (await import(sourceUrl.href)) as { default?: unknown }

	return imported.default as BlogImageDefinition
}

function validateDefinition(
	definition: BlogImageDefinition | undefined
): asserts definition is BlogImageDefinition {
	if (!definition || typeof definition !== "object") {
		throw new Error("A composição precisa exportar uma definição padrão.")
	}

	if (!SAFE_FILE_NAME.test(definition.slug)) {
		throw new Error(
			"O slug deve usar apenas letras minúsculas, números e hífens."
		)
	}

	if (
		definition.outputDirectory &&
		!SAFE_OUTPUT_DIRECTORY.test(definition.outputDirectory)
	) {
		throw new Error(
			"O diretório de saída deve ser relativo a public e usar letras minúsculas, números, barras e hífens."
		)
	}

	if (!Array.isArray(definition.images) || definition.images.length === 0) {
		throw new Error("A composição precisa declarar pelo menos uma imagem.")
	}

	const names = new Set<string>()

	for (const image of definition.images) {
		if (!SAFE_FILE_NAME.test(image.name)) {
			throw new Error(
				`O nome “${image.name}” deve usar apenas letras minúsculas, números e hífens.`
			)
		}

		if (names.has(image.name)) {
			throw new Error(`O nome de imagem “${image.name}” está duplicado.`)
		}

		if (!(image.width > 0 && image.height > 0)) {
			throw new Error(`A imagem “${image.name}” possui dimensões inválidas.`)
		}

		if (!image.alt.trim()) {
			throw new Error(`A imagem “${image.name}” precisa de alt text.`)
		}

		names.add(image.name)
	}
}

await main()
