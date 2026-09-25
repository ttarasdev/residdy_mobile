import type { ApiRequestOptions } from '../../api/http'
import { gUserDocsApi } from '../../api/g-user-docs/g-user-docs.api'
import { privateAssetsApi } from '../../api/private-assets/private-assets.api'
import { openDocument } from './open-document'
export async function openUserDocument(id: number, options: ApiRequestOptions) {
    const doc = await gUserDocsApi.findOne(id, options)
    const [asset, blob] = await Promise.all([
        privateAssetsApi.getById(doc.assetId, options),
        privateAssetsApi.download(doc.assetId, options),
    ])
    await openDocument(blob, asset.originalName)
}
