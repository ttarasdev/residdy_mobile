import { Redirect } from 'expo-router'

// Keep existing links working; both forms now share a single screen.
export default function RegisterFormScreen() {
    return <Redirect href={{ pathname: '/login', params: { mode: 'register' } }} />
}
