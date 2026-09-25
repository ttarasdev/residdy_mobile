import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'

const { restoreSession } = loadApi(new URL('../src/shared/auth/session.ts', import.meta.url))

test('session restoration distinguishes guests, invalid tokens and recoverable failures', async () => {
    const original = globalThis.fetch
    let clears = 0
    let requests = 0
    const options = {
        readToken: async () => 'saved-token',
        clearToken: async () => { clears++ },
        baseUrl: 'https://api.example.test',
    }
    try {
        globalThis.fetch = async () => { requests++; throw Error('Unexpected request') }
        assert.deepEqual(await restoreSession({ ...options, readToken: async () => null, baseUrl: undefined }), { status: 'guest' })
        assert.equal(requests, 0)
        await assert.rejects(restoreSession({ ...options, baseUrl: undefined }), /not configured/)
        assert.equal(clears, 0)

        const account = { id: 1, email: 'test@example.test', status: 'active', type: 'USERS' }
        globalThis.fetch = async (url, init) => {
            assert.equal(url, 'https://api.example.test/account/me')
            assert.equal(init.headers.Authorization, 'Bearer saved-token')
            return Response.json(account)
        }
        assert.deepEqual(await restoreSession(options), { status: 'authenticated', account, token: 'saved-token' })
        // No subscription endpoint is necessary to enter the app.
        for (const status of [403, 500]) {
            globalThis.fetch = async () => new Response('', { status })
            await assert.rejects(restoreSession(options))
            assert.equal(clears, 0)
        }
        globalThis.fetch = async () => { throw new TypeError('Network unavailable') }
        await assert.rejects(restoreSession(options))
        assert.equal(clears, 0)
        await assert.rejects(restoreSession({ ...options, readToken: async () => { throw Error('Storage unavailable') } }))
        assert.equal(clears, 0)

        globalThis.fetch = async () => new Response('', { status: 401 })
        assert.deepEqual(await restoreSession(options), { status: 'guest' })
        assert.equal(clears, 1)
        globalThis.fetch = async () => Response.json({ ...account, type: 'MANAGERS' })
        assert.deepEqual(await restoreSession(options), { status: 'guest' })
        assert.equal(clears, 2)
    } finally {
        globalThis.fetch = original
    }
})

test('only authenticated 401 responses report the rejected token, including late old-token responses', async () => {
    const { request, onUnauthorized } = loadApi(new URL('../src/api/http.ts', import.meta.url))
    const original = globalThis.fetch
    const rejected = []
    const stop = onUnauthorized(token => rejected.push(token))
    try {
        for (const status of [403, 500, 401]) {
            globalThis.fetch = async () => new Response('', { status })
            await assert.rejects(request('/me', { baseUrl: 'https://api.example.test', token: 'old' }))
        }
        await assert.rejects(request('/login', { baseUrl: 'https://api.example.test', token: 'new' }, { auth: false }))
        assert.deepEqual(rejected, ['old'])
        stop()
        await assert.rejects(request('/me', { baseUrl: 'https://api.example.test', token: 'new' }))
        assert.deepEqual(rejected, ['old'])
    } finally { stop(); globalThis.fetch = original }
})
