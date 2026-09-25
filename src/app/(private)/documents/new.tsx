import NewDocument from '../../../components/documents/NewDocument'
import ProfileGuard from '../../../shared/guards/ProfileGuard'
export default function Page() {
    return (
        <ProfileGuard>
            <NewDocument />
        </ProfileGuard>
    )
}
