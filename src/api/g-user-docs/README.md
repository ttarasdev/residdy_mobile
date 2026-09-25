# g-user-docs

Користувацькі маршрути з `src/modules/g-doc-modules/g-user-docs/g-user-docs.controller.ts`.

Функції — у `g-user-docs.api.ts`, параметри й відповіді — у `g-user-docs.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `findAll` | GET | `/g-user-docs` |
| `findOne` | GET | `/g-user-docs/:id` |
| `create` | POST | `/g-user-docs` |
| `getFileUrl` | GET | `/g-user-docs/:id/file-url` |
| `remove` | DELETE | `/g-user-docs/:id` |

## Повнота профілю

Перед генерацією бек перевіряє name, surname, phone, location, lan. Якщо чогось бракує: HTTP 409, `code: PROFILE_INCOMPLETE`, `missingFields: string[]` у `ApiError.details`. Майбутня форма генерації повинна запропонувати заповнення профілю та зберегти вибраний шаблон. Дата `profileCompletedAt` сама по собі не дає доступу. При зміні профілю під час генерації: 409 `PROFILE_CHANGED`, потрібно повторити запит.
