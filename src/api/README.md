# API мобільного користувача

Клієнти для 120 публічних / користувацьких маршрутів поточного локального `residdy_backend`. Маршрути, захищені `ManagerGuard`, `SpecialistGuard`, `PartnerGuard` або менеджерськими ролями, не включені. Перегляд спеціалістів і компаній включений: це користувацькі функції.

У кожній папці: `.api.ts` з функціями, `.types.ts` з контрактами та README з маршрутами. `index.ts` експортує клієнти й типи. Старі `accountsApi`, `appAnnouncementsApi`, `contentApi` та їхні сигнатури збережені; `content` — сумісні короткі методи поверх повнішого API інструкцій і медіа.

| Область | Папки |
|---|---|
| Вхід, реєстрація, профіль | `account-auth`, `user`, `accounts` |
| Підписки та покупки | `subscription-plans`, `subscription-prices`, `user-subscriptions`, `subscription-usage`, `user-purchases` |
| Каталог легалізації | `case-types`, `cases`, `case-stages`, `case-stage-tasks`, `case-instructions`, `case-instruction-blocks`, `case-reminders` |
| Особисті справи | `user-cases`, `user-case-stages`, `user-case-tasks`, `user-reminders` |
| Документи | `g-doc-types`, `g-doc-vars`, `g-doc-templates`, `g-user-docs` |
| Блог | `blog-categories`, `blog-posts` |
| Консультації | `specialists`, `specialist-consultations`, `consultation-categories`, `consultation-slots`, `consultation-bookings`, `consultation-reviews`, `consultation-promocode` |
| Партнери | `partner-companies`, `partner-banners` |
| Сповіщення та пошук | `user-notifications`, `app-announcements`, `search` |
| Умови та згоди | `legal-documents`, `legal-document-acceptances` |
| Файли | `private-assets`, `private-variants`, `public-assets`, `files`, `content` |

## Використання

```ts
import { accountAuthApi, userApi, blogPostsApi, ApiError } from './api'

const { token } = await accountAuthApi.login(
    { email: 'user@example.com', password: '...' },
    { baseUrl: 'https://your-api.example' },
)
const options = { baseUrl: 'https://your-api.example', token }
const profile = await userApi.getMe(options)
const posts = await blogPostsApi.findAll({ lan: 'UA', page: 1 }, options)
```

- `baseUrl` — адреса бекенду, не Metro. Підтримується префікс шляху, якщо він є у вашому розгортанні.
- Для авторизованих маршрутів `token` обов’язковий. Публічні запити не надсилають його навіть при передачі в options.
- `signal?: AbortSignal` скасовує запит. Клієнт не зберігає токен, не виконує навігацію й не повторює мутації автоматично.
- Списки приймають об’єкт query, наприклад `{}` для серверних defaults. `false` і `0` зберігаються, `undefined` / `null` не надсилаються.
- JSON передається як JSON, файли — як multipart. Native-файл: `{ uri, name, type }`; для web підтримується `Blob`. Бінарні відповіді повертаються як `Blob`.
- Мова API: `UA`, `PL`, `EN`, `RU`. Внутрішній `uk` із i18n перетворюється на `UA` на межі виклику; глобальну мову клієнт не змінює.
- У відповідях дати — рядки, а грошові DECIMAL-поля — рядки згідно з бекендом.
- `models.ts` описує JSON-поля моделей без ORM-методів. Зв’язки optional/partial: різні маршрути включають різні поля пов’язаних записів. Публічні проєкції спеціалістів і відгуків описані окремо. TypeScript не замінює runtime-валідацію відповіді.

## Помилки й доступ

`ApiError` містить `status`, `code`, `message`, `messages` (масив помилок валідації) та `details` (JSON відповіді). Існуючі `AccountApiError`, `AnnouncementApiError`, `ContentApiError` успадковують його.

```ts
try {
    await userApi.getMe(options)
} catch (error) {
    if (error instanceof ApiError) {
        // 401: сесія; 403 + code: підписка, ліміт або інші права.
        // Рішення про UI приймає екран, не API-клієнт.
    }
}
```

`SUBSCRIPTION_REQUIRED`, `DOCUMENT_LIMIT_REACHED`, `OPEN_CASE_LIMIT_REACHED` зберігаються без перетворень. Мережева помилка й AbortError не перетворюються на помилку підписки. Невалідний JSON успішної відповіді не маскується під порожній результат. `204` повертає `undefined`.

Права завжди перевіряє сервер. Зокрема, у поточному коді API партнерських компаній і банерів усе ще вимагає підписку; раніше обговорене відкриття партнерів без підписки ще не реалізоване на бекенді. Читання аватарів має окремий виняток. Наявність методу завантаження медіа не дозволяє редагувати чужі файли чи менеджерські бібліотеки.

## Поточні обмеження бекенду

- `userSubscriptionsApi.verify` поки завжди повертає 503, `storePaymentsEnabled` — false. `checkout` не підтверджує оплату.
- `consultationBookingsApi.processDev` / `confirmDev` — тестові симуляції оплати, не production-покупки. Вони названі явно й ніде не викликаються автоматично.
- Історія підписок наразі може містити `null` замість суми/валюти. Не використовувати її як підтвердження платежу.
- Повний перелік менеджерських CRUD, аналітики, поштових черг, редагування спеціалістом/партнером не входить до мобільного API користувача.

## Перевірка

`npm run typecheck` та `npm run test:api`.

Тести використовують mock fetch: перевіряють авторизацію, query, JSON/multipart, помилки, скасування й файли. За наявності сусіднього `residdy_backend` окремий тест читає актуальні контролери й звіряє всі 120 користувацьких маршрутів з клієнтами (метод, шлях, параметри й авторизація). Без сусіднього репозиторію пропускається лише ця перевірка покриття. Живі запити та платежі тести не виконують.
