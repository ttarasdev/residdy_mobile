# Global search

Opened from TabHeader in the four content tabs. Uses the existing full-screen blue shell, rounded Input/Close, SearchLoading shimmer and shared error popup. Four UI languages; Polish default.

- GlobalSearchModal: input, quick actions, group navigation, file-opening progress. Closes before navigating to a result; closes and redirects to profile on SUBSCRIPTION_REQUIRED.
- useGlobalSearch: TanStack infinite query, 300 ms debounce, account/language/query/type cache keys, AbortSignal, grouped previews of 3 and group pages of 12. Hides results immediately when typed query differs from the debounced query. Deduplicates pages by entity identity.
- SearchResults: group headers, cards, Show all.
- SearchResultCard: photo with gradient for blog, photo and description for companies, icon tiles for cases/documents, SpecialistAvatar from the account avatar variant plus date/status for booked consultations, duration/price for offers, restrained application shortcuts.
- SearchImage: authenticated asset bytes, account-scoped image cache. Never opens protected media URLs externally.
- search-navigation: explicit type/key-to-route allowlist. Templates open preselected forms; user documents use shared/utils/open-user-document (also used by MyDocuments).

References: Figma 03 · Wyszukiwanie (288:19812), plus user's rounded dark-card reference adapted to Residdy blue. Reuse existing Card, Input, buttons, typography and Skeleton components; no copied design-generated code.

Backend /search now includes user_consultation, omits specialist surname, filters inactive consultation categories/accounts, includes template icons and uses medium thumbnails (company main photo with logo fallback). Authentication and current subscription policy remain enforced, matching detail endpoints. Search is literal substring matching, not fuzzy search or article-body search.

Validation: real development database read-only queries in PL/UA/EN/RU; backend SQL/HTTP tests; mobile route/API tests; iOS/Android export. iOS simulator verified real grouped results and direct article/document-form navigation. Never create bookings/documents or submit payment just to test search.
