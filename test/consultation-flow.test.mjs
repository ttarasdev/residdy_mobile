import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { weekStart, addDays, warsawDay, timeLabel, allPages, localized } = loadApi(new URL('../src/components/consultations/consultation-content.ts', import.meta.url))
const { consultationSlotsApi } = loadApi(new URL('../src/api/consultation-slots/consultation-slots.api.ts', import.meta.url))
const { consultationBookingsApi } = loadApi(new URL('../src/api/consultation-bookings/consultation-bookings.api.ts', import.meta.url))
test('weeks and Warsaw dates do not drift over DST or year boundaries', () => {
    assert.equal(weekStart('2026-09-27'), '2026-09-21')
    assert.equal(weekStart('2027-01-01'), '2026-12-28')
    assert.equal(addDays('2026-03-28', 2), '2026-03-30')
    assert.equal(warsawDay(new Date('2026-09-25T23:30:00Z')), '2026-09-26')
    assert.equal(timeLabel('2026-09-28T08:00:00Z', 'pl'), '10:00')
})
test('paginated slot loading includes later days and localized text falls back to Polish', async () => {
    const offsets = []
    const result = await allPages(async offset => { offsets.push(offset); return { rows: offset === 0 ? [1, 2] : [3], total: 3 } })
    assert.deepEqual(result, [1, 2, 3]); assert.deepEqual(offsets, [0, 2])
    assert.equal(localized({ titleUa: 'Тема', titlePl: 'Temat' }, 'title', 'UA'), 'Тема')
    assert.equal(localized({ titlePl: 'Temat' }, 'title', 'EN'), 'Temat')
})
test('topic filter reaches server and reschedule submits original slot against stale updates', async () => {
    const original = globalThis.fetch
    const options = { baseUrl: 'https://api.example.test', token: 'test' }
    try {
        globalThis.fetch = async (url, init) => {
            if (init.method === 'GET') {
                assert.equal(new URL(url).searchParams.get('consultationCategoryId'), '11')
            } else {
                assert.equal(init.method, 'PATCH')
                assert.deepEqual(JSON.parse(init.body), { consultationSlotId: 7, previousSlotId: 4, acceptEarlyService: false })
            }
            return Response.json({})
        }
        await consultationSlotsApi.findPublic({ weekStart: '2026-09-28', consultationCategoryId: 11 }, options)
        await consultationBookingsApi.reschedule(1, { consultationSlotId: 7, previousSlotId: 4, acceptEarlyService: false }, options)
    } finally { globalThis.fetch = original }
})
