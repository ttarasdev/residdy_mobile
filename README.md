# residdy_mobile

Мобільний застосунок на React Native, Expo та TypeScript.
Проєкт розташований безпосередньо в корені репозиторію.

## Запуск

```bash
npm install
npm start
```

Відкрийте застосунок через Expo Go або запустіть симулятор:

- `npm run ios` — iOS Simulator (потрібен Xcode).
- `npm run android` — Android Emulator (потрібен Android SDK).

Код застосунку розташований у `src/`. Початковий екран: `src/App.tsx`.
Налаштування застосунку: `app.json`.

## Перевірка

```bash
npm run typecheck
```

## Реклама при відкритті

Типізований клієнт нового API: `src/api/app-announcements`. Отримання активної реклами з bearer-токеном, мовою і AbortSignal. UI, показ попапа й push поки не підключені. Приклади та правила навігації: [API реклами](src/api/app-announcements/README.md).

Перевірка клієнта: `node --test test/announcements.test.mjs`.
