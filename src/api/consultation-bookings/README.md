# consultation-bookings

Користувацькі маршрути з `src/modules/consultation-modules/consultation-bookings/consultation-bookings.controller.ts`.

Функції — у `consultation-bookings.api.ts`, параметри й відповіді — у `consultation-bookings.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `create` | POST | `/consultation-bookings` |
| `findMy` | GET | `/consultation-bookings/my` |
| `findMyOne` | GET | `/consultation-bookings/my/:id` |
| `actions` | GET | `/consultation-bookings/my/:id/actions` |
| `rescheduleSlots` | GET | `/consultation-bookings/my/:id/reschedule-slots` |
| `reschedule` | PATCH | `/consultation-bookings/:id/reschedule` |
| `processDev` | POST | `/consultation-bookings/:id/process-dev` |
| `cancel` | PATCH | `/consultation-bookings/:id/cancel` |
| `confirmDev` | PATCH | `/consultation-bookings/:id/confirm-dev` |
| `downloadUserRequest` | GET | `/consultation-bookings/my/:id/file` |

`create(dto, options, file?)` надсилає multipart/form-data. `legalVersionIds` — повторювані поля. `file` необов’язковий.

`processDev` і `confirmDev` — лише тестові операції бекенду, не справжня оплата.
