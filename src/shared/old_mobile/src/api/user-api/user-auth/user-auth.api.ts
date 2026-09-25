// import { postJson } from '../../http'
// import { USER_AUTH_PATH } from './user-auth.constants'
// import {
// 	AuthResponse,
// 	CheckResponse,
// 	ConfirmEmailDto,
// 	LoginUserDto,
// 	RegisterUserDto,
// 	ResendCodeDto,
// } from './user-auth.types'
// 
// export const userAuthApi = {
// 	register: (dto: RegisterUserDto) =>
// 		postJson<{ ok: true }>(`${USER_AUTH_PATH}/register`, dto, {
// 			skipAuth: true,
// 		}),
// 
// 	confirm: (dto: ConfirmEmailDto) =>
// 		postJson<AuthResponse>(`${USER_AUTH_PATH}/confirm`, dto, {
// 			skipAuth: true,
// 		}),
// 
// 	resend: (dto: ResendCodeDto) =>
// 		postJson<{ ok: true }>(`${USER_AUTH_PATH}/resend`, dto, {
// 			skipAuth: true,
// 		}),
// 
// 	login: (dto: LoginUserDto) =>
// 		postJson<AuthResponse>(`${USER_AUTH_PATH}/login`, dto, {
// 			skipAuth: true,
// 		}),
// 
// 	check: (dto: { signal?: AbortSignal } = {}) =>
// 		postJson<CheckResponse>(`${USER_AUTH_PATH}/check`, undefined, {
// 			signal: dto.signal,
// 		}),
// }
