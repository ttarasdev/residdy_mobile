import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadApi } from './load-api.mjs'
const { parseTaskDate } = loadApi('src/components/cases/task-date.ts')
test('task dates reject rollover, invalid time and past instants', () => {
 const now = new Date(2026, 0, 1).getTime()
 for (const value of ['2026-02-30 12:00', '2026-13-01 12:00', '2026-10-01 24:00', '2026-10-01 12:60', '2025-12-31 12:00', '2026-10-01']) assert.equal(parseTaskDate(value, now), null)
})
test('task dates preserve local wall time when converting to UTC', () => {
 const expected = new Date(2026, 9, 1, 12, 30)
 assert.equal(parseTaskDate('2026-10-01 12:30', new Date(2026, 0, 1).getTime()), expected.toISOString())
 assert.equal(parseTaskDate('2026-10-01 12:30', expected.getTime()), null)
})
