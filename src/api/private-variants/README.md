# private-variants

Користувацькі маршрути з `src/modules/media-modules/private-variants/private-variants.controller.ts`.

Функції — у `private-variants.api.ts`, параметри й відповіді — у `private-variants.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `create` | POST | `/private-variants` |
| `getById` | GET | `/private-variants/:id` |
| `delete` | DELETE | `/private-variants/:id` |
| `togglePopular` | PATCH | `/private-variants/:id/toggle-popular` |

Читання залежить від власника, видимості, строку зберігання та підписки. Зміна/видалення — лише власних файлів. `ownerAccountId` не дає права діяти від іншого акаунта. Контентні бібліотеки та `manager_files` закриті для завантаження користувачем; сервер перевіряє bucket.
