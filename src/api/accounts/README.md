# Avatar API

`accountsApi.uploadMyAvatar({ uri, name, type }, { baseUrl, token, signal })` accepts a React Native local file descriptor (or a web Blob). It uploads multipart `file` to `/account/me/avatar` and returns an account containing `avatarId`.

`getAvatarVariant(avatarId, options)` returns the IDs of small/medium/large assets. `downloadAvatar(assetId, options)` reads image bytes with the bearer token. Do not put the token in a URL. Every signed-in active account can read avatars without a subscription. Each avatar is a private variant, visible to all authenticated accounts.

Maximum file size: 20 MiB, static raster images only; the backend validates and resizes. API functions only: mobile profile UI is not yet implemented.

`accountsApi.getMe(options)` reads `/account/me`. `uploadAvatar(id, options, file)` supports the account-ID route; a user can only target their own account. Errors now extend the shared `ApiError` and preserve server codes. See [shared API documentation](../README.md).
