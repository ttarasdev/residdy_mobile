// export enum UserReminderStatus {
// 	ACTIVE = 'active',
// 	CANCELLED = 'cancelled',
// }
// 
// export interface UserReminder {
// 	id: number
// 	userId: number
// 	userTaskId: number | null
// 	topic: string
// 	text: string
// 	targetAt: string
// 	sendInApp: boolean
// 	sendEmail: boolean
// 	status: UserReminderStatus
// 	createdByManagerId: number | null
// 	createdAt?: string
// 	updatedAt?: string
// }
// 
// export interface QueryUserRemindersDto {
// 	status?: UserReminderStatus
// 	limit?: number
// 	offset?: number
// }
// 
// export interface UserRemindersResponse {
// 	rows: UserReminder[]
// 	count: number
// }
