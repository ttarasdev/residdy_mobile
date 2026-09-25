import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { loadApi } from './load-api.mjs'

const { normalizeEmail, validEmail, validPassword, validCode } = loadApi(new URL('../src/shared/auth/validation.ts', import.meta.url))
const { accountAuthApi } = loadApi(new URL('../src/api/account-auth/account-auth.api.ts', import.meta.url))
const { userApi } = loadApi(new URL('../src/api/user/user.api.ts', import.meta.url))
const { authErrorKey } = loadApi(new URL('../src/shared/auth/auth-error.ts', import.meta.url))
const { ApiError } = loadApi(new URL('../src/api/http.ts', import.meta.url))

test('auth validation preserves password whitespace and validates server length and code boundaries', () => {
    assert.equal(normalizeEmail(' USER@Example.COM '), 'user@example.com')
    assert.equal(validEmail(' USER@Example.COM '), true)
    assert.equal(validEmail('wrong'), false)
    assert.equal(validPassword('1234567'), false)
    assert.equal(validPassword(' 123456 '), true)
    assert.equal(validPassword('x'.repeat(128)), true)
    assert.equal(validPassword('x'.repeat(129)), false)
    assert.equal(validCode('012345'), true)
    for (const code of ['12345', '1234567', 'abcdef']) assert.equal(validCode(code), false)
})
test('registration and code/password flows use public API contracts without bearer credentials', async () => {
    const original = globalThis.fetch
    const requests = []
    globalThis.fetch = async (url, init) => {
        assert.equal(init.headers.Authorization, undefined)
        requests.push({ path: new URL(url).pathname, body: JSON.parse(init.body) })
        return Response.json({ ok: true })
    }
    const options = { baseUrl: 'https://api.example.test', token: 'must-not-leak' }
    try {
        await userApi.register({ email: 'test@example.test', password: 'test-password', legalVersionIds: [31, 32], lan: 'UA' }, options)
        await accountAuthApi.confirm({ email: 'test@example.test', code: '012345' }, options)
        await accountAuthApi.resend({ email: 'test@example.test' }, options)
        await accountAuthApi.forgotPassword({ email: 'test@example.test' }, options)
        await accountAuthApi.resetPassword({ email: 'test@example.test', code: '012345', password: 'changed-test-password' }, options)
        assert.deepEqual(requests.map((r) => r.path), ['/user/register', '/account-auth/confirm', '/account-auth/resend', '/account-auth/forgot-password', '/account-auth/reset-password'])
        assert.deepEqual(requests[0].body.legalVersionIds, [31, 32])
        assert.equal(requests[4].body.code, '012345')
    } finally { globalThis.fetch = original }
})
test('errors are translated instead of exposing raw server details', () => {
    assert.equal(authErrorKey(new ApiError(401, 'internal detail'), 'login'), 'auth.errors.credentials')
    assert.equal(authErrorKey(new ApiError(400, 'internal detail'), 'code'), 'auth.errors.code')
    assert.equal(authErrorKey(new ApiError(429, 'internal detail')), 'auth.errors.tooMany')
})
test('all four languages contain the same application keys', () => {
    const flatten = (obj, prefix = '') => Object.entries(obj).flatMap(([key, value]) => typeof value === 'object' ? flatten(value, prefix + key + '.') : [prefix + key]).sort()
    const dictionaries = ['en', 'uk', 'pl', 'ru'].map((lang) => JSON.parse(readFileSync(new URL(`../src/i18n/messages/${lang}.json`, import.meta.url))))
    for (const dictionary of dictionaries) assert.deepEqual(flatten(dictionary), flatten(dictionaries[0]))
})

test('repeat registration resends only duplicate-email conflicts and propagates failures', async () => {
    const { registerOrResend } = loadApi(new URL('../src/shared/auth/register-or-resend.ts', import.meta.url))
    const original = globalThis.fetch
    const body = { email: 'pending@example.test', password: 'test-password', legalVersionIds: [1, 2], lan: 'PL' }
    const options = { baseUrl: 'https://api.example.test' }
    try {
        for (const scenario of [
            { status: 201, message: '', resend: false },
            { status: 409, message: 'Email already in use', resend: true },
            { status: 409, message: 'Legal versions changed', resend: false },
            { status: 500, message: 'Server failure', resend: false },
        ]) {
            const paths = []
            globalThis.fetch = async (url, init) => {
                paths.push(new URL(url).pathname)
                if (paths.length === 2) {
                    assert.deepEqual(JSON.parse(init.body), { email: body.email })
                    return Response.json({ ok: true })
                }
                return Response.json({ message: scenario.message }, { status: scenario.status })
            }
            if (scenario.status >= 400 && !scenario.resend) await assert.rejects(registerOrResend(body, options))
            else await registerOrResend(body, options)
            assert.deepEqual(paths, scenario.resend ? ['/user/register', '/account-auth/resend'] : ['/user/register'])
        }
        globalThis.fetch = async (url) => Response.json({ message: new URL(url).pathname.endsWith('register') ? 'Email already in use' : 'Mail unavailable' }, { status: new URL(url).pathname.endsWith('register') ? 409 : 503 })
        await assert.rejects(registerOrResend(body, options), { status: 503 })
    } finally { globalThis.fetch = original }
})
