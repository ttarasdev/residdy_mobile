// import { getJson } from '../../http'
// import { BLOG_POSTS_PATH } from './blog-posts.constants'
// import {
// 	BlogPost,
// 	BlogPostsResponse,
// 	QueryBlogPostsDto,
// } from './blog-posts.types'
// 
// export const blogPostsApi = {
// 	list: (
// 		params: QueryBlogPostsDto = {},
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
// 		const url = `${BLOG_POSTS_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<BlogPostsResponse>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<BlogPost>(`${BLOG_POSTS_PATH}/${id}`, opts)
// 	},
// }
