# Promotional popup

`AnnouncementPopup` is mounted once in the private layout. Uses existing `app-announcements/active`, `Popup`, `CloseButton` and the global blue/blur surface. It is eligible only on the five tab pages; never in onboarding, forms, booking details, search or another Popup. PopupActivity coordinates shared modals. Requests and timers pause in the background. Fetch/image/storage errors suppress optional promotions rather than blocking the app.

Backend chooses the active campaign and image for PL/UA/EN/RU. `intervalMinutes` defaults to 1440 and accepts 1–43200; 10 means ten minutes. Start is inclusive, end exclusive. Existing campaigns preserve their configured interval when an older manager client omits the field. Only one enabled overlapping schedule is allowed.

Last display timestamp is persisted with account ID + announcement ID in AsyncStorage. Cooldown uses elapsed time, including background time; it survives restarts and language changes. Reinstall/clearing storage or another device can reset it. Invalid/future timestamps suppress redisplay. Polling and a two-second quiet period mean the popup appears on the next eligible check, not at an exact wall-clock second. Closing the popup does not reset its cooldown. Time is recorded immediately before presentation after image preload.

Images use contain sizing, preserve their full aspect ratio and fit the available height. Recommended portrait 3:4. Close remains available independently of the image. Optional click targets use an explicit route allowlist or credential-free HTTPS. Entity routes keep their own permissions. New-case targets are templates, not other users' cases.

CRM: Komunikacja → Reklamy w aplikacji. Four image IDs may point to the same asset. Pick None for no click action, HTTPS for an external offer, or one of the supported screens/records. Migration 030 adds the interval. No production campaign is created automatically.

Tests: announcement-policy.test.mjs (cooldown/expiry/routes); backend announcements.test.mjs and opt-in announcements.integration.mjs (real MySQL schedule concurrency, boundaries, media and 10-minute interval).
