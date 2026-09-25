# user-case-stages

Користувацькі маршрути з `src/modules/user-cases-modules/user-case-stages/user-case-stages.controller.ts`.

Функції — у `user-case-stages.api.ts`, параметри й відповіді — у `user-case-stages.types.ts`.
Спільні правила, приклади та помилки: [API README](../README.md).

| Функція | HTTP | Маршрут |
|---|---|---|
| `findByCase` | GET | `/user-case-stages/by-case/:userCaseId` |
| `findByCaseAndStageNo` | GET | `/user-case-stages/by-case/:userCaseId/by-stage-no/:stageNo` |
| `findOne` | GET | `/user-case-stages/:id` |
| `goNext` | POST | `/user-case-stages/:id/next` |
