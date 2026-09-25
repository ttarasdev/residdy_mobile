import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { announcementDue, announcementDestination } = loadApi(new URL('../src/components/announcements/announcement-policy.ts', import.meta.url))
test('promotion interval respects last display, expiry, clock rollback and legacy daily records', () => {
    const now = Date.parse('2026-09-25T12:00:00Z')
    const item = { frequency: 'interval', intervalMinutes: 10, endsAt: '2026-09-26T00:00:00Z' }
    assert.equal(announcementDue(item, null, now), true)
    assert.equal(announcementDue(item, now - 599999, now), false)
    assert.equal(announcementDue(item, now - 600000, now), true)
    assert.equal(announcementDue(item, now + 1, now), false)
    assert.equal(announcementDue({ ...item, endsAt: new Date(now).toISOString() }, null, now), false)
    assert.equal(announcementDue({ ...item, endsAt: 'invalid' }, null, now), false)
    assert.equal(announcementDue({ ...item, frequency: 'once_per_day' }, now - 60_000, now), false)
})
test('promotion destinations use supported routes and reject unsafe external URLs', () => {
    assert.equal(announcementDestination(), null)
    assert.equal(announcementDestination({ type: 'external_url', url: 'javascript:alert(1)' }), null)
    assert.equal(announcementDestination({ type: 'external_url', url: 'https://user:pass@example.com' }), null)
    assert.equal(announcementDestination({ type: 'external_url', url: 'https://example.com/sale' }), 'https://example.com/sale')
    assert.equal(announcementDestination({ type: 'screen', key: 'documents' }), '/profile/documents')
    assert.equal(announcementDestination({ type: 'case', id: 5 }), '/cases/new?template=5')
    assert.equal(announcementDestination({ type: 'blog_post', id: -1 }), null)
})
