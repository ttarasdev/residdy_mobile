import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { loadApi } from './load-api.mjs'
const { WELCOME_STORAGE_KEY, readWelcomeCompleted, saveWelcomeCompleted } = loadApi(new URL('../src/shared/onboarding/welcome-storage.ts', import.meta.url))

test('welcome is device-local, persisted only on completion and recoverable after storage errors', async () => {
    const values = new Map()
    const storage = { getItem: async key => values.get(key) ?? null, setItem: async (key, value) => { values.set(key, value) } }
    assert.equal(await readWelcomeCompleted(storage), false)
    values.set(WELCOME_STORAGE_KEY, 'invalid')
    assert.equal(await readWelcomeCompleted(storage), false)
    await saveWelcomeCompleted(storage)
    assert.equal(await readWelcomeCompleted(storage), true)
    assert.deepEqual([...values.keys()], [WELCOME_STORAGE_KEY])
    assert.equal(await readWelcomeCompleted({ ...storage, getItem: async () => { throw Error('storage') } }), false)
    await assert.rejects(saveWelcomeCompleted({ ...storage, setItem: async () => { throw Error('storage') } }))
})

test('all four languages cover every onboarding message and interpolation', () => {
    const flatten = (object, prefix = '') => Object.entries(object).flatMap(([key, value]) =>
        typeof value === 'object' ? flatten(value, `${prefix}${key}.`) : [[prefix + key, value]])
    const messages = ['pl', 'uk', 'en', 'ru'].map(language => JSON.parse(readFileSync(new URL(`../src/i18n/messages/${language}.json`, import.meta.url))).onboarding)
    const reference = Object.fromEntries(flatten(messages[0]))
    for (const message of messages) {
        const entries = Object.fromEntries(flatten(message))
        assert.deepEqual(Object.keys(entries).sort(), Object.keys(reference).sort())
        for (const [key, value] of Object.entries(entries)) {
            assert.equal(typeof value, 'string')
            assert.ok(value.trim())
            assert.deepEqual(value.match(/\{\{\w+\}\}/g), reference[key].match(/\{\{\w+\}\}/g))
        }
    }
})

const { syncWelcome } = loadApi(new URL('../src/shared/onboarding/sync-welcome.ts', import.meta.url))
test('welcome sync respects server completion, uploads local completion and retries safely after failure', async () => {
    let user = { onboardingCompletedAt: null }; let writes = 0
    let fail = false
    const api = {
        getMe: async () => user,
        complete: async () => {
            writes++
            if (fail) throw Error('network')
            user = { onboardingCompletedAt: '2026-09-22T12:00:00.000Z' }; return user
        },
    }
    assert.equal((await syncWelcome(false, api)).onboardingCompletedAt, null)
    assert.equal(writes, 0)
    fail = true
    await assert.rejects(syncWelcome(true, api))
    fail = false
    assert.ok((await syncWelcome(true, api)).onboardingCompletedAt)
    await syncWelcome(true, api)
    await syncWelcome(false, api)
    assert.equal(writes, 2)
})
