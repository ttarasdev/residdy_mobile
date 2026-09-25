# Home

Route: `src/app/(private)/(tabs)/home.tsx`, protected by SubscriptionGuard.

- `HomePage.tsx`: composition, navigation, tab refresh, error popup and document opening.
- `HomeSection.tsx`: section heading and optional “All” action.
- `HomeQuickActions.tsx`: case/document/consultation entry points; target routes own their existing guards.
- `useHomeContent.ts`: TanStack queries, scoped by account and enabled while focused.
- `home-content.ts`: pure selection helpers covered by `test/home-content.test.mjs`.

Order: greeting → quick actions → up to two active cases → nearest usable consultation and active future reminder → up to two available documents → small advertising slider → two articles for the selected language. Optional empty sections are hidden.

Reuse CaseCard, BookingCard (including avatar), ContentRow, PartnerAds, BlogCard, TabHeader, TabScrollView, QueryState and Skeleton. BlogCard accepts `compact`; PartnerAds accepts `showBig` (true by default). Do not duplicate their image/authentication or interaction logic.

Consultations share the my-consultations cache. Documents are selected from the latest 12 records. Paid meetings remain visible until their end; expired payment holds, deleted/expired files and past/inactive reminders are excluded. A focused 30-second clock updates time-based selection. Dates use the existing Europe/Warsaw helpers.

Refresh preserves cached content. Initial skeletons only appear before personal content arrives; errors use the shared blurred popup. All new copy lives under homeUi in the four locale files. No backend changes or test content were required.

Checks: `npm run typecheck`, `npm run test:api`, Expo export for iOS and Android. Native appearance and navigation should also be checked in a simulator/device; export alone is not a device test.

Home accents: cyan for cases, lavender for documents, warm amber for consultations/reminders and mint for articles. HomeQuickActions uses the existing Card gradient prop; HomeSection accepts an accent color. Keep these accents local to Home instead of changing shared cards globally.
