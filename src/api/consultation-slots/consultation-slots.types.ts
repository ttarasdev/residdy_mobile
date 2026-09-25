import type * as Models from '../models'

export type ConsultationSlotsFindPublicQuery = {
    page?: number
    limit?: number
    offset?: number
    consultationCategoryId?: number
    weekStart: string
    specialistId?: number
    specialistConsultationId?: number
}

export type ConsultationSlotsFindPublicResponse = {
    rows: Array<Models.ConsultationSlot>
    total: number
    page: number
    limit: number
    offset: number
    weekStart: string
    weekEnd: string
    days: Array<{
        date: string
        dayKey: string
        slots: Array<Models.ConsultationSlot>
    }>
}
