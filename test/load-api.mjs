import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import ts from 'typescript'

const cache = new Map()
const nativeRequire = createRequire(import.meta.url)

// Load the real TypeScript clients without adding a test runtime dependency.
export function loadApi(input) {
    const filename =
        input instanceof URL ? fileURLToPath(input) : resolve(input)
    if (cache.has(filename)) return cache.get(filename).exports
    const module = { exports: {} }
    cache.set(filename, module)
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
        compilerOptions: {
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.CommonJS,
        },
    })
    const localRequire = (specifier) =>
        specifier.startsWith('.')
            ? loadApi(resolve(dirname(filename), specifier + '.ts'))
            : nativeRequire(specifier)
    new Function('require', 'module', 'exports', outputText)(
        localRequire,
        module,
        module.exports,
    )
    return module.exports
}
