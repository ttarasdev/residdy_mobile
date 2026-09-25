import { blobDataUri } from './blob-data-uri'
import { Platform } from 'react-native'
import { File, Paths } from 'expo-file-system'
import * as Sharing from 'expo-sharing'

/** Present downloaded bytes; never expose authenticated API URLs to another app. */
export async function openDocument(blob: Blob, fileName: string) {
    const isDocx = fileName.toLowerCase().endsWith('.docx')
    const mimeType = isDocx
        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        : 'application/pdf'
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
    if (Platform.OS === 'web') {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = safeName
        document.body.appendChild(link)
        link.click()
        link.remove()
        setTimeout(() => URL.revokeObjectURL(url), 60_000)
        return
    }
    if (!(await Sharing.isAvailableAsync()))
        throw new Error('File sharing unavailable')
    const base64 = (await blobDataUri(blob)).split(',')[1]
    const file = new File(Paths.cache, `${Date.now()}-${safeName}`)
    try {
        file.write(base64, { encoding: 'base64' })
        await Sharing.shareAsync(file.uri, {
            mimeType,
            UTI: isDocx
                ? 'org.openxmlformats.wordprocessingml.document'
                : 'com.adobe.pdf',
        })
    } finally {
        if (file.exists) file.delete()
    }
}
