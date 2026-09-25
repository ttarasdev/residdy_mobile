import type * as Models from '../models'

export type ConsultationPromocodeEvaluateBody = {
    productType?: 'consultation'
    specialistConsultationId: number
    code: string
}

export type ConsultationPromocodeEvaluateResponse = {
    consultation: Models.SpecialistConsultation
    specialist?: Models.Specialist
    promocode: {
        id: number
        code: string
        type: 'percent' | 'amount'
        value: string
    }
    productType: 'consultation'
    currency: string
    price: string
    discount: string
    finalAmount: string
}
