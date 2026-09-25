import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { blobDataUri } = loadApi(new URL('../src/shared/utils/blob-data-uri.ts', import.meta.url))
test('binary image and document bytes survive conversion without native FileReader', async () => {
    const bytes = Uint8Array.from({ length: 24001 }, (_, i) => i % 256)
    const result = await blobDataUri(new Blob([bytes], { type: 'image/png' }))
    assert.ok(result.startsWith('data:image/png;base64,'))
    assert.deepEqual(Buffer.from(result.split(',')[1], 'base64'), Buffer.from(bytes))
})
