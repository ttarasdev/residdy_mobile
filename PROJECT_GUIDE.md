# Residdy mobile — guide for subsequent changes

Updated: 2026-09-25. Read this together with AGENTS.md before editing. This describes the current code, not a plan to generate all future features.

## Product and coding conventions

- Expo SDK 57, React Native 0.86, React 19, Expo Router, TanStack Query 5, TypeScript.
- Read exact versioned Expo docs. SDK 57 has different navigation and fetch behavior from older examples.
- Simple composition: base component with readable props, small preset wrappers, domain components composed from those wrappers. Direct imports; do not create barrel files for every folder.
- Routes stay thin. UI and feature behavior live in components/<feature>. API request functions live in api/<resource>. General hooks, guards, providers and utilities live in shared.
- Four locales: pl (default), uk, en, ru. Add the same keys to all JSON files. API language UA corresponds to UI uk. Do not invent field capitalization: case content uses titlePL/titleUA while consultation content uses titlePl/titleUa.
- Use existing Text/TextInput wrappers. Fixed font scaling is an explicit owner preference. Still handle narrow screens, long translations, keyboard and safe areas.
- Manrope regular 400 and semibold 600 are loaded. Avoid assuming uninstalled font weights.
- No promises about future features, internal implementation notes or “coming later” labels in product UI. Put developer notes in documentation.
- Do not seed large datasets or implement adjacent features without need. Never copy the whole old app; shared/old_mobile is reference material.

## Navigation and access

src/app/_layout.tsx owns fonts, i18n, safe area, global blue background, session/query/welcome providers and root Stack.

- (public): intro, welcome and authentication.
- (private): authenticated stack. Profile remains accessible without subscription.
- (private)/(tabs): home, legalization, blog, partners, profile. Only these routes have bottom tabs.
- cases, new documents, instructions and consultation catalog/booking creation have route-level SubscriptionGuard. Own consultation history/details/cancel/reschedule/review and profile/documents remain available without a subscription. Inactive subscription redirects to profile.
- ProfileGuard protects document creation: missing basic data shows CompleteProfileAlert; only “Fill in” navigates to /profile/edit.
- NewDocument rechecks profile on submit and handles PROFILE_INCOMPLETE from the server too.
- DetailScreen is used for nested screens without bottom menu; it owns header/back, keyboard avoidance, scrolling and bottom inset.

Do not put blocking subscription checks around the entire private navigator: remounting it loses navigation state.

## Shared component library

| Folder/component | Purpose |
| --- | --- |
| shared/cards/Card | Base surface: padding, radius, borders, gradient, optional press |
| PaperCard, NavyCard, SlateCard, GlassCard | Existing surface presets; GlassCard supports blur target |
| shared/buttons/Button | Base button with loading, disabled, icons and sizes |
| Light/Dark/Blue/Glow/Dotted/OutlineButton | Visual button presets |
| IconButton, Back/Close/Plus/Next/SearchButton | Shared icon buttons |
| shared/layout/ScreenBackground | One full-screen blue gradient, including safe-area background |
| Screen | Transparent screen spacing and safe-area policy |
| DetailScreen | Scrollable nested page with back header |
| TabScrollView | Native pull-to-refresh; only tabs use it. Pass current queryRoots |
| navigation/TabHeader | Minimal title, global search and notifications action |
| navigation/GlassTabBar | Floating glass navigation with active focus motion |
| segmented-control/GlassSegmentedControl | Reusable glass content switcher |
| feedback/Popup | Modal, blur backdrop, safe area, keyboard handling, Reduce Motion |
| PopupBackground | Root BlurTargetView context for popups |
| MessageCard | Glass or warm warning message with actions; no navigation embedded |
| content/QueryState | Small initial spinner, error popup, empty state. Not a save-progress component |
| content/EmptyState | Shared centered empty-content card |
| content/ContentRow | Reusable content/navigation row with optional public icon |
| content/RichText | Instruction rich-text rendering; light mode for paper surfaces |
| forms/FormCard, FormInput | Popup-style form surface and compact dark fields, built on Card/Input |
| inputs/Input, PasswordInput, CodeInput, Checkbox | Existing interactive form controls |
| loading/Skeleton | Shimmer building blocks for layout-specific initial loading only |
| onboarding/OnboardingPager, OnboardingProgress | Reusable onboarding presentation |
| pagination/PaginationDots | Shared page indicators |
| animation/FadeSwap, Floating | Reusable lightweight motion |
| media/PrivateImage | Authenticated image variant loading with per-account query cache |
| logo/Logo, socials/SocialLinks | Brand and social components |

## Loading and errors

Never append skeleton cards while saving a language or submitting a form. Use the pressed button's loading prop or the selected row's spinner. QueryState shows only a compact initial-loading indicator. Preserve cached content during refetch. Pull-to-refresh uses RefreshControl and awaits active queries from the current tab.

