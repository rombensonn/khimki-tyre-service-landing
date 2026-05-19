# Шиномонтаж, автосервис и автомойка в Химках

Готовый одностраничный лендинг на Next.js App Router с формой заявок, API `/api/leads`, Prisma, локальной SQLite-базой для разработки и PostgreSQL-схемой для production.

## 1. Установка зависимостей

```bash
npm install
```

## 2. Создание `.env`

```bash
cp .env.example .env
```

Минимум для локального запуска:

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="change-me"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Telegram, SMTP и CRM можно оставить пустыми. Заявка сохранится в БД, а сервер запишет в лог, что уведомления пропущены.

## 3. Prisma migration

Локальная разработка использует SQLite:

```bash
npm run prisma:migrate -- --name init
```

Скрипт заранее создает пустой `prisma/dev.db`, чтобы SQLite-миграция проходила стабильно.

Для production используйте PostgreSQL. В репозитории есть `prisma/schema.postgres.prisma`. Перед релизом создайте отдельную PostgreSQL-миграцию на staging/production БД:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public" \
npx prisma migrate dev --schema prisma/schema.postgres.prisma --name init
```

На сервере затем:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public" \
npm run prisma:deploy:postgres
```

## 4. Запуск dev-сервера

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## 5. Проверка отправки заявки

1. Заполните форму на главной странице.
2. Обязательно отметьте оба юридических чекбокса.
3. Отправьте заявку.
4. Откройте `/admin`, логин `admin`, пароль из `ADMIN_PASSWORD`.
5. Проверьте, что заявка появилась в таблице.

Также можно проверить API напрямую:

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Тест",
    "phone":"+7 (977) 999-02-22",
    "serviceType":"TYRE",
    "carModel":"Kia Rio",
    "problemDescription":"Проверить балансировку",
    "preferredDate":"2026-05-20",
    "preferredTime":"12:00",
    "contactMethod":"PHONE",
    "personalDataConsent":true,
    "privacyPolicyConsent":true
  }'
```

## 6. Подключение Telegram

1. Создайте бота через BotFather.
2. Получите `TELEGRAM_BOT_TOKEN`.
3. Узнайте `TELEGRAM_CHAT_ID` нужного чата или пользователя.
4. Добавьте в `.env`:

```env
TELEGRAM_BOT_TOKEN="123456:token"
TELEGRAM_CHAT_ID="123456789"
```

После этого новые заявки будут отправляться в Telegram.

## 7. Подключение SMTP

Заполните SMTP-переменные:

```env
SMTP_HOST="smtp.example.ru"
SMTP_PORT="465"
SMTP_USER="leads@example.ru"
SMTP_PASS="password"
LEADS_TO_EMAIL="owner@example.ru"
```

Для порта `465` используется secure SMTP. Для `587` будет обычное STARTTLS-подключение через nodemailer.

## 8. Замена placeholders

Перед публикацией замените все пометки `[УТОЧНИТЬ: ...]`:

- точный адрес в блоке контактов и JSON-LD;
- iframe Яндекс.Карт;
- юридические реквизиты в `/privacy` и `/consent`;
- согласованный прайс;
- реальные фотографии в `/public/images`. Сейчас изображения являются AI-сгенерированными тематическими иллюстрациями, а не реальными фото сервиса.

Не добавляйте неподтвержденные цены, гарантии, сертификаты, оборудование, фото сотрудников или обещания оплаты картой.

## 9. Подготовка к production

1. Укажите `NEXT_PUBLIC_SITE_URL` с реальным доменом.
2. Настройте PostgreSQL и `DATABASE_URL`.
3. Сгенерируйте Prisma Client для PostgreSQL:

```bash
npm run prisma:generate:postgres
```

4. Примените PostgreSQL-миграции.
5. Заполните `ADMIN_PASSWORD`, Telegram и SMTP.
6. Проверьте:

```bash
npm run typecheck
npm run lint
npm run build
```

7. Добавьте реальный ID Яндекс.Метрики только в env:

```env
NEXT_PUBLIC_YANDEX_METRIKA_ID="00000000"
```

## 10. Деплой на VPS или российский хостинг

Типовой VPS-сценарий:

```bash
git pull
npm ci
npm run prisma:generate:postgres
npm run prisma:deploy:postgres
npm run build
npm run start
```

Для постоянного запуска используйте `pm2`, `systemd` или процесс-менеджер хостинга. Перед Next.js поставьте Nginx/Caddy как reverse proxy, включите HTTPS, настройте переменные окружения на сервере и ограничьте доступ к `/admin` надежным `ADMIN_PASSWORD`.

На shared/Node.js-хостинге порядок тот же: установить зависимости, указать env, выполнить Prisma generate/migrate для PostgreSQL, собрать `npm run build`, запустить `npm run start`.
