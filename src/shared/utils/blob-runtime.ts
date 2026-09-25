import { Platform } from 'react-native'
import { Blob } from 'expo-blob'

// Expo fetch uses the global constructor for response bodies and multipart parts.
if (Platform.OS !== 'web') {
    Object.defineProperty(globalThis, 'Blob', {
        value: Blob,
        configurable: true,
        writable: true,
    })
}
