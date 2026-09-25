import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { searchDestination } = loadApi(new URL('../src/components/search/search-navigation.ts', import.meta.url))
const { searchApi } = loadApi(new URL('../src/api/search/search.api.ts', import.meta.url))
test('search opens exact entities, preselected templates and application sections', () => {
    const expected = { case: '/cases/new?template=7', document_template: '/documents/new?template=7', user_case: '/cases/7', consultation: '/consultations/service?id=7', user_consultation: '/consultations/booking?id=7', blog_post: '/blog/7', partner_company: '/partners/7' }
    for (const [type, route] of Object.entries(expected)) assert.equal(searchDestination({ type, id: 7 }), route)
    assert.equal(searchDestination({ type: 'user_document', id: 7 }), null)
    assert.equal(searchDestination({ type: 'screen', key: 'user_documents' }), '/legalization?section=documents')
    assert.equal(searchDestination({ type: 'screen', key: 'https://example.com' }), null)
})
test('group pagination preserves query, language, authentication and abort signal', async () => {
    const original = globalThis.fetch
    const controller = new AbortController()
    try {
        globalThis.fetch = async (url, init) => {
            const params = new URL(url).searchParams
            assert.equal(params.get('q'), 'карта & побит')
            assert.equal(params.get('lan'), 'UA')
            assert.equal(params.get('type'), 'user_consultation')
            assert.equal(params.get('offset'), '12')
            assert.equal(init.headers.Authorization, 'Bearer search-test')
            assert.equal(init.signal, controller.signal)
            return Response.json({ query: 'карта & побит', lan: 'UA', mode: 'results', groups: [] })
        }
        await searchApi.search({ q: 'карта & побит', lan: 'UA', type: 'user_consultation', offset: 12, limit: 12 }, { baseUrl: 'https://api.example.test', token: 'search-test', signal: controller.signal })
    } finally { globalThis.fetch = original }
})
