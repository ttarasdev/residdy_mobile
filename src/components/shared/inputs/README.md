# Inputs

Прямі імпорти з файлів, типи поруч із компонентами.

- `Input`: label, error, icon, right, containerStyle та звичайні TextInputProps. `style` змінює сам TextInput; ref підтримується. Є фокус, помилка та editable=false.
- `PasswordInput`: використовує Input і готовий IconButton для ока. Переклади підписів доступності — auth.showPassword / auth.hidePassword.
- `CodeInput`: шість візуальних комірок поверх одного нативного поля. Підтримує вставлення шестизначного коду й автозаповнення; зберігає нуль на початку. Приймає value/onChangeText, label, error, disabled.
- `Checkbox`: checked/onChange, обов’язковий label для доступності, children для тексту й посилань. Посилання поруч не змінює згоду.

Компоненти не знають про роутер, токен або API. Текст, значення, помилки й дії передає форма. Manrope завантажується в кореневому layout.
