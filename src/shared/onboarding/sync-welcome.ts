interface WelcomeUser { onboardingCompletedAt?: string | null }
/** A server date wins; a local completion is uploaded without accepting a client timestamp. */
export async function syncWelcome<T extends WelcomeUser>(localCompleted: boolean, api: {
    getMe: () => Promise<T>
    complete: () => Promise<T>
}): Promise<T> {
    const user = await api.getMe()
    if (!user.onboardingCompletedAt && localCompleted) return api.complete()
    return user
}
