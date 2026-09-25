import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { loadApi } from './load-api.mjs'

const backend = fileURLToPath(
    new URL('../../residdy_backend/src/modules/', import.meta.url),
)
const api = loadApi(new URL('../src/api/index.ts', import.meta.url))
const decorators = (node) =>
    (ts.getDecorators(node) ?? []).map((d) => d.expression)
const nameOf = (call) =>
    ts.isCallExpression(call) ? call.expression.getText() : ''
const camel = (name) =>
    name.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
function files(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
            ? files(join(dir, entry.name))
            : [join(dir, entry.name)],
    )
}

test(
    'all user/public backend routes have clients with matching verbs, paths and payload placement',
    {
        skip:
            !existsSync(backend) &&
            'Sibling backend is needed for this source-contract audit',
    },
    async () => {
        const previous = globalThis.fetch
        let checked = 0
        try {
            for (const file of files(backend).filter((file) =>
                file.endsWith('.controller.ts'),
            )) {
                const source = ts.createSourceFile(
                    file,
                    readFileSync(file, 'utf8'),
                    ts.ScriptTarget.Latest,
                    true,
                )
                for (const cls of source.statements.filter(
                    ts.isClassDeclaration,
                )) {
                    const classDecorators = decorators(cls)
                    const controller = classDecorators.find(
                        (d) => nameOf(d) === 'Controller',
                    )
                    if (!controller) continue
                    const resource = controller.arguments[0].text
                    for (const member of cls.members.filter(
                        ts.isMethodDeclaration,
                    )) {
                        const methodDecorators = decorators(member)
                        const combined = [
                            ...classDecorators,
                            ...methodDecorators,
                        ]
                        const route = methodDecorators.find((d) =>
                            /^(Get|Post|Patch|Put|Delete)$/.test(nameOf(d)),
                        )
                        if (!route) continue
                        if (
                            combined.some((d) =>
                                /ManagerGuard|SpecialistGuard|PartnerGuard|Roles\(/.test(
                                    d.getText(),
                                ),
                            )
                        )
                            continue
                        const authenticated = combined.some((d) =>
                            d.getText().includes('AccountAuthGuard'),
                        )
                        const options = {
                            baseUrl: 'https://api.example.test',
                            token: 'test-token',
                        }
                        const method = member.name.getText()
                        let routePath =
                            '/' +
                            resource +
                            (route.arguments[0]?.text
                                ? '/' + route.arguments[0].text
                                : '')
                        const args = []
                        let expectedBody, expectedQuery, upload
                        for (const parameter of member.parameters) {
                            const decorator = decorators(parameter).find((d) =>
                                /^(Param|Query|Body|UploadedFile)$/.test(
                                    nameOf(d),
                                ),
                            )
                            if (!decorator) continue
                            const kind = nameOf(decorator)
                            if (kind === 'UploadedFile') {
                                upload = new Blob(['file'])
                                continue
                            }
                            if (kind === 'Param') {
                                const key = decorator.arguments[0].text
                                const value =
                                    parameter.type?.getText() === 'number'
                                        ? 7
                                        : key === 'relPath'
                                          ? ['folder', 'file.pdf']
                                          : key === 'bucket'
                                            ? 'user_docs'
                                            : 'example'
                                args.push(value)
                                routePath = routePath
                                    .replace(':' + key, String(value))
                                    .replace(
                                        '*' + key,
                                        Array.isArray(value)
                                            ? value.join('/')
                                            : String(value),
                                    )
                            } else if (kind === 'Query') {
                                expectedQuery = { offset: 0, limit: 2 }
                                args.push(expectedQuery)
                            } else {
                                expectedBody = { contractProbe: 'payload' }
                                args.push(expectedBody)
                            }
                        }
                        args.push(options)
                        if (upload) args.push(upload)
                        const module =
                            resource === 'account'
                                ? api.accountsApi
                                : api[camel(resource) + 'Api']
                        let fn = module?.[method]
                        if (
                            resource === 'account' &&
                            method === 'uploadMyAvatar'
                        )
                            args.splice(0, args.length, upload, options)
                        if (resource === 'app-announcements') {
                            fn = module.getActive
                            args.splice(0, args.length, {
                                ...options,
                                lan: 'UA',
                            })
                            expectedQuery = { lan: 'UA' }
                        }
                        assert.equal(
                            typeof fn,
                            'function',
                            `${resource}.${method} is missing`,
                        )
                        let called = false
                        globalThis.fetch = async (url, init) => {
                            called = true
                            const parsed = new URL(url)
                            assert.equal(
                                parsed.pathname,
                                routePath,
                                `${resource}.${method} path`,
                            )
                            assert.equal(
                                init.method,
                                nameOf(route).toUpperCase(),
                                `${resource}.${method} method`,
                            )
                            assert.equal(
                                init.headers.Authorization,
                                authenticated ? 'Bearer test-token' : undefined,
                            )
                            assert.deepEqual(
                                Object.fromEntries(parsed.searchParams),
                                Object.fromEntries(
                                    Object.entries(expectedQuery ?? {}).map(
                                        ([k, v]) => [k, String(v)],
                                    ),
                                ),
                            )
                            if (upload) {
                                assert.ok(init.body instanceof FormData)
                                assert.ok(init.body.has('file'))
                                if (expectedBody)
                                    assert.equal(
                                        init.body.get('contractProbe'),
                                        'payload',
                                    )
                            } else if (expectedBody)
                                assert.deepEqual(
                                    JSON.parse(init.body),
                                    expectedBody,
                                )
                            else assert.equal(init.body, undefined)
                            return Response.json({})
                        }
                        await fn(...args)
                        assert.ok(called, `${resource}.${method} did not fetch`)
                        checked++
                    }
                }
            }
            assert.ok(checked >= 120, `Unexpected route count: ${checked}`)
        } finally {
            globalThis.fetch = previous
        }
    },
)
