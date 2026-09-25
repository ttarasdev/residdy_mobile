# legal-documents

Користувацькі маршрути з `src/modules/legal-modules/legal-documents/legal-documents.controller.ts`.

Функції — у `legal-documents.api.ts`, параметри й відповіді — у `legal-documents.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `list` | GET | `/legal-documents` |
| `file` | GET | `/legal-documents/versions/:id/file` |
| `current` | GET | `/legal-documents/:code` |
