# user-subscriptions

Користувацькі маршрути з `src/modules/subscription-modules/user-subscriptions/user-subscriptions.controller.ts`.

Функції — у `user-subscriptions.api.ts`, параметри й відповіді — у `user-subscriptions.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `current` | GET | `/user-subscriptions/me` |
| `history` | GET | `/user-subscriptions/me/history` |
| `checkout` | POST | `/user-subscriptions/me/checkout` |
| `verify` | POST | `/user-subscriptions/verify-purchase` |

`verify` зараз повертає 503: перевірка покупок Apple/Google не реалізована. `checkout` лише готує покупку та фіксує прийняття умов.

Development: `devPurchase({ priceId }, options)` calls `POST /user-subscriptions/me/dev-purchase`. The server requires development environment and SUBSCRIPTIONS_DEV_ENABLED=true, permits only DEV prices and only the caller's user profile. Returns the current subscription. Never use as store verification.
