import type * as Models from '../models'

/** Public projection returned by SpecialistsService.getProfile. */
export type SpecialistsGetByIdResponse = Pick<
    Models.Specialist,
    'id' | 'name' | 'surname' | 'location' | 'verified' | 'rating'
> & {
    account: Pick<Models.Account, 'avatarId'>
    info?: Omit<
        Models.SpecialistInfo,
        'id' | 'specialistId' | 'specialist' | 'createdAt' | 'updatedAt'
    > | null
}
