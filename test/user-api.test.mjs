import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'

const { request, ApiError, multipart, pathSegment, pathSegments } = loadApi(
    new URL('../src/api/http.ts', import.meta.url),
)
const api = loadApi(new URL('../src/api/index.ts', import.meta.url))
const options = {
    baseUrl: 'https://api.example.test/v1/',
    token: 'test-token',
    signal: new AbortController().signal,
}

async function withFetch(mock, run) {
    const previous = globalThis.fetch
    globalThis.fetch = mock
    try {
        await run()
    } finally {
        globalThis.fetch = previous
    }
}

test('queries preserve false, zero, Unicode and the base path; omit undefined and null', async () => {
    await withFetch(
        async (url, init) => {
            const parsed = new URL(url)
            assert.equal(parsed.pathname, '/v1/blog-posts')
            assert.equal(parsed.searchParams.get('isPopular'), 'false')
            assert.equal(parsed.searchParams.get('offset'), '0')
            assert.equal(parsed.searchParams.get('q'), 'Карта & побит')
            assert.equal(parsed.searchParams.has('absent'), false)
            assert.deepEqual(parsed.searchParams.getAll('ids'), ['2', '3'])
            assert.equal(init.signal, options.signal)
            assert.equal(init.headers.Authorization, 'Bearer test-token')
            return Response.json({ rows: [], total: 0 })
        },
        () =>
            request('/blog-posts', options, {
                query: {
                    isPopular: false,
                    offset: 0,
                    q: 'Карта & побит',
                    absent: undefined,
                    empty: null,
                    ids: [2, 3],
                },
            }),
    )
})

test('public login and registration use JSON without bearer headers; login includes legal requirements', async () => {
    const payload = { email: 'user@example.test', password: 'example-password' }
    await withFetch(
        async (url, init) => {
            assert.equal(url, 'https://api.example.test/v1/account-auth/login')
            assert.equal(init.method, 'POST')
            assert.equal(init.headers.Authorization, undefined)
            assert.equal(init.headers['Content-Type'], 'application/json')
            assert.deepEqual(JSON.parse(init.body), payload)
            return Response.json({
                token: 'new-token',
                legal: { acceptanceRequired: true },
            })
        },
        async () => {
            const result = await api.accountAuthApi.login(payload, options)
            assert.equal(result.token, 'new-token')
            assert.equal(result.legal.acceptanceRequired, true)
        },
    )
    await withFetch(
        async (url, init) => {
            assert.equal(new URL(url).pathname, '/v1/user/register')
            assert.equal(init.headers.Authorization, undefined)
            assert.deepEqual(JSON.parse(init.body).legalVersionIds, [1, 2])
            return Response.json({ id: 1 })
        },
        () =>
            api.userApi.register(
                { ...payload, legalVersionIds: [1, 2], lan: 'UA' },
                { baseUrl: options.baseUrl },
            ),
    )
})

test('authenticated operations reject missing tokens and unsafe base URLs before fetching', async () => {
    await withFetch(
        () => {
            throw Error('fetch must not be called')
        },
        async () => {
            for (const baseUrl of [
                'file:///tmp',
                'https://user:secret@example.test',
                'https://example.test?token=x',
                'https://example.test#x',
            ])
                await assert.rejects(api.userApi.getMe({ ...options, baseUrl }))
            await assert.rejects(api.userApi.getMe({ ...options, token: ' ' }))
            await assert.rejects(api.blogPostsApi.findOne(-1, options))
            assert.throws(() => pathSegment('..'))
            assert.throws(() => pathSegment('a/b'))
            assert.throws(() => pathSegments([]))
        },
    )
})

