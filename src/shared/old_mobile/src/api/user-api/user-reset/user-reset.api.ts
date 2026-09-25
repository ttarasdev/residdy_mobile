// import { postJson } from '../../http'
// import { USER_RESET_PATH } from './user-reset.constants'
// import {
// 	ConfirmUserResetDto,
// 	OkResponse,
// 	RequestUserResetDto,
// } from './user-reset.types'
// 
// export const userResetApi = {
// 	request: (dto: RequestUserResetDto) =>
// 		postJson<OkResponse>(`${USER_RESET_PATH}/request`, dto, {
// 			skipAuth: true,
// 		}),
// 
// 	confirm: (dto: ConfirmUserResetDto) =>
// 		postJson<OkResponse>(`${USER_RESET_PATH}/confirm`, dto, {
// 			skipAuth: true,
// 		}),
// }
