/** Device introduction, independent of account/profile completion. */
export const WELCOME_STORAGE_KEY = 'residdy.welcome.v1'
interface Storage {
    getItem: (key: string) => Promise<string | null>
    setItem: (key: string, value: string) => Promise<unknown>
}
export async function readWelcomeCompleted(storage: Storage) {
    try { return await storage.getItem(WELCOME_STORAGE_KEY) === 'completed' }
    catch { return false }
}
export async function saveWelcomeCompleted(storage: Storage) {
    await storage.setItem(WELCOME_STORAGE_KEY, 'completed')
}
