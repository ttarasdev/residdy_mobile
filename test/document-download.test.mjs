import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { gUserDocsApi } = loadApi(new URL('../src/api/g-user-docs/g-user-docs.api.ts', import.meta.url))
const { privateAssetsApi } = loadApi(new URL('../src/api/private-assets/private-assets.api.ts', import.meta.url))

test('generated PDF metadata and bytes both use bearer authentication', async () => {
    const original = globalThis.fetch
    const calls = []
    try {
        globalThis.fetch = async (url, init) => {
            calls.push(new URL(url).pathname)
            assert.equal(init.headers.Authorization, 'Bearer document-test')
            assert.equal(new URL(url).search, '')
            return calls.length === 1
                ? Response.json({ id: 7, assetId: 12 })
                : new Response('%PDF-1.4', { headers: { 'Content-Type': 'application/pdf' } })
        }
        const options = { baseUrl: 'https://api.example.test', token: 'document-test' }
        const doc = await gUserDocsApi.findOne(7, options)
        const pdf = await privateAssetsApi.download(doc.assetId, options)
        assert.equal(await pdf.text(), '%PDF-1.4')
        assert.deepEqual(calls, ['/g-user-docs/7', '/private-assets/12/file'])
    } finally {
        globalThis.fetch = original
    }
})
