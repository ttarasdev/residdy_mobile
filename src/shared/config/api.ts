export function getApiUrl() {
    const value = process.env.EXPO_PUBLIC_API_URL?.trim()
    if (!value) throw new Error('API_NOT_CONFIGURED')
    return value
}

export async function withApi<T>(run: (options: { baseUrl: string; signal: AbortSignal }) => Promise<T>) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
        return await run({ baseUrl: getApiUrl(), signal: controller.signal })
    } finally {
        clearTimeout(timeout)
    }
}
