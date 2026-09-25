# Cards

Прямі імпорти, типи поруч із компонентами. `Card` — прозорий контейнер; `SlateCard`, `NavyCard`, `PaperCard` задають готовий фон. `GlassCard` додає blur і градієнт, використовуючи ту саму `Card`.

```tsx
import NavyCard from './components/shared/cards/NavyCard'

<NavyCard padding={24} radius={26} onPress={openDetails} style={{ gap: 12 }}>
    <Text style={{ color: '#FFFFFF' }}>Моя справа</Text>
</NavyCard>
```

Доступні `children`, `padding`, `radius`, `width`, `height`, `backgroundColor`, `borderColor`, `borderWidth`, `gradient`, `onPress`, `disabled` та стандартні View props. Решта оформлення — через `style`, який має пріоритет над окремими параметрами. `padding={0}` і `radius={0}` працюють. Без `onPress` компонент рендерить звичайний View.

`gradient` — `{ colors, start?, end?, locations? }`; `false` вимикає його. Прозора картка з рамкою для підказок: `<Card radius={26} backgroundColor="rgba(255,255,255,0.055)" borderColor="rgba(255,255,255,0.19)" borderWidth={1}>…</Card>`.

Кольори взяті зі збереженої історії Figma: Slate — картка прогресу, Navy та Paper — поверхні бібліотеки. Це назви оформлень у коді, а не назв конкретних бізнес-компонентів Figma. Відтінки окремих старих карток можна перевизначати: фінальний етап `#283E50`, готовий документ `#E9EFF5`, створення справи `#172C3C`. Градієнт скла — з onboarding. Поточний файл Figma повторно перевірити не вдалося через ліміт MCP; інтенсивність blur 30 — початкове нативне налаштування, не перерахунок Figma blur radius.

## GlassCard на Android

За Expo 57 фон обгортається в `BlurTargetView`, а його ref передається в `blurTarget`. Картку рендеримо після фону. Один target можна використовувати для кількох карток.

```tsx
const background = useRef<View | null>(null)

<View style={{ flex: 1 }}>
    <BlurTargetView ref={background} style={StyleSheet.absoluteFill}>
        {/* Фонове зображення або градієнт */}
    </BlurTargetView>
    <GlassCard blurTarget={background} style={{ margin: 20 }}>
        <Text>Вміст</Text>
    </GlassCard>
</View>
```

Імпорти: `useRef` із `react`, `View`, `Text`, `StyleSheet` із `react-native`, `BlurTargetView` із `expo-blur`, `GlassCard` напряму з `./GlassCard`.

Без target на Android та на Android до 12 залишається напівпрозорий градієнт. `backgroundColor` у GlassCard — відтінок поверх blur; непрозорий колір приховає розмиття. Текст не розмивається. Для зовнішньої тіні використовуй обгортку: картка обрізає фон по радіусу.

Документація: https://docs.expo.dev/versions/v57.0.0/sdk/blur-view/
