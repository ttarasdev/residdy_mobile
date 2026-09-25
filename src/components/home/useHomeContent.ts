import { useQuery } from '@tanstack/react-query'
import { useIsFocused } from 'expo-router'
import useApi from '../../shared/hooks/useApi'
import useProfile from '../../shared/hooks/useProfile'
import { userCasesApi } from '../../api/user-cases/user-cases.api'
import { consultationBookingsApi } from '../../api/consultation-bookings/consultation-bookings.api'
import { userRemindersApi } from '../../api/user-reminders/user-reminders.api'
import { gUserDocsApi } from '../../api/g-user-docs/g-user-docs.api'
import { blogPostsApi } from '../../api/blog-posts/blog-posts.api'
import { allPages } from '../consultations/consultation-content'

export default function useHomeContent() {
    const { account, options, lan } = useApi()
    const focused = useIsFocused()
    const enabled = !!account && focused
    const profile = useProfile()
    const cases = useQuery({
        queryKey: ['my-cases', account?.account.id, 'home'],
        enabled,
        queryFn: ({ signal }) =>
            userCasesApi.getAll(
                { status: 'active', limit: 2 },
                { ...options, signal },
            ),
    })
    const consultations = useQuery({
        queryKey: ['my-consultations', account?.account.id],
        enabled,
        queryFn: ({ signal }) =>
            allPages((offset) =>
                consultationBookingsApi.findMy(
                    { offset, limit: 100 },
                    { ...options, signal },
                ),
            ),
    })
    const reminders = useQuery({
        queryKey: ['user-reminders', account?.account.id],
        enabled,
        queryFn: ({ signal }) =>
            allPages((offset) =>
                userRemindersApi.getMy(
                    { status: 'active', offset, limit: 100 },
                    { ...options, signal },
                ),
            ),
    })
    const documents = useQuery({
        queryKey: ['my-documents', account?.account.id, 'home'],
        enabled,
        queryFn: ({ signal }) =>
            gUserDocsApi.findAll({ limit: 12 }, { ...options, signal }),
    })
    const posts = useQuery({
        queryKey: ['blog', account?.account.id, 'home', lan],
        enabled,
        queryFn: ({ signal }) =>
            blogPostsApi.findAll(
                { lan, status: 'published', limit: 2 },
                { ...options, signal },
            ),
    })
    return { profile, cases, consultations, reminders, documents, posts }
}
