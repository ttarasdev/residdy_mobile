import { blobDataUri } from '../../shared/utils/blob-data-uri'
import { Image, type ImageStyle, type StyleProp } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { privateAssetsApi } from '../../api/private-assets/private-assets.api'
import useApi from '../../shared/hooks/useApi'

export default function SearchImage({
    assetId,
    style,
    contain = false,
}: {
    assetId?: number
    style: StyleProp<ImageStyle>
    contain?: boolean
}) {
    const { account, options } = useApi()
    const query = useQuery({
        queryKey: ['private-asset-image', account?.account.id, assetId],
        enabled: !!assetId && !!account,
        queryFn: async ({ signal }) => {
            const blob = await privateAssetsApi.download(assetId!, {
                ...options,
                signal,
            })
            return blobDataUri(blob)
        },
        staleTime: 300_000,
    })
    return query.data ? (
        <Image
            source={{ uri: query.data }}
            style={style}
            resizeMode={contain ? 'contain' : 'cover'}
        />
    ) : null
}
