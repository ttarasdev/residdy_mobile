// import { Languages } from '@/src/shared/enums/languages.enum'
// import type { BlogCategory } from '../blog-categories/blog-categories.types'
// 
// export enum BlogPostStatus {
// 	DRAFT = 'draft',
// 	SCHEDULED = 'scheduled',
// 	PUBLISHED = 'published',
// 	ARCHIVED = 'archived',
// }
// 
// export interface BlogPost {
// 	id: number
// 	lan: Languages
// 	title: string
// 	contentJson: Record<string, any>
// 	variantId: number
// 	status: BlogPostStatus
// 	isPinned: boolean
// 	isPopular: boolean
// 	scheduledAt: string | null
// 	publishedAt: string | null
// 	categories?: BlogCategory[]
// 	createdAt: string
// 	updatedAt: string
// }
// 
// export interface QueryBlogPostsDto {
// 	categoryId?: number
// 	q?: string
// 	isPinned?: boolean
// 	isPopular?: boolean
// 	status?: BlogPostStatus
// 	page?: number
// 	limit?: number
// 	lan?: Languages
// }
// 
// export interface BlogPostsResponse {
// 	items: BlogPost[]
// 	total: number
// }
