# Спільна основа сторінок

Зараз фон підключений у `src/app/_layout.tsx` навколо навігації: синій градієнт на весь екран і світлий статус-бар. Screen використовується окремо на сторінках.

## Де що змінювати

- `ScreenBackground.tsx` — кольори, точки й напрямок градієнта; світлий статус-бар за замовчуванням. Фон заповнює весь контейнер, включно з областями під системними елементами. Початковий градієнт ще не звірений з актуальним макетом Figma.
- `Screen.tsx` — safe area та відступи контенту: 20 з боків, 16 зверху й знизу додатково до системних відступів, `gap: 16` між безпосередніми дочірніми елементами.
- `src/app/_layout.tsx` — кореневі провайдери й фон. `src/app/(public)/intro.tsx` — стартовий видимий екран. `src/app/(private)/(tabs)/home.tsx` — головна вкладка.

```tsx
import ScreenBackground from './components/shared/layout/ScreenBackground'
import Screen from './components/shared/layout/Screen'
import Logo from './components/shared/logo/Logo'

<ScreenBackground>
    <Screen paddingHorizontal={20} paddingTop={16}>
        <Logo />
    </Screen>
</ScreenBackground>
```

Порядок завжди: фон → safe area → контент. Не загортати фон в SafeAreaView, інакше залишаться незаповнені краї. Оформлення самої системної шторки сповіщень контролює ОС.

`Screen` приймає `paddingHorizontal`, `paddingTop`, `paddingBottom`, `gap`, `edges` і стандартні View props. Нульові відступи дозволені; `style` має пріоритет для контенту. `ScreenBackground` приймає `statusBarStyle` та View props.

Коли з’явиться хедер, який уже враховує верхню safe area, передавати в Screen `edges={['left', 'right', 'bottom']}`. Якщо нижню safe area вже врахувало меню, її також прибрати з edges. Не дублювати ці відступи.

Фон розміщений один раз у кореневому layout, а Screen — на сторінках. Усередині Screen немає автоматичного ScrollView: сторінка обирає прокрутку сама. Router і просте тимчасове меню вже підключені. У вкладках Screen не додає нижню safe area, бо її враховує Tabs. Кастомне скляне меню реалізоване; загальний хедер деталей ще не реалізований. Для авторизації AuthPage вже додає Back, заголовок, прокрутку та KeyboardAvoidingView.

Прозорість навігації: у `src/app/_layout.tsx` ThemeProvider задає `background` і `card` як `transparent`. Одного `contentStyle` недостатньо: нативний контейнер Stack також бере фон із теми. Текст теми білий. Нижнє меню GlassTabBar має скляну поверхню за Figma.

## Спільні відступи та авторизація

Стандартного `<Screen>` достатньо для padding і gap. Для іншої відстані: `<Screen gap={24}>`; `gap={0}` прибирає її. Вкладені групи полів чи кнопок керують власним gap. `style` може перевизначити значення.

`src/shared/styles/auth.styles.ts` використовується на екранах входу, реєстрації та відновлення пароля. Тут спільна ширина сторінки до 440 (включно з бічними відступами 20), центрування по горизонталі та стилі заголовка, опису й груп форми. AuthPage використовує Screen з нульовим padding, а відступи задає ScrollView. Фон прозорий. Поля лежать у `components/shared/inputs`; структура форм описана в `components/auth/README.md`.

AuthPage: верхній рядок логотип/Back і мови, далі `authStyles.body` з `flexGrow: 1` та `justifyContent: center`. Центрується блок від AuthTabs/заголовка до кнопок форми. Не задаємо фіксовану висоту: коли місця мало або відкрита клавіатура, працює прокрутка. Опціональний `footer` розташований окремо нижче; на login це SocialLinks.

ScreenBackground надає useBackgroundBlurTarget: BlurTargetView містить лише градієнт, а навігація — окремий шар. GlassTabBar використовує target для ефективного Android blur. Меню не перекриває контент: його фактична висота резервується навігатором.
