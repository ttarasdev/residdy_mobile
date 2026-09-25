export const normalizeEmail = (value: string) => value.trim().toLowerCase()
export function validEmail(value: string) {
    return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value))
}
export const validPassword = (value: string) => value.length >= 8 && value.length <= 128
export const validCode = (value: string) => /^\d{6}$/.test(value)
