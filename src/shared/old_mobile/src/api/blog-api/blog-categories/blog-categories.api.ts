// import { getJson } from '../../http'
// import { BLOG_CATEGORIES_PATH } from './blog-categories.constants'
// import {
// 	BlogCategoriesResponse,
// 	BlogCategory,
// 	QueryBlogCategoriesDto,
// } from './blog-categories.types'
// 
// export const blogCategoriesApi = {
// 	list: (
// 		params: QueryBlogCategoriesDto = {},
// 		opts?: { signal?: AbortSignal },
// 	) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([key, value]) => {
// 			if (value !== undefined && value !== null) {
// 				search.set(key, String(value))
// 			}
// 		})
// 
// 		const qs = search.toString()
// 		const url = `${BLOG_CATEGORIES_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<BlogCategoriesResponse>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<BlogCategory>(`${BLOG_CATEGORIES_PATH}/${id}`, opts)
// 	},
// }
