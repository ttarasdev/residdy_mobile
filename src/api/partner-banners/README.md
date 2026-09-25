# partner-banners

Користувацькі маршрути з `src/modules/partners-modules/partner-banners/partner-banners.controller.ts`.

Функції — у `partner-banners.api.ts`, параметри й відповіді — у `partner-banners.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `getBig` | GET | `/partner-banners/random/big` |
| `getSmall` | GET | `/partner-banners/random/small` |
| `addImpressions` | POST | `/partner-banners/impressions` |
| `addClick` | POST | `/partner-banners/:id/click` |
| `getOne` | GET | `/partner-banners/:id` |
