/** Local wall-clock input, converted to the API's UTC instant without accepting rollover dates. */
export function parseTaskDate(value: string, now = Date.now()): string | null {
    const match = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(value.trim())
    if (!match) return null
    const [year, month, day, hour, minute] = match.slice(1).map(Number)
    const date = new Date(year, month - 1, day, hour, minute)
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day ||
        date.getHours() !== hour ||
        date.getMinutes() !== minute ||
        date.getTime() <= now
    )
        return null
    return date.toISOString()
}
