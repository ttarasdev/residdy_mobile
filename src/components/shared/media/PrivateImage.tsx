import { blobDataUri } from '../../../shared/utils/blob-data-uri'
import { Image, type ImageProps } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { contentApi } from '../../../api/content/content.api'
import { getApiUrl } from '../../../shared/config/api'
import { useSession } from '../../../shared/providers/SessionProvider'

/** Authenticated media, cached per account. Bearer tokens never go into image URLs. */
export default function PrivateImage({ variantId, size = 'medium', ...props }: Omit<ImageProps, 'source'> & {
    variantId?: number | null
    size?: 'small' | 'medium' | 'large'
}) {
    const { session } = useSession()
    const account = session.status === 'authenticated' ? session : null
    const query = useQuery({
        queryKey: ['private-image', account?.account.id, variantId, size],
        enabled: !!account && !!variantId,
        queryFn: async ({ signal }) => {
            const options = { baseUrl: getApiUrl(), token: account!.token, signal }
            const variant = await contentApi.getVariant(variantId!, options)
            const blob = await contentApi.downloadImage(variant[`${size}AssetId`], options)
            return blobDataUri(blob)
        },
        staleTime: 5 * 60_000,
        retry: 1,
    })
    if (!query.data) return null
    return <Image {...props} source={{ uri: query.data }} />
}
