import { Blob } from 'expo-blob'
import { File } from 'expo-file-system'

/** Expo fetch accepts a byte-backed blob; URI-only multipart parts are unsupported. */
export async function uploadFile(uri: string, name: string, type: string) {
    const blob = new Blob([await new File(uri).bytes()], { type })
    return Object.assign(blob, { name })
}
