import type * as Models from '../models'

export type ConsultationBookingsCreateBody = {
    legalVersionIds: Array<number>
    acceptEarlyService?: boolean
    consultationSlotId: number
    userText: string
    promocode?: string
}

export type ConsultationBookingsCreateResponse = Models.ConsultationBooking

export type ConsultationBookingsFindMyQuery = {
    page?: number
    limit?: number
    offset?: number
    userId?: number
    specialistId?: number
    status?:
        | 'awaiting_payment'
        | 'paid'
        | 'canceled'
        | 'completed'
        | 'no_show'
        | 'refunded'
}

export type ConsultationBookingsFindMyResponse = {
    rows: Array<Models.ConsultationBooking>
    total: number
    page: number
    limit: number
    offset: number
}

export type ConsultationBookingsFindMyOneResponse = Models.ConsultationBooking

export type ConsultationBookingsActionsResponse = {
    canCancel: boolean
    canReschedule: boolean
    withdrawalUntil?: string | null
    refundStatus: 'none' | 'pending' | 'succeeded' | 'failed'
    meetingStatus: 'none' | 'pending' | 'ready' | 'canceled' | 'failed'
}

export type ConsultationBookingsRescheduleSlotsQuery = {
    page?: number
    limit?: number
    offset?: number
    weekStart: string
    specialistId?: number
    specialistConsultationId?: number
}

export type ConsultationBookingsRescheduleSlotsResponse = {
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

export type ConsultationBookingsRescheduleBody = {
    acceptEarlyService?: boolean
    consultationSlotId: number
    previousSlotId: number
}

export type ConsultationBookingsRescheduleResponse = Models.ConsultationBooking

export type ConsultationBookingsProcessDevResponse = Models.ConsultationBooking

export type ConsultationBookingsCancelResponse = Models.ConsultationBooking

export type ConsultationBookingsConfirmDevResponse = Models.ConsultationBooking

export type ConsultationBookingsDownloadUserRequestResponse = Blob