Errors appear in Popup over blurred content, with Retry/Close. Do not insert “failed to load” blocks into a page. Empty success is different from failure: show “You have no …” only after a successful empty response. Cases/documents/consultations render between the small ad slider and large ad. Exception: the consultations section hides the whole my-bookings block when the successful response is empty; its navigation button stays visible.

Skeletons remain available for explicit image/ad initial layouts, not every asynchronous action. Respect reduced motion/transparency.

## Data and API

api/http.ts owns request serialization, bearer auth, typed errors, query params and multipart. No implicit mutation retries. API modules should accept DTO objects and options; hooks/components own TanStack queries, invalidation and navigation.

- Account-dependent query keys include account ID. SessionProvider clears account caches on account changes/logout.
- useApi provides authenticated options and API locale. useProfile and useSubscription share canonical keys.
- Relative public asset URLs MUST pass through publicAssetUrl. Private images use authenticated downloads, never bearer tokens in URLs.
- Expo 57 fetch rejects URI-only multipart parts. upload-file converts a picked File to a named expo-blob Blob; avatar and consultation attachments share it. blob-runtime installs Expo Blob on native; blob-data-uri supports byte-backed and legacy blobs for authenticated images/documents.
- ProfileAvatar: picker → square crop → JPEG conversion → uploadFile → account/me/avatar → invalidate account-me.
- API_URL is local environment configuration. Do not commit secrets or put tokens into logs.

## Features and current boundaries

Auth and four-language first onboarding exist. Cases include creation flow, stage windows, tasks, date selection and instructions. Documents include creation, required-profile check, history and file links. Profile includes basic data, avatar, language, security, legal documents, notifications and subscriptions.

Consultations: components/consultations owns topics (popular/all), WeekSlots, service details, booking form, BookingCard, my-bookings/history, details/payment, reschedule/cancel and reviews. All navigation uses stack pages under consultations; errors continue using the shared popup. Legalization embeds topics and upcoming bookings; its intro button opens consultations/mine.

WeekSlots is reused for topic, service and rescheduling. Each slot renders its own compact dark ConsultationSlotCard, keyed by slot.id; do not merge multiple times into one service card. Topic tiles also use dark NavyCard surfaces. Dates, week boundaries and times use Europe/Warsaw. Public slots start tomorrow, require an active service/category/account and are filtered by consultationCategoryId on the server. Public selection responses omit surname; mobile never displays surname or contact links on specialist cards. Full profile links stay in specialist CRM; service details expose only selected descriptive profile fields.

Booking submits selected current legal version IDs, explicit early-service consent, question, optional PDF/JPEG/PNG File from expo-file-system, and optional promo. Server owns final prices/discounts and slot availability. Booking expiration is 15 minutes. DEV payment uses existing confirm-dev, gated by __DEV__ in UI and server development configuration; real payment provider is not configured. Never claim that DEV confirmation is a real payment. No live booking/payment/email was triggered during implementation verification.

Actions endpoint controls cancellation/rescheduling; server enforces notice and withdrawal deadlines. Rescheduling includes previousSlotId to reject stale edits and preserves original pricing. Booking details poll only while focused. Reviews are moderated by backend and require a completed booking; edit reuses existing review. Mutation success invalidates related queries. Remaining live-device verification requires an authenticated session.

Partners: components/partners contains the paginated catalog, photo/glass PartnerCard for the catalog only, and a separate company detail page. Catalog cards show logo, name and short description without a partner badge or arrow. Details use separate photo, text and contact rows without glass cards. Routes are thin: (tabs)/partners and partners/[id]. Real company fields and authenticated photos come from partner-companies API; only published companies are returned by the server. Contact/social actions only appear when present. Translated descriptions fall back to Polish. The backend currently checks subscription access.

Blog: components/blog owns the category filter, paginated language-specific feed, tall photo cards with a compact blurred footer, and article reader at blog/[id]. Uses existing RichText and authenticated PrivateImage. Cache keys include account, language and category. Category loading uses BlogSkeleton with the same height as the photo cards; the horizontal category ScrollView must have flexGrow: 0 and flexShrink: 0 so it cannot stretch when the feed is empty. Cached posts stay visible during background refetch. Pull-to-refresh is tab-only. Articles are separate records per language; detail routes keep the selected record. TabHeader opens profile/notifications and polls the unread count while focused. Notifications paginate and mark an expanded item read; there are no entity links in the current backend model or system push integration. These are development boundaries, not text to show in the app.

## Subscription development purchase

/profile/subscription → /profile/plans → /profile/purchase. Plans use backend limits and monthly/yearly DEV offers. No invented store prices: current SubscriptionPrice model stores product IDs/intervals, not monetary amounts.

POST /user-subscriptions/me/dev-purchase accepts priceId. Backend requires NODE_ENV=development AND SUBSCRIPTIONS_DEV_ENABLED=true, derives user from authenticated account, rejects non-DEV prices, locks the subscription, activates period, records paymentVerified=false. No real charge, legal acceptance or email is fabricated. No client-only `active=true` override. Production verify-purchase remains separate and unconfigured.

## Verification

