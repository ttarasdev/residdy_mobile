// import * as SecureStore from 'expo-secure-store'
// 
// const KEY = 'access_token'
// 
// let cache: string | null | undefined = undefined
// 
// export async function getAccessToken(): Promise<string | null> {
// 	if (cache !== undefined) return cache
// 	cache = await SecureStore.getItemAsync(KEY)
// 	return cache
// }
// 
// export async function setAccessToken(token: string | null): Promise<void> {
// 	cache = token ?? null
// 
// 	if (!token) {
// 		await SecureStore.deleteItemAsync(KEY)
// 		return
// 	}
// 
// 	await SecureStore.setItemAsync(KEY, token)
// }
// 
// export async function clearAccessToken(): Promise<void> {
// 	await setAccessToken(null)
// }
