# 🛒 SAGOMADGE Store

Адаптивное одностраничное приложение интернет-магазина, созданное на **React 19, TypeScript и Vite**.

Проект демонстрирует работу с асинхронными запросами, глобальным состоянием, клиентской маршрутизацией, `localStorage`, runtime-валидацией внешних данных и автоматическими тестами.

🔗 **[Открыть приложение на Vercel](https://shopping-cart-pearl-zeta.vercel.app/)**

---

## 📱 Интерфейс приложения

### Desktop

|                     Главная страница                      |                      Каталог товаров                      |
| :-------------------------------------------------------: | :-------------------------------------------------------: |
| <img src="src/assets/laptop screenshot1.jpg" width="400"> | <img src="src/assets/laptop screenshot2.jpg" width="400"> |

<details>
  <summary>Показать остальные desktop-экраны</summary>

|                          Корзина                          |                      Пустая корзина                       |
| :-------------------------------------------------------: | :-------------------------------------------------------: |
| <img src="src/assets/laptop screenshot3.jpg" width="400"> | <img src="src/assets/laptop screenshot4.jpg" width="400"> |

</details>

### Mobile

Приложение разработано по принципу **Mobile First**.

|                     Главная                     |                     Каталог                     |                     Корзина                     |                 Пустая корзина                  |
| :---------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: |
| <img src="src/assets/iphone 1.png" width="180"> | <img src="src/assets/iphone 2.png" width="180"> | <img src="src/assets/iphone 3.png" width="180"> | <img src="src/assets/iphone 4.png" width="180"> |

---

## 🚀 Возможности

- Загрузка товаров через REST API.
- Отображение loading-, error- и success-состояний.
- Skeleton-интерфейс во время загрузки.
- Добавление и удаление товаров из корзины.
- Изменение количества товаров.
- Подсчёт общего количества и итоговой стоимости.
- Полная очистка корзины.
- Сохранение корзины в `localStorage`.
- Восстановление и проверка данных после перезагрузки страницы.
- Клиентская маршрутизация и отдельная страница ошибки.
- Toast-уведомления после оформления заказа.
- Адаптивный интерфейс для desktop и mobile.

---

## 🛡 Работа с внешними данными

Данные из API и `localStorage` не считаются безопасными автоматически.

Перед использованием они проходят runtime-проверку:

```text
API response
→ unknown
→ isProductArray()
→ Product[]
```

```text
JSON.parse()
→ unknown
→ isCart()
→ CartItem[]
```

Для проверки структуры данных используются user-defined type guards:

- `isProductRating`
- `isProduct`
- `isProductArray`
- `isCartItem`
- `isCart`

---

## ⚡ Асинхронные запросы

Generic-хук `useFetch<T>` отвечает за:

- состояние загрузки;
- хранение полученных данных;
- обработку ошибок;
- повторный запрос;
- отмену запроса через `AbortController`;
- защиту от race conditions и stale updates через `requestId`.

```ts
type FetchFunction<T> = (signal: AbortSignal) => Promise<T>;
```

---

## 🛠 Технологический стек

- **React 19**
- **TypeScript**
- **Vite**
- **React Router 7**
- **React Context API**
- **CSS Modules**
- **Vitest**
- **React Testing Library**
- **jsdom**
- **ESLint**
- **Vercel Analytics**

---

## ✅ TypeScript

В проекте используется строгая TypeScript-конфигурация:

- `strict: true`
- `noImplicitAny: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `allowJs: false`
- `noEmit: true`

Внешние данные сначала имеют тип `unknown` и используются только после narrowing.

---

## 🧪 Тестирование

Тестами покрыты:

- валидаторы товаров;
- валидаторы корзины;
- API-сервис;
- `CartContext`;
- generic-хук `useFetch<T>`;
- отмена запросов;
- защита от stale data;
- работа `loading` при конкурирующих запросах;
- отображение каталога;
- карточка товара;
- восстановление корзины из `localStorage`;
- добавление, удаление и изменение количества товаров;
- расчёт общей стоимости.

---

## 📁 Структура проекта

```text
src/
├── api/
│   ├── products.ts
│   └── products.test.ts
├── assets/
├── components/
│   ├── ErrorPage/
│   ├── Footer/
│   ├── Layout/
│   ├── Navbar/
│   └── StatusMessage/
├── context/
│   ├── CartContext.tsx
│   └── CartContext.test.tsx
├── hooks/
│   ├── useFetch.ts
│   └── useFetch.test.tsx
├── pages/
│   ├── Cart/
│   │   ├── components/
│   │   │   └── CartItem.tsx
│   │   └── Cart.tsx
│   ├── Home/
│   │   └── Home.tsx
│   └── Shop/
│       ├── components/
│       │   ├── ProductCard.tsx
│       │   └── ProductCardSkeleton.tsx
│       ├── Shop.tsx
│       └── Shop.test.tsx
├── routes/
│   └── routes.tsx
├── styles/
│   └── index.css
├── tests/
│   ├── fixtures.ts
│   └── setup.ts
├── types/
│   ├── fetch.ts
│   └── product.ts
├── validators/
│   ├── cart.ts
│   ├── cart.test.ts
│   ├── product.ts
│   └── product.test.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## ⚙️ Установка и запуск

Клонировать репозиторий:

```bash
git clone https://github.com/SAGOMADGE/Shopping-Cart.git
cd Shopping-Cart
```

Установить зависимости:

```bash
npm install
```

Запустить development-сервер:

```bash
npm run dev
```

---

## 🔍 Проверка проекта

Проверить TypeScript:

```bash
npm run typecheck
```

Запустить ESLint:

```bash
npm run lint
```

Запустить тесты:

```bash
npm test -- --run
```

Собрать production-версию:

```bash
npm run build
```

Запустить все проверки последовательно:

```bash
npm run typecheck
npm run lint
npm test -- --run
npm run build
```

---

## 🧠 Практические результаты

Во время разработки проекта были отработаны:

- миграция React-приложения с JavaScript на TypeScript;
- проектирование generic custom hooks;
- narrowing внешних данных;
- user-defined type guards;
- безопасная работа с `localStorage`;
- управление глобальным состоянием через Context API;
- предотвращение race conditions;
- тестирование компонентов, Context, API и custom hooks;
- настройка strict TypeScript и ESLint;
- deployment React SPA на Vercel.