Mobile: npm run typecheck; npm run test:api; npx expo export --platform ios --platform android --output-dir /tmp/residdy-export.
Backend: npm run typecheck; npm run build:test; node --test test/mobile-dev-purchase.test.mjs. Existing relevant suites should be rerun for behavior changes.

Use simulator/device for navigation, keyboard, blur, gallery and scroll checks. Exports and mocked tests do not prove native uploads or physical-device rendering.

## Specialist profile translations

SpecialistInfo exposes title/about/specialization/education/servicesSummary with Pl/Ua/En/Ru suffixes. Contact details, experienceYears, languages, certificates and links are shared. Profile display should select the app locale and fall back to Polish when a translation is missing. The specialist CRM has four independently saved, mounted language panels so switching does not discard edits. Legacy unsuffixed fields mirror Polish for old clients. Migration 028 adds nullable fields and copies existing text into Polish only; scripts/migrate-specialist-translations.mjs applies this to the development DB.

Specialist social links use nullable websiteUrl/instagramUrl/facebookUrl/tiktokUrl/linkedinUrl/youtubeUrl/telegramUrl fields, shared across locales. Empty CRM input is normalized to null by the backend; omit missing links from public profiles. Migration 029 backfills old website/socialLinks once and retains those legacy columns as historical data; new UI reads/writes only the explicit URL fields.

Consultation booking cache: seed the newly created booking with the selected offer and its specialist (creation returns no associations). Booking details use staleTime: 0 to fetch authoritative related records immediately. Payment applies the confirmed server response while preserving cached specialist/service data; invalidate related lists in the background, without blocking navigation or payment completion. Cancel any in-flight detail poll before applying the confirmed payment response.

Generated documents: MyDocuments fetches the owned document, then downloads its private asset through the bearer-authenticated API. shared/utils/open-document presents downloaded bytes with the original asset filename and matching MIME/UTI (currently generated documents are DOCX, not PDF) with expo-sharing on native (temporary file removed after dismissal) or a Blob download on web. Never rename DOCX bytes to .pdf; PDF output requires real server conversion. Do not open private/signed API URLs with Linking: the external browser has no app token. ContentRow.loading shows progress only on the selected document.

SwipeActionRow (shared/gestures) reveals a trailing destructive action on a horizontal left swipe; vertical gestures remain available to the scroll view. It is controlled with open/onOpenChange so lists can keep only one row open. Full swipes never delete. MyDocuments uses it instead of a separate delete button under each card, with confirmation, per-row progress and an accessibility delete action.

Global search is implemented in components/search (see its README). SearchResultCard has entity-specific visual variants; reuse base cards rather than full screen-specific cards requiring extra detail queries. SearchImage consumes authenticated medium asset IDs. useGlobalSearch handles debounce, grouping and pagination. search-navigation owns a route allowlist; new-case/new-document routes accept template IDs and still require normal guards/server validation. open-user-document is shared by search and the document list. Backend adds own consultation bookings and removes specialist surnames from search. Current subscription enforcement is unchanged and SUBSCRIPTION_REQUIRED closes the search modal before redirecting to profile.

Home: components/home/HomePage composes existing CaseCard, BookingCard (with specialist avatar), ContentRow, PartnerAds and compact BlogCard. useHomeContent owns focused account-scoped queries; home-content selects usable upcoming bookings/reminders and available documents. Hide empty optional sections; preserve cached content during refresh. Reuse the existing route guards for quick actions. See components/home/README.md for layout and query details.

Session invalidation: http reports authenticated 401 responses with the rejected token through onUnauthorized. SessionProvider invalidates only the matching current session, clears persisted credentials/account queries and shows a localized login notice. Public login failures, 403, 5xx and network failures do not sign the user out. Sign-in waits for pending expiry cleanup; stale requests for a previous token cannot invalidate a new session. Never log tokens.

Owned documents: profile/documents reuses MyDocuments. Backend g-user-docs reads/deletes require authentication and ownership, while creation still requires subscription. Private media allows subscription-free reads for the owner's user_docs and consultation_files; media ownership and retention validation remains mandatory.

Ordering: server lists use stable ID tie-breakers before pagination. User cases: active → completed → archived, then last activity (updatedAt descending). Successful task/date updates touch the parent in the same transaction; stages/status already update it. Migration 031 backfills real recorded task/stage activity and adds an index. Documents/notifications/reviews: createdAt descending; blog retains editorial pinned/popular priority then publishedAt descending; partners alphabetically by companyName. Consultation lists use startsAt; mobile upcoming asc/history desc. Reminders use targetAt ascending. Do not replace stage/task/editorial order with generic date sorting.

Notifications: inbox/archived folder is a server query and part of the TanStack key. SwipeActionRow neutral tone reveals archive/restore; full swipe never acts. Restore sets read. Count excludes archived messages. Avoid changing ordering on read so pagination remains stable.

Promotions: components/announcements mounts once in the private layout. Reuses backend/CRM app-announcements; intervalMinutes controls account+campaign local cooldown. PopupActivity blocks promos while a shared Popup/search is open. See its README; no real payments or system push added.
