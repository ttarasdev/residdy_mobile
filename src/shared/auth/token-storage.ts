import * as SecureStore from 'expo-secure-store'

// Same key as the previous mobile app. Any restored token is verified by the new backend.
const TOKEN_KEY = 'access_token'

export const readToken = () => SecureStore.getItemAsync(TOKEN_KEY)
export const saveToken = (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token)
export const clearToken = () => SecureStore.deleteItemAsync(TOKEN_KEY)
