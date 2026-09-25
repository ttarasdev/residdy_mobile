/** Supports Expo Blob and legacy React Native blobs without assuming FileReader compatibility. */
export async function blobDataUri(blob: Blob): Promise<string> {
    if (typeof blob.arrayBuffer === 'function') {
        const bytes = new Uint8Array(await blob.arrayBuffer())
        let binary = ''
        for (let offset = 0; offset < bytes.length; offset += 8192) {
            binary += String.fromCharCode(
                ...bytes.subarray(offset, offset + 8192),
            )
        }
        return `data:${blob.type || 'application/octet-stream'};base64,${btoa(binary)}`
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () =>
            reject(reader.error ?? new Error('Cannot read file'))
        reader.readAsDataURL(blob)
    })
}
