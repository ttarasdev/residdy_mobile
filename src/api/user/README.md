# user

Користувацькі маршрути з `src/modules/user-modules/user/user.controller.ts`.

Функції — у `user.api.ts`, параметри й відповіді — у `user.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `register` | POST | `/user/register` |
| `getMe` | GET | `/user/me` |
| `updateMe` | PATCH | `/user/me` |
| `removeMe` | DELETE | `/user/me` |
| `uploadMyAvatar` | POST | `/user/me/avatar` |

`register` повертає профіль, а не токен. Після підтвердження email токен отримується через `accountAuthApi.login`. Код української для API — `UA`; телефон у `updateMe` — `+48` та 9 цифр.

## Перший онбординг

`userApi.completeOnboarding(options)` → `POST /user/me/onboarding/complete`, без body. Потрібен токен користувача, підписка не потрібна. Повертає User із `onboardingCompletedAt`. Дата задається сервером один раз; поля userId або дати клієнт не передає. `GET /user/me` також повертає цю дату.
