import type {
    ConsultationBooking,
    GUserDoc,
    UserReminder,
} from '../../api/models'

export function nextConsultation(
    rows: ConsultationBooking[],
    now = Date.now(),
) {
    return rows
        .filter(
            (item) =>
                (item.status === 'paid' ||
                    (item.status === 'awaiting_payment' &&
                        !!item.expiresAt &&
                        Date.parse(item.expiresAt) > now)) &&
                Date.parse(item.endsAt) > now,
        )
        .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))[0]
}
export function nextReminder(rows: UserReminder[], now = Date.now()) {
    return rows
        .filter(
            (item) =>
                item.status === 'active' && Date.parse(item.targetAt) >= now,
        )
        .sort((a, b) => Date.parse(a.targetAt) - Date.parse(b.targetAt))[0]
}
export function availableDocuments(rows: GUserDoc[], now = Date.now()) {
    return rows
        .filter(
            (item) =>
                item.asset &&
                !item.asset.fileDeletedAt &&
                (!item.asset.expiresAt ||
                    Date.parse(item.asset.expiresAt) > now),
        )
        .slice(0, 2)
}
