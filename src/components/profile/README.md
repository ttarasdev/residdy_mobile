# Profile

`Profile.tsx` follows Figma `Profil / Konto` (282:5699): centered identity, a light edit row, grouped navigation, compact footer. `ProfileRow.tsx` is the common row with an icon and badge or chevron. Cards, images, inputs and headers reuse the shared library.

- `EditProfile.tsx`: personal details required for document generation.
- `Language.tsx`: four languages, saved through API and local i18n.
- `Security.tsx`: account security menu, email/password confirmation flows and account deletion.
- `Subscription.tsx`: current plan and validity; purchases are not connected yet.
- `Notifications.tsx`: server notification list.
- `Legal.tsx`: links to account legal documents.

Routes live in `src/app/(private)/profile/`; the profile tab is a thin export. Consultations are intentionally omitted pending the updated requirements.

`shared/guards/SubscriptionGuard.tsx` protects legalization and the cases/documents/instructions route groups. An inactive subscription redirects to `/profile`; protected page contents do not render. The shared subscription query refreshes on screen focus. A server `SUBSCRIPTION_REQUIRED` response also redirects instead of showing a paywall placeholder. Profile, editing and security remain accessible without a subscription.

Profile links to consultation history and profile/documents without SubscriptionGuard. Document creation remains protected. Notifications use a paginated list, expand on tap and mark unread items read through the API. Header unread count shares an account-scoped cache. Push and entity deep links are not implemented.
