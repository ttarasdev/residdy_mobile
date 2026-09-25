# private-assets

Користувацькі маршрути з `src/modules/media-modules/private-assets/private-assets.controller.ts`.

Функції — у `private-assets.api.ts`, параметри й відповіді — у `private-assets.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `create` | POST | `/private-assets` |
| `getById` | GET | `/private-assets/:id` |
| `delete` | DELETE | `/private-assets/:id` |
| `togglePopular` | PATCH | `/private-assets/:id/toggle-popular` |
| `getSignedUrl` | GET | `/private-assets/:id/url` |
| `download` | GET | `/private-assets/:id/file` |

Читання залежить від власника, видимості, строку зберігання та підписки. Зміна/видалення — лише власних файлів. `ownerAccountId` не дає права діяти від іншого акаунта. Контентні бібліотеки та `manager_files` закриті для завантаження користувачем; сервер перевіряє bucket.
