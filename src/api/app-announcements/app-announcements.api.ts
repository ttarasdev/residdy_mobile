import { ApiError, request } from '../http'
import type {
    ActiveAppAnnouncementResponse,
    AnnouncementRequestOptions,
} from './app-announcements.types'

export class AnnouncementApiError extends ApiError {
    constructor(status: number, message: string, details?: unknown) {
        super(status, message, details)
        this.name = 'AnnouncementApiError'
    }
}

export const appAnnouncementsApi = {
    /** GET /app-announcements/active. Available without an active subscription. */
    async getActive(
        options: AnnouncementRequestOptions,
    ): Promise<ActiveAppAnnouncementResponse> {
        return request('/app-announcements/active', options, {
            query: { lan: options.lan },
            errorType: AnnouncementApiError,
        })
    },
}
