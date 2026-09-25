// export enum UserNotificationStatus {
// 	UNREAD = 'unread',
// 	READ = 'read',
// 	ARCHIVED = 'archived',
// }
// 
// export interface UserNotification {
// 	id: number
// 	userId: number
// 	subject: string
// 	text: string
// 	status: UserNotificationStatus
// 	readAt: string | null
// 	createdAt?: string
// 	updatedAt?: string
// }
// 
// export interface QueryUserNotificationsDto {
// 	limit?: number
// 	offset?: number
// }
// 
// export interface UserNotificationsResponse {
// 	rows: UserNotification[]
// 	count: number
// 	unread: number
// }
// 
// export interface UserNotificationsUnreadCountResponse {
// 	unread: number
// }
// 
// export interface ChangeUserNotificationStatusDto {
// 	status: UserNotificationStatus
// }
