import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'

const { appAnnouncementsApi, AnnouncementApiError } = loadApi(
    new URL(
        '../src/api/app-announcements/app-announcements.api.ts',
        import.meta.url,
    ),
)

test('active announcement sends authenticated localized request and distinguishes absence from failure', async () => {
    const original = globalThis.fetch
    const controller = new AbortController()
    const options = {
        baseUrl: 'http://192.168.1.10:3000',
        token: 'test-token',
        lan: 'UA',
        signal: controller.signal,
    }
    try {
        globalThis.fetch = async (url, init) => {
            assert.equal(
                url,
                'http://192.168.1.10:3000/app-announcements/active?lan=UA',
            )
            assert.equal(init.headers.Authorization, 'Bearer test-token')
            assert.equal(init.signal, controller.signal)
            return Response.json({ announcement: null })
        }
        assert.deepEqual(await appAnnouncementsApi.getActive(options), {
            announcement: null,
        })
        globalThis.fetch = async () => new Response('', { status: 401 })
        await assert.rejects(
            appAnnouncementsApi.getActive(options),
            (e) => e instanceof AnnouncementApiError && e.status === 401,
        )
        await assert.rejects(
            appAnnouncementsApi.getActive({ ...options, token: '' }),
        )
        await assert.rejects(
            appAnnouncementsApi.getActive({
                ...options,
                baseUrl: 'https://user:secret@example.com',
            }),
        )
        await assert.rejects(
            appAnnouncementsApi.getActive({
                ...options,
                baseUrl: 'file:///tmp',
            }),
        )
    } finally {
        globalThis.fetch = original
    }
})
