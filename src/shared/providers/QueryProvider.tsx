import { useEffect, useState, type ReactNode } from 'react'
import { AppState, Platform } from 'react-native'
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function QueryProvider({ children }: { children: ReactNode }) {
    const [client] = useState(() => new QueryClient({
        defaultOptions: {
            queries: { staleTime: 60000, retry: false },
            // Never retry submissions automatically or keep passwords in an inactive mutation cache.
            mutations: { retry: false, gcTime: 0, networkMode: 'always' },
        },
    }))
    useEffect(() => {
        if (Platform.OS === 'web') return
        const listener = AppState.addEventListener('change', (state) => focusManager.setFocused(state === 'active'))
        return () => listener.remove()
    }, [])
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
