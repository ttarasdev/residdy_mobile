# account-auth

Користувацькі маршрути з `src/modules/account-modules/account-auth/account-auth.controller.ts`.

Функції — у `account-auth.api.ts`, параметри й відповіді — у `account-auth.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `requestEmailChange` | POST | `/account-auth/request-email-change` |
| `confirmEmailChange` | POST | `/account-auth/confirm-email-change` |
| `confirm` | POST | `/account-auth/confirm` |
| `resend` | POST | `/account-auth/resend` |
| `requestPasswordChange` | POST | `/account-auth/request-password-change` |
| `changePassword` | POST | `/account-auth/change-password` |
| `login` | POST | `/account-auth/login` |
| `forgotPassword` | POST | `/account-auth/forgot-password` |
| `resetPassword` | POST | `/account-auth/reset-password` |
