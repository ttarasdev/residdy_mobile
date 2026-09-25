/** Public endpoints do not send a bearer token, even if one is supplied. */
export interface PublicRequestOptions {
    baseUrl: string
    signal?: AbortSignal
    token?: string
}

export interface ApiRequestOptions extends PublicRequestOptions {
    token: string
}

export type UploadFile =
    | Blob
    | { name: string; type: string; bytes: () => Promise<Uint8Array> }
    | { uri: string; name: string; type: string }

export class ApiError extends Error {
    readonly code?: string
    readonly messages?: string[]

    constructor(
        public readonly status: number,
        message: string,
        public readonly details?: unknown,
    ) {
        super(message)
        this.name = 'ApiError'
        if (details && typeof details === 'object') {
            if ('code' in details && typeof details.code === 'string')
                this.code = details.code
            if ('message' in details && Array.isArray(details.message))
                this.messages = details.message.filter(
                    (item): item is string => typeof item === 'string',
                )
        }
    }
}

type RequestConfig = {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    auth?: boolean
    query?: object
    body?: unknown
    response?: 'json' | 'blob'
    errorType?: new (
        status: number,
        message: string,
        details?: unknown,
    ) => ApiError
}

type UnauthorizedListener = (token: string) => void
const unauthorizedListeners = new Set<UnauthorizedListener>()

/** Reports rejected authenticated requests; session ownership stays in the provider. */
export function onUnauthorized(listener: UnauthorizedListener) {
    unauthorizedListeners.add(listener)
    return () => {
        unauthorizedListeners.delete(listener)
    }
}

/** No retries, navigation, token storage or UI side effects. */
export async function request<T>(
    path: string,
    options: PublicRequestOptions,
    config: RequestConfig = {},
): Promise<T> {
    const base = new URL(options.baseUrl)
    if (
        !['http:', 'https:'].includes(base.protocol) ||
        base.username ||
        base.password ||
        base.search ||
        base.hash
    )
        throw new Error(
            'An HTTP(S) API base URL without credentials, query or hash is required',
        )
    if (!path.startsWith('/') || path.startsWith('//') || /[?#]/.test(path))
        throw new Error(
            'An API-relative path without query or hash is required',
        )
    const authenticated = config.auth ?? true
    if (authenticated && !options.token?.trim())
        throw new Error('An account access token is required')

    const url = new URL(options.baseUrl.replace(/\/+$/, '') + path)
    for (const [key, value] of Object.entries(config.query ?? {})) {
        if (value === undefined || value === null) continue
        for (const item of Array.isArray(value) ? value : [value]) {
            if (!['string', 'number', 'boolean'].includes(typeof item))
                throw new Error(`Unsupported query value for ${key}`)
            url.searchParams.append(key, String(item))
        }
    }
    const form =
        typeof FormData !== 'undefined' && config.body instanceof FormData
    const headers: Record<string, string> = {
        Accept: config.response === 'blob' ? '*/*' : 'application/json',
    }
    if (authenticated) headers.Authorization = `Bearer ${options.token}`
    if (config.body !== undefined && !form)
        headers['Content-Type'] = 'application/json'
    const response = await fetch(url.toString(), {
        method: config.method ?? 'GET',
        headers,
        body:
            config.body === undefined
                ? undefined
                : form
                  ? (config.body as FormData)
                  : JSON.stringify(config.body),
        signal: options.signal,
    })
    if (!response.ok) {
        if (response.status === 401 && authenticated && options.token) {
            unauthorizedListeners.forEach((listener) =>
                listener(options.token!),
            )
        }
        let details: unknown
        try {
            details = await response.json()
        } catch {
            /* Error bodies may be empty or non-JSON. */
        }
        let message = `API request failed (${response.status})`
        if (details && typeof details === 'object' && 'message' in details) {
            if (typeof details.message === 'string') message = details.message
            else if (Array.isArray(details.message)) {
                const messages = details.message.filter(
                    (item): item is string => typeof item === 'string',
                )
                if (messages.length) message = messages.join('; ')
            }
        }
        const ErrorType = config.errorType ?? ApiError
        throw new ErrorType(response.status, message, details)
    }
    if (response.status === 204 || response.status === 205)
        return undefined as T
    if (config.response === 'blob') return (await response.blob()) as T
    // Invalid success JSON is a protocol error, not an empty successful result.
    return (await response.json()) as T
}

export function pathSegment(value: string | number): string {
    if (typeof value === 'number') {
        if (!Number.isSafeInteger(value) || value < 1)
            throw new Error('A positive ID is required')
    } else if (
        !value.trim() ||
        value === '.' ||
        value === '..' ||
        /[\\/]/.test(value)
    ) {
        throw new Error('A nonempty path segment without slashes is required')
    }
    return encodeURIComponent(String(value))
}

export function pathSegments(values: string[]): string {
    if (!values.length) throw new Error('A nonempty file path is required')
    return values.map(pathSegment).join('/')
}

/** Arrays use repeated fields, as expected by the booking DTO's multipart parser. */
export function multipart(fields?: object, file?: UploadFile): FormData {
    const form = new FormData()
    for (const [key, value] of Object.entries(fields ?? {})) {
        if (value === undefined || value === null) continue
        for (const item of Array.isArray(value) ? value : [value])
            form.append(key, String(item))
    }
    if (file) {
        if (typeof Blob !== 'undefined' && file instanceof Blob)
            form.append(
                'file',
                file,
                'name' in file && typeof file.name === 'string'
                    ? file.name
                    : 'upload',
            )
        else form.append('file', file as unknown as Blob)
    }
    return form
}
