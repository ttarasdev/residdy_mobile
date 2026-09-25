import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { nextConsultation, nextReminder, availableDocuments } = loadApi(new URL('../src/components/home/home-content.ts', import.meta.url))
const now = Date.parse('2026-09-25T10:00:00Z')
test('home chooses earliest usable consultation, skipping expired holds and past/cancelled meetings', () => {
    const rows = [
        { id: 1, status: 'paid', startsAt: '2026-09-28T10:00:00Z', endsAt: '2026-09-28T11:00:00Z' },
        { id: 2, status: 'canceled', startsAt: '2026-09-25T11:00:00Z', endsAt: '2026-09-25T12:00:00Z' },
        { id: 3, status: 'awaiting_payment', expiresAt: '2026-09-25T09:59:00Z', startsAt: '2026-09-26T10:00:00Z', endsAt: '2026-09-26T11:00:00Z' },
        { id: 4, status: 'paid', startsAt: '2026-09-25T09:30:00Z', endsAt: '2026-09-25T10:30:00Z' },
    ]
    assert.equal(nextConsultation(rows, now).id, 4)
    assert.equal(rows[0].id, 1)
    assert.equal(nextConsultation(rows, Date.parse('2026-10-01')), undefined)
    assert.equal(nextConsultation([], now), undefined)
})
test('reminders are active and chronological, documents must exist and not be expired', () => {
    assert.equal(nextReminder([
        { id: 1, status: 'active', targetAt: '2026-09-25T09:00:00Z' },
        { id: 2, status: 'cancelled', targetAt: '2026-09-25T11:00:00Z' },
        { id: 3, status: 'active', targetAt: '2026-09-27T12:00:00Z' },
        { id: 4, status: 'active', targetAt: '2026-09-26T12:00:00Z' },
    ], now).id, 4)
    assert.equal(nextReminder([], now), undefined)
    assert.deepEqual(availableDocuments([
        { id: 1 },
        { id: 2, asset: { expiresAt: '2026-09-25T10:00:00Z' } },
        { id: 3, asset: { fileDeletedAt: '2026-09-24' } },
        ...[4,5,6].map(id => ({ id, asset: { expiresAt: null, fileDeletedAt: null } })),
    ], now).map(x => x.id), [4,5])
})
