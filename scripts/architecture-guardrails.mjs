import { promises as fs } from "node:fs"
import path from "node:path"
import process from "node:process"

const projectRoot = process.cwd()
const srcRoot = path.join(projectRoot, "src")
const guardrailLayers = new Set(["app", "domains", "shared"])
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx"])
const kebabCasePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const importPattern =
	/(?:import|export)\s[\s\S]*?from\s+["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g

const fail = (message) => {
	console.error(message)
	process.exitCode = 1
}

const asPosix = (value) => value.split(path.sep).join("/")

const exists = async (targetPath) => {
	try {
		await fs.access(targetPath)
		return true
	} catch {
		return false
	}
}

const readExceptions = async () => {
	const defaultExceptions = {
		boundaryViolations: [],
		cycleAllowList: [],
		namingAllowList: [],
	}
	const exceptionsPath = path.join(
		projectRoot,
		"scripts",
		"architecture-guardrails-exceptions.json"
	)

	if (!(await exists(exceptionsPath))) {
		return defaultExceptions
	}

	const rawContent = await fs.readFile(exceptionsPath, "utf8")
	const parsed = JSON.parse(rawContent)

	return {
		boundaryViolations: Array.isArray(parsed.boundaryViolations)
			? parsed.boundaryViolations
			: [],
		cycleAllowList: Array.isArray(parsed.cycleAllowList)
			? parsed.cycleAllowList
			: [],
		namingAllowList: Array.isArray(parsed.namingAllowList)
			? parsed.namingAllowList
			: [],
	}
}

const walkFiles = async (directoryPath) => {
	const entries = await fs.readdir(directoryPath, { withFileTypes: true })
	const files = []

	for (const entry of entries) {
		if (entry.name === ".DS_Store") {
			continue
		}

		const entryPath = path.join(directoryPath, entry.name)
		if (entry.isDirectory()) {
			files.push(...(await walkFiles(entryPath)))
			continue
		}

		const extension = path.extname(entry.name)
		if (sourceExtensions.has(extension)) {
			files.push(entryPath)
		}
	}

	return files
}

const isGuardedFile = (filePath) => {
	const relativePath = asPosix(path.relative(srcRoot, filePath))
	const layer = relativePath.split("/")[0]
	return guardrailLayers.has(layer)
}

const layerFromRelativePath = (relativePath) => relativePath.split("/")[0]

const domainFromRelativePath = (relativePath) => {
	const parts = relativePath.split("/")
	if (parts[0] !== "domains") {
		return null
	}

	return parts[1] ?? null
}

const normalizeImportSpecifier = async (fromFilePath, specifier) => {
	if (!specifier || specifier.startsWith("#")) {
		return null
	}

	if (specifier.startsWith("@/")) {
		return path.join(srcRoot, specifier.slice(2))
	}

	if (!specifier.startsWith(".")) {
		return null
	}

	const basePath = path.resolve(path.dirname(fromFilePath), specifier)
	if (await exists(basePath)) {
		const stat = await fs.stat(basePath)
		if (stat.isFile()) {
			return basePath
		}
	}

	for (const extension of sourceExtensions) {
		const withExtension = `${basePath}${extension}`
		if (await exists(withExtension)) {
			return withExtension
		}
	}

	for (const extension of sourceExtensions) {
		const withIndex = path.join(basePath, `index${extension}`)
		if (await exists(withIndex)) {
			return withIndex
		}
	}

	return basePath
}

const extractImports = async (filePath) => {
	const sourceCode = await fs.readFile(filePath, "utf8")
	const imports = []

	for (const match of sourceCode.matchAll(importPattern)) {
		const specifier = match[1] ?? match[2]
		if (specifier) {
			imports.push(specifier)
		}
	}

	return imports
}

const canonicalCycle = (cycle) => {
	const normalized = cycle.map((entry) => asPosix(entry))
	const rotations = []

	for (let index = 0; index < normalized.length; index += 1) {
		const forward = normalized.slice(index).concat(normalized.slice(0, index))
		const backward = [...forward].reverse()
		rotations.push(forward.join("->"))
		rotations.push(backward.join("->"))
	}

	rotations.sort()
	return rotations[0]
}

const validateBoundaries = (edges, exceptions) => {
	const allowList = new Set(
		exceptions.boundaryViolations.map(
			(entry) => `${asPosix(entry.from)}->${asPosix(entry.to)}`
		)
	)
	const violations = []

	for (const edge of edges) {
		const sourceLayer = layerFromRelativePath(edge.from)
		const targetLayer = layerFromRelativePath(edge.to)
		const sourceDomain = domainFromRelativePath(edge.from)
		const targetDomain = domainFromRelativePath(edge.to)

		if (
			!(guardrailLayers.has(sourceLayer) && guardrailLayers.has(targetLayer))
		) {
			continue
		}

		const exceptionKey = `${edge.from}->${edge.to}`
		if (allowList.has(exceptionKey)) {
			continue
		}

		if (sourceLayer === "shared" && targetLayer !== "shared") {
			violations.push({
				type: "shared",
				from: edge.from,
				to: edge.to,
			})
			continue
		}

		if (sourceLayer === "domains") {
			if (targetLayer === "app") {
				violations.push({
					type: "domains-to-app",
					from: edge.from,
					to: edge.to,
				})
				continue
			}

			if (
				targetLayer === "domains" &&
				sourceDomain &&
				targetDomain &&
				sourceDomain !== targetDomain
			) {
				violations.push({
					type: "cross-domain",
					from: edge.from,
					to: edge.to,
				})
			}
		}
	}

	return violations
}

const validateCycles = (graph, exceptions) => {
	const allowList = new Set(
		exceptions.cycleAllowList
			.filter((entry) => Array.isArray(entry) && entry.length > 1)
			.map((entry) => canonicalCycle(entry))
	)

	const visiting = new Set()
	const visited = new Set()
	const stack = []
	const cycles = new Set()

	const recordCycle = (neighbour) => {
		const cycleStart = stack.lastIndexOf(neighbour)
		if (cycleStart < 0) {
			return
		}

		const cycle = stack.slice(cycleStart)
		if (cycle.length > 1) {
			cycles.add(canonicalCycle(cycle))
		}
	}

	const visitNeighbour = (neighbour) => {
		if (!graph.has(neighbour)) {
			return
		}

		if (!(visiting.has(neighbour) || visited.has(neighbour))) {
			visit(neighbour)
			return
		}

		if (visiting.has(neighbour)) {
			recordCycle(neighbour)
		}
	}

	const visit = (node) => {
		if (visited.has(node)) {
			return
		}

		visiting.add(node)
		stack.push(node)

		for (const neighbour of graph.get(node) ?? []) {
			visitNeighbour(neighbour)
		}

		stack.pop()
		visiting.delete(node)
		visited.add(node)
	}

	for (const node of graph.keys()) {
		visit(node)
	}

	return [...cycles].filter((cycle) => !allowList.has(cycle))
}

const validateNaming = (files, exceptions) => {
	const allowList = new Set(
		exceptions.namingAllowList.map((entry) => asPosix(entry))
	)
	const violations = []

	for (const absoluteFilePath of files) {
		const relativeFilePath = asPosix(
			path.relative(projectRoot, absoluteFilePath)
		)
		const srcRelativePath = asPosix(path.relative(srcRoot, absoluteFilePath))
		const layer = layerFromRelativePath(srcRelativePath)

		if (!guardrailLayers.has(layer)) {
			continue
		}

		if (allowList.has(relativeFilePath)) {
			continue
		}

		const fileNameWithoutExtension = path
			.basename(absoluteFilePath)
			.replace(path.extname(absoluteFilePath), "")

		if (
			!(
				["index", "main", "vite-env"].includes(fileNameWithoutExtension) ||
				kebabCasePattern.test(fileNameWithoutExtension)
			)
		) {
			violations.push({
				type: "kebab-case",
				file: relativeFilePath,
			})
		}

		const inDomainStoreDirectory = srcRelativePath.includes("/store/")
		const inDomainHooksDirectory = srcRelativePath.includes("/hooks/")
		const inDomainsLayer = layer === "domains"

		if (
			inDomainsLayer &&
			inDomainStoreDirectory &&
			!fileNameWithoutExtension.endsWith("-store")
		) {
			violations.push({
				type: "domain-store",
				file: relativeFilePath,
			})
		}

		if (
			inDomainsLayer &&
			inDomainHooksDirectory &&
			!fileNameWithoutExtension.startsWith("use-")
		) {
			violations.push({
				type: "domain-hook",
				file: relativeFilePath,
			})
		}
	}

	return violations
}

const formatBoundaryViolation = (violation) => {
	if (violation.type === "shared") {
		return `- ${violation.from} nao pode importar ${violation.to} porque shared nao depende de app/domains`
	}

	if (violation.type === "domains-to-app") {
		return `- ${violation.from} nao pode importar ${violation.to} porque domains nao depende de app`
	}

	return `- ${violation.from} nao pode importar ${violation.to} porque dominios nao podem cruzar imports diretos`
}

const formatNamingViolation = (violation) => {
	if (violation.type === "kebab-case") {
		return `- ${violation.file} deve estar em kebab-case`
	}

	if (violation.type === "domain-store") {
		return `- ${violation.file} deve terminar com -store.ts(x)`
	}

	return `- ${violation.file} deve iniciar com use- no diretorio hooks`
}

const printSuccess = () => {
	console.log(
		"[architecture-guardrails] OK: boundaries, ciclos e naming validados"
	)
}

const listGuardrailFiles = async () => {
	const srcEntries = await fs.readdir(srcRoot, { withFileTypes: true })
	const guardrailDirectories = srcEntries
		.filter((entry) => entry.isDirectory() && guardrailLayers.has(entry.name))
		.map((entry) => path.join(srcRoot, entry.name))

	const files = []
	for (const directory of guardrailDirectories) {
		files.push(...(await walkFiles(directory)))
	}

	return files
}

const buildArchitectureGraph = async (files) => {
	const graph = new Map()
	const edges = []

	for (const filePath of files) {
		if (!isGuardedFile(filePath)) {
			continue
		}

		const from = asPosix(path.relative(srcRoot, filePath))
		graph.set(from, graph.get(from) ?? new Set())

		const imports = await extractImports(filePath)
		for (const specifier of imports) {
			const resolvedTarget = await normalizeImportSpecifier(filePath, specifier)
			if (!resolvedTarget) {
				continue
			}

			const targetRelative = asPosix(path.relative(srcRoot, resolvedTarget))
			if (targetRelative.startsWith("..")) {
				continue
			}

			const targetLayer = layerFromRelativePath(targetRelative)
			if (!guardrailLayers.has(targetLayer)) {
				continue
			}

			edges.push({ from, to: targetRelative })
			graph.get(from).add(targetRelative)
			if (!graph.has(targetRelative)) {
				graph.set(targetRelative, new Set())
			}
		}
	}

	return { graph, edges }
}

const printViolations = ({
	boundaryViolations,
	cycleViolations,
	namingViolations,
}) => {
	fail(
		"\n[architecture-guardrails] Falhou: foram encontradas violacoes arquiteturais."
	)

	if (boundaryViolations.length > 0) {
		console.error("\nBoundary violations:")
		for (const violation of boundaryViolations) {
			console.error(formatBoundaryViolation(violation))
		}
	}

	if (cycleViolations.length > 0) {
		console.error("\nCiclos detectados:")
		for (const cycle of cycleViolations) {
			const formattedCycle = cycle.split("->").join(" -> ")
			console.error(`- ${formattedCycle}`)
		}
	}

	if (namingViolations.length > 0) {
		console.error("\nNaming violations:")
		for (const violation of namingViolations) {
			console.error(formatNamingViolation(violation))
		}
	}

	console.error("\nAcao recomendada:")
	console.error(
		"- Corrija os imports/nomes para respeitar docs/architecture.md e docs/naming.md."
	)
	console.error(
		"- Se for excecao temporaria, registre em scripts/architecture-guardrails-exceptions.json com justificativa no PR."
	)
}

const main = async () => {
	const exceptions = await readExceptions()
	const files = await listGuardrailFiles()
	const { graph, edges } = await buildArchitectureGraph(files)

	const boundaryViolations = validateBoundaries(edges, exceptions)
	const cycleViolations = validateCycles(graph, exceptions)
	const namingViolations = validateNaming(files, exceptions)

	if (
		boundaryViolations.length === 0 &&
		cycleViolations.length === 0 &&
		namingViolations.length === 0
	) {
		printSuccess()
		return
	}

	printViolations({
		boundaryViolations,
		cycleViolations,
		namingViolations,
	})
}

main().catch((error) => {
	fail(`\n[architecture-guardrails] Erro inesperado: ${error.message}`)
})
