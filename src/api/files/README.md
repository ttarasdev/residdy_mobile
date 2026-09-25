# files

Користувацькі маршрути з `src/modules/files/files.controller.ts`.

Функції — у `files.api.ts`, параметри й відповіді — у `files.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `streamPrivateFile` | GET | `/files/private/:bucket/*relPath` |

`streamPrivateFile(bucket, relPath, query, options)` приймає шлях як масив сегментів, а `e` і `sig` — з підписаного URL бекенду. Bearer-токен передається заголовком. Повертає Blob.
