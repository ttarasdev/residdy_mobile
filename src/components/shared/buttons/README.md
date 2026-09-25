# Buttons

`Button` — спільна основа. `DarkButton`, `LightButton`, `BlueButton`, `OutlineButton`, `DottedButton`, `GlowButton` підставляють оформлення; будь-який параметр можна перевизначити. Останні два — початкове оформлення за описом, ще не звірене з актуальною Figma. Manrope підключений у кореневому layout; кнопки використовують Manrope SemiBold.

```tsx
import LightButton from './LightButton'
import BackButton from './BackButton'

<LightButton onPress={save} loading={saving}>Зберегти</LightButton>
<BackButton accessibilityLabel="Назад" onPress={goBack} />
```

Текст і підписи доступності передає екран зі своїх перекладів. `children` приймає також ReactNode. `startIcon` і `endIcon` — довільні ноди. Для тексту є `color` і `textStyle`, для контейнера — `style` (звичайний або callback Pressable), розміри, padding, radius, фон, рамка та gradient.

`disabled` та `loading` блокують натискання. При завантаженні вміст зберігає розміри, зверху показується індикатор. Натискання змінює прозорість.

`IconButton` приймає `icon`, `size`, `iconSize`, `color` і обов'язковий `accessibilityLabel`. `BackButton`, `CloseButton`, `PlusButton`, `NextButton`, `SearchButton` підставляють експортовані білі PNG. `color` змінює їх через tintColor; додаткові кольорові файли не потрібні. Навігацію задає екран через `onPress`.

Зовнішнє світіння GlowButton може обрізатись, якщо батьківський контейнер має overflow: hidden. Візуальну перевірку нативних станів ще потрібно зробити при складанні екранів.
