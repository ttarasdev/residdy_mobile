import AnnouncementPopup from '../../components/announcements/AnnouncementPopup'
import { Stack } from 'expo-router'
import SessionGuard from '../../shared/guards/SessionGuard'

export default function PrivateLayout() {
    return (
        <SessionGuard access="private">
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'transparent' },
                }}
            />
            <AnnouncementPopup />
        </SessionGuard>
    )
}
