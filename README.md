# 🛒 SAGOMADGE Store (E-commerce SPA)

## 📱 Интерфейс приложения (Preview)

🔗 **[Посмотреть живое демо на Vercel](https://shopping-cart-pearl-zeta.vercel.app/)**

### 💻 Desktop Experience

Для десктопной версии я реализовал просторный интерфейс с акцентом на карточки товаров и удобную навигацию.

|                     Главная страница                      |                      Каталог товаров                      |
| :-------------------------------------------------------: | :-------------------------------------------------------: |
| <img src="src/assets/laptop screenshot1.jpg" width="400"> | <img src="src/assets/laptop screenshot2.jpg" width="400"> |

<details>
  <summary>🔍 Посмотреть остальные экраны (Desktop)</summary>

|                          Корзина                          |                        Пустая корзина                      |
| :-------------------------------------------------------: | :-------------------------------------------------------: |
| <img src="src/assets/laptop screenshot3.jpg" width="400"> | <img src="src/assets/laptop screenshot4.jpg" width="400"> |

</details>

---

### 📱 Mobile Experience (Real Device)

Проект разработан по принципу **Mobile First**. Скриншоты сделаны с реального устройства, чтобы продемонстрировать качество верстки и удобство UX в "боевых" условиях.

|                     Landing                     |                     Shop UI                     |                      Cart                       |                    404 State                    |
| :---------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: |
| <img src="src/assets/iphone 1.png" width="180"> | <img src="src/assets/iphone 2.png" width="180"> | <img src="src/assets/iphone 3.png" width="180"> | <img src="src/assets/iphone 4.png" width="180"> |

---

Современное одностраничное приложение (SPA) для онлайн-шопинга, построенное на **React**. Проект демонстрирует навыки проектирования масштабируемой фронтенд-архитектуры, работы с глобальным состоянием и сложной маршрутизацией.

## 🚀 Основные возможности (Features)

- **Product Listing:** Динамическая загрузка товаров через REST API (`FakeStoreAPI`).
- **Advanced Cart Logic:** Полный цикл управления корзиной (добавление, удаление, изменение количества, очистка).
- **State Persistence:** Сохранение состояния корзины в `localStorage` (данные не теряются при перезагрузке).
- **Modern Routing:** Использование `createBrowserRouter` с кастомной страницей 404.
- **UX/UI Excellence:**
  - Скелетная загрузка (`Skeleton Screens`) для предотвращения CLS (Cumulative Layout Shift).
  - Анимированные уведомления (Toast notifications) при успешных действиях.
  - Полный адаптив (Mobile First).
- **Performance:** Оптимизация запросов через `AbortController` в кастомном хуке `useFetch`.

## 🛠 Технологический стек (Tech Stack)

- **Core:** React 18, Vite.
- **Routing:** React Router v6.
- **State Management:** React Context API + Custom Hooks.
- **Styles:** CSS Modules (изоляция стилей), CSS Variables (дизайн-токены).
- **Testing:** Vitest, React Testing Library (Unit-тесты для бизнес-логики).
- **Deployment:** Vercel (с настроенным SPA-роутингом через `vercel.json`).

## 📁 Архитектура проекта

Проект организован по модульному принципу:

````text
src/
├── api/
│   └── products.js         # Логика сетевых запросов (FakeStoreAPI)
├── components/             # Модульные компоненты приложения
│   ├── CartItem/           # Элемент товара в корзине
│   ├── ErrorPage/          # Компонент обработки 404
│   ├── Footer/             # Подвал сайта
│   ├── Layout/             # Обертка для основного контента
│   ├── Navbar/             # Навигационная панель с счетчиком
│   ├── ProductCard/        # Карточка товара в магазине
│   ├── ProductCardSkeleton/# Skeleton-loading эффект
│   ├── StatusMessage/      # Обработка ошибок загрузки (Shop)
│   └── Toast/              # Уведомления об успехе
├── context/
│   └── CartContext.jsx     # Глобальное состояние корзины
├── hooks/
│   └── useFetch.js         # Кастомный хук для API запросов
├── pages/
│   ├── Cart/               # Страница корзины
│   ├── Home/               # Главная (Hero-секция)
│   └── Shop/               # Страница каталога
├── routes/
│   └── routes.jsx          # Конфигурация React Router
├── App.jsx                 # Корневой компонент
├── index.css               # Глобальные стили и CSS-переменные
└── main.jsx                # Точка входа

⚙️ Установка и запуск
Клонировать репозиторий:

```Bash
git clone [https://github.com/SAGOMADGE/shopping-cart.git](https://github.com/SAGOMADGE/shopping-cart.git)
````

Установить зависимости:

```Bash
npm install
```

Запустить режим разработки:

```Bash
npm run dev
```

Запустить тесты:

```Bash
npm test
```

🧠 Чему я научился в этом проекте
Архитектура Hooks: Проектирование Custom Hooks для полного отделения бизнес-логики от UI-слоя.

Lifecycle Management: Работа с Cleanup functions в useEffect для корректной отмены асинхронных запросов и предотвращения утечек памяти.

Advanced CSS: Глубокое понимание специфики Flexbox-позиционирования и использование CSS-переменных для создания консистентной дизайн-системы.

DevOps Basics: Настройка инфраструктуры деплоя и конфигурация серверных правил (SPA Rewrites) для корректной работы клиентского роутинга.

```

```
