import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'

const { accountsApi } = loadApi(
    new URL('../src/api/accounts/accounts.api.ts', import.meta.url),
)

test('mobile avatar uploads only file with bearer auth and reads variants and image bytes', async () => {
    const original = globalThis.fetch
    const options = {
        baseUrl: 'https://api.example.test',
        token: 'token',
        signal: new AbortController().signal,
    }
    try {
        globalThis.fetch = async (url, init) => {
            assert.equal(url, 'https://api.example.test/account/me/avatar')
            assert.equal(init.method, 'POST')
            assert.equal(init.headers.Authorization, 'Bearer token')
            assert.equal(init.signal, options.signal)
            assert.equal(init.headers['Content-Type'], undefined)
            assert.deepEqual([...init.body.keys()], ['file'])
            return Response.json({ id: 3, avatarId: 8 })
        }
        assert.equal(
            (await accountsApi.uploadMyAvatar(new Blob(['image']), options))
                .avatarId,
            8,
        )
        globalThis.fetch = async (url) => {
            assert.equal(url, 'https://api.example.test/private-variants/8')
            return Response.json({ id: 8, smallAssetId: 9 })
        }
        assert.equal(
            (await accountsApi.getAvatarVariant(8, options)).smallAssetId,
            9,
        )
        globalThis.fetch = async (url) => {
            assert.equal(url, 'https://api.example.test/private-assets/9/file')
            return new Response('image', {
                headers: { 'Content-Type': 'image/webp' },
            })
        }
        assert.equal(
            (await accountsApi.downloadAvatar(9, options)).type,
            'image/webp',
        )
        globalThis.fetch = async () => new Response('', { status: 403 })
        await assert.rejects(
            accountsApi.uploadMyAvatar(new Blob(['image']), options),
            { status: 403 },
        )
        await assert.rejects(
            accountsApi.getAvatarVariant(-1, options),
            /positive ID/,
        )
    } finally {
        globalThis.fetch = original
    }
})

test('Expo 57 multipart encodes file bytes and rejects legacy URI-only parts', async () => {
    const { convertFormDataAsync } = loadApi(new URL('../node_modules/expo/src/winter/fetch/convertFormData.ts', import.meta.url))
    const { installFormDataPatch } = loadApi(new URL('../node_modules/expo/src/winter/FormData.ts', import.meta.url))
    const { multipart } = loadApi(new URL('../src/api/http.ts', import.meta.url))
    class NativeFormData { constructor() { this._parts = [] } }
    const original = globalThis.FormData
    globalThis.FormData = installFormDataPatch(NativeFormData)
    try {
        // File from expo-file-system exposes bytes(), name and type without extending Blob.
        const file = { name: 'avatar.jpg', type: 'image/jpeg', uri: 'file:///avatar.jpg', bytes: async () => new Uint8Array([65, 66, 67]) }
        const { body } = await convertFormDataAsync(multipart(undefined, file), 'test-boundary')
        const text = new TextDecoder().decode(body)
        assert.match(text, /filename="avatar.jpg"/)
        assert.match(text, /content-type: image\/jpeg/)
        assert.match(text, /ABC/)
        await assert.rejects(convertFormDataAsync(multipart(undefined, { uri: file.uri, name: file.name, type: file.type })), /Unsupported FormDataPart implementation/)
    } finally { globalThis.FormData = original }
})

test('Expo multipart converter preserves byte-backed file content, filename and MIME', async () => {
    const { convertFormDataAsync } = loadApi(new URL('../node_modules/expo/src/winter/fetch/convertFormData.ts', import.meta.url))
    const bytes = Uint8Array.of(0xff, 0xd8, 0, 12, 0xff, 0xd9)
    const file = { name: 'avatar.jpg', type: 'image/jpeg', bytes: async () => bytes }
    const result = await convertFormDataAsync({ entries: () => [['file', file], ['note', 'hello']] }, 'boundary')
    const body = Buffer.from(result.body)
    assert.ok(body.includes(Buffer.from(bytes)))
    assert.match(body.toString('latin1'), /filename="avatar.jpg"/)
    assert.match(body.toString('latin1'), /content-type: image\/jpeg/)
    await assert.rejects(convertFormDataAsync({ entries: () => [['file', { uri: 'file:///avatar.jpg' }]] }), /Unsupported FormDataPart/)
})
