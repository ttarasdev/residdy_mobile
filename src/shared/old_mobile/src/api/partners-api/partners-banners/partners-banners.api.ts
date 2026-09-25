// import { getJson, postJson } from '../../http'
// import { PARTNERS_BANNERS_PATH } from './partners-banners.constants'
// import {
// 	AddPartnerBannerImpressionsDto,
// 	PartnerBanner,
// 	PartnerBannerActionResponse,
// 	PartnerBannersResponse,
// 	QueryPartnerBannersDto,
// } from './partners-banners.types'
// 
// export const partnersBannersApi = {
// 	list: (
// 		params: QueryPartnerBannersDto = {},
// 		opts?: { signal?: AbortSignal },
// 	) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([key, value]) => {
// 			if (value !== undefined && value !== null && value !== '') {
// 				search.set(key, String(value))
// 			}
// 		})
// 
// 		const qs = search.toString()
// 		const url = `${PARTNERS_BANNERS_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<PartnerBannersResponse>(url, opts)
// 	},
// 
// 	getRandomBig: (opts?: { signal?: AbortSignal }) => {
// 		return getJson<PartnerBanner | null>(
// 			`${PARTNERS_BANNERS_PATH}/random/big`,
// 			opts,
// 		)
// 	},
// 
// 	getRandomSmall: (opts?: { signal?: AbortSignal }) => {
// 		return getJson<PartnerBanner[]>(
// 			`${PARTNERS_BANNERS_PATH}/random/small`,
// 			opts,
// 		)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<PartnerBanner>(`${PARTNERS_BANNERS_PATH}/${id}`, opts)
// 	},
// 
// 	addImpressions: (dto: AddPartnerBannerImpressionsDto) => {
// 		return postJson<PartnerBannerActionResponse>(
// 			`${PARTNERS_BANNERS_PATH}/impressions`,
// 			dto,
// 		)
// 	},
// 
// 	addClick: (id: number) => {
// 		return postJson<PartnerBanner>(`${PARTNERS_BANNERS_PATH}/${id}/click`)
// 	},
// }
