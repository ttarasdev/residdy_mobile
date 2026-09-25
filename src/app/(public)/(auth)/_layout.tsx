import { Stack } from 'expo-router'
import AuthFlowProvider from '../../../shared/providers/AuthFlowProvider'
import SessionGuard from '../../../shared/guards/SessionGuard'

export default function AuthLayout() {
    return (
        <SessionGuard access="guest">
            <AuthFlowProvider>
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }} />
            </AuthFlowProvider>
        </SessionGuard>
    )
}
