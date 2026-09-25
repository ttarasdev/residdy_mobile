# user-notifications

Користувацькі маршрути з `src/modules/user-notification-modules/user-notifications/user-notifications.controller.ts`.

Функції — у `user-notifications.api.ts`, параметри й відповіді — у `user-notifications.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `getMy` | GET | `/user-notifications/my` |
| `getMyUnreadCount` | GET | `/user-notifications/my/unread-count` |
| `getOneMy` | GET | `/user-notifications/my/:id` |
| `changeStatus` | PATCH | `/user-notifications/my/:id/status` |
