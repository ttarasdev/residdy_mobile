import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import useApi from '../../shared/hooks/useApi'
import { searchApi } from '../../api/search/search.api'
import type { SearchType } from '../../api/search/search.types'

export default function useGlobalSearch(text: string, type?: SearchType) {
    const { account, options, lan } = useApi()
    const q = text.trim().slice(0, 120)
    const [debounced, setDebounced] = useState(q)
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(q), 300)
        return () => clearTimeout(timer)
    }, [q])
    const query = useInfiniteQuery({
        queryKey: ['global-search', account?.account.id, lan, debounced, type],
        enabled: !!account,
        initialPageParam: 0,
        queryFn: ({ signal, pageParam }) =>
            searchApi.search(
                {
                    q: debounced,
                    lan,
                    type,
                    limit: type ? 12 : 3,
                    offset: pageParam,
                },
                { ...options, signal },
            ),
        getNextPageParam: (last) => {
            const offset = type
                ? last.groups.find((g) => g.type === type)?.nextOffset
                : null
            return offset != null && offset <= 1000 ? offset : undefined
        },
    })
    const pendingInput = q !== debounced
    const pages = pendingInput
        ? []
        : (query.data?.pages.filter((p) => p.query === q && p.lan === lan) ??
          [])
    const groups = pages.flatMap((p) => p.groups)
    const merged = groups.reduce<typeof groups>((all, group) => {
        const existing = all.find((g) => g.type === group.type)
        if (!existing) all.push({ ...group, items: [...group.items] })
        else {
            const ids = new Set(
                existing.items.map((i) => (i.type === 'screen' ? i.key : i.id)),
            )
            existing.items.push(
                ...group.items.filter(
                    (i) => !ids.has(i.type === 'screen' ? i.key : i.id),
                ),
            )
            existing.hasMore = group.hasMore
            existing.nextOffset = group.nextOffset
        }
        return all
    }, [])
    return {
        ...query,
        groups: merged,
        loading: pendingInput || query.isPending,
        error: pendingInput ? null : query.error,
    }
}
