import { useQuery } from '@tanstack/react-query'
import { userApi } from '../../api/user/user.api'
import useApi from './useApi'
export default function useProfile() {
    const { account, options } = useApi()
    return useQuery({
        queryKey: ['user-me', account?.account.id],
        queryFn: ({ signal }) => userApi.getMe({ ...options, signal }),
        enabled: !!account,
    })
}
