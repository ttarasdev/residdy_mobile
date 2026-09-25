/** Public asset paths from the API are relative to its origin, not Metro. */
export function publicAssetUrl(path: string, baseUrl: string): string {
    return new URL(path, baseUrl.endsWith('/') ? baseUrl : baseUrl + '/').href
}
