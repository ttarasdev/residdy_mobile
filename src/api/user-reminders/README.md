# user-reminders

Користувацькі маршрути з `src/modules/user-reminder-modules/user-reminders/user-reminders.controller.ts`.

Функції — у `user-reminders.api.ts`, параметри й відповіді — у `user-reminders.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `getMy` | GET | `/user-reminders/my` |
| `getOneMy` | GET | `/user-reminders/my/:id` |
| `cancelMy` | PATCH | `/user-reminders/my/:id/cancel` |