test('subscription errors retain status, machine code and validation messages; no implicit retry', async () => {
    let calls = 0
    await withFetch(
        async () => {
            calls++
            return Response.json(
                {
                    code: 'DOCUMENT_LIMIT_REACHED',
                    message: ['Quota exhausted', 'Choose another plan'],
                },
                { status: 403 },
            )
        },
        async () => {
            await assert.rejects(
                api.gUserDocsApi.create({ gDocTemplateId: 1 }, options),
                (error) => {
                    assert.ok(error instanceof ApiError)
                    assert.equal(error.status, 403)
                    assert.equal(error.code, 'DOCUMENT_LIMIT_REACHED')
                    assert.deepEqual(error.messages, [
                        'Quota exhausted',
                        'Choose another plan',
                    ])
                    return true
                },
            )
            assert.equal(calls, 1)
        },
    )
    await withFetch(
        async () => new Response('unavailable', { status: 503 }),
        async () => {
            await assert.rejects(
                api.userSubscriptionsApi.verify(options),
                (error) => error.status === 503,
            )
        },
    )
})

test('empty deletion response, binary download and invalid success JSON stay distinct', async () => {
    await withFetch(
        async (url, init) => {
            assert.equal(init.method, 'DELETE')
            assert.equal(new URL(url).pathname, '/v1/user/me')
            return new Response(null, { status: 204 })
        },
        async () =>
            assert.equal(await api.userApi.removeMe(options), undefined),
    )
    await withFetch(
        async () =>
            new Response('pdf', {
                headers: { 'Content-Type': 'application/pdf' },
            }),
        async () => {
            const file = await api.legalDocumentsApi.file(2, {
                baseUrl: options.baseUrl,
            })
            assert.equal(await file.text(), 'pdf')
            assert.equal(file.type, 'application/pdf')
        },
    )
    await withFetch(
        async () => new Response('broken JSON'),
        async () => {
            await assert.rejects(api.userApi.getMe(options), SyntaxError)
        },
    )
})

test('booking upload uses repeated legal IDs, preserves false and lets fetch set multipart boundary', async () => {
    const body = {
        legalVersionIds: [3, 4],
        consultationSlotId: 5,
        userText: 'Допоможіть',
        acceptEarlyService: false,
    }
    await withFetch(
        async (url, init) => {
            assert.equal(new URL(url).pathname, '/v1/consultation-bookings')
            assert.equal(init.method, 'POST')
            assert.equal(init.headers['Content-Type'], undefined)
            assert.deepEqual(init.body.getAll('legalVersionIds'), ['3', '4'])
            assert.equal(init.body.get('acceptEarlyService'), 'false')
            assert.equal(init.body.get('userText'), 'Допоможіть')
            assert.equal(await init.body.get('file').text(), 'attachment')
            return Response.json({ id: 9 })
        },
        () =>
            api.consultationBookingsApi.create(
                body,
                options,
                new Blob(['attachment']),
            ),
    )
    assert.equal(multipart(body).has('file'), false)
})

test('native upload descriptors retain uri, name and MIME type', () => {
    const previous = globalThis.FormData
    const entries = []
    globalThis.FormData = class {
        append(...values) {
            entries.push(values)
        }
    }
    try {
        const file = {
            uri: 'file:///photo.jpg',
            name: 'photo.jpg',
            type: 'image/jpeg',
        }
        multipart(undefined, file)
        assert.deepEqual(entries, [['file', file]])
    } finally {
        globalThis.FormData = previous
    }
})

test('signed file paths encode segments and send signature in query; token stays in header', async () => {
    await withFetch(
        async (url, init) => {
            const parsed = new URL(url)
            assert.equal(
                parsed.pathname,
                '/v1/files/private/user_docs/folder/my%20file.pdf',
            )
            assert.equal(parsed.searchParams.get('e'), '123456')
            assert.equal(parsed.searchParams.get('sig'), 'abc')
            assert.ok(!url.includes('test-token'))
            assert.equal(init.headers.Authorization, 'Bearer test-token')
            return new Response('file')
        },
        () =>
            api.filesApi.streamPrivateFile(
                'user_docs',
                ['folder', 'my file.pdf'],
                { e: 123456, sig: 'abc' },
                options,
            ),
    )
})

test('cancellation and network errors propagate without being treated as HTTP access errors', async () => {
    for (const error of [
        new DOMException('Aborted', 'AbortError'),
        new TypeError('Network unavailable'),
    ]) {
        await withFetch(
            async () => {
                throw error
            },
            async () => {
                await assert.rejects(
                    api.userApi.getMe(options),
                    (actual) => actual === error,
                )
            },
        )
    }
})
