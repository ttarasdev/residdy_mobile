import type { User } from '../../api/models'
export function isProfileComplete(user?: User) {
    return (
        !!user &&
        [user.name, user.surname, user.phone, user.location, user.lan].every(
            (value) => typeof value === 'string' && value.trim().length > 0,
        )
    )
}
export function localizedTitle(
    item: {
        titlePL: string
        titleUA: string
        titleEN: string
        titleRU: string
    },
    lan: string,
) {
    return item[`title${lan}` as 'titlePL'] || item.titlePL
}
