import type * as Models from '../models'

export type SpecialistConsultationsFindPublicQuery = {
    page?: number
    limit?: number
    offset?: number
    consultationCategoryId?: number
    specialistId?: number
    status?: 'draft' | 'active' | 'inactive' | 'archived'
}

export type SpecialistConsultationsFindPublicResponse = {
    rows: Array<Models.SpecialistConsultation>
    total: number
    page: number
    limit: number
    offset: number
}

export type SpecialistConsultationsFindAvailableResponse =
    Models.SpecialistConsultation
