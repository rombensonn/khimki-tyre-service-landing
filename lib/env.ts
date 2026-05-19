import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : undefined))
  .optional();

const envSchema = z.object({
  DATABASE_URL: optionalString,
  TELEGRAM_BOT_TOKEN: optionalString,
  TELEGRAM_CHAT_ID: optionalString,
  SMTP_HOST: optionalString,
  SMTP_PORT: optionalString,
  SMTP_USER: optionalString,
  SMTP_PASS: optionalString,
  LEADS_TO_EMAIL: optionalString,
  CRM_WEBHOOK_URL: optionalString,
  ADMIN_PASSWORD: optionalString,
  NEXT_PUBLIC_SITE_URL: optionalString,
  NEXT_PUBLIC_YANDEX_METRIKA_ID: optionalString,
});

export const env = envSchema.parse(process.env);

export const siteUrl =
  env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const business = {
  name: "Шиномонтаж",
  fullName: "Шиномонтаж, автосервис и автомойка в Химках",
  phone: "+7 (977) 999-02-22",
  phoneHref: "tel:+79779990222",
  whatsappHref: "https://wa.me/79779990222",
  yandexMapsHref: "https://yandex.ru/maps/-/CPs0jR~W",
  addressPlaceholder: "Соколовская ул., вл3, микрорайон Новогорск, Химки",
  area: "Соколовская ул., вл3, микрорайон Новогорск, Химки",
  rating: "4,4",
  ratingCount: 65,
  reviewCount: 27,
};

export const workingHours = [
  { day: "Понедельник", hours: "08:00-23:00" },
  { day: "Вторник", hours: "08:00-23:00" },
  { day: "Среда", hours: "08:00-23:00" },
  { day: "Четверг", hours: "08:00-23:00" },
  { day: "Пятница", hours: "08:00-23:00" },
  { day: "Суббота", hours: "09:00-23:00" },
  { day: "Воскресенье", hours: "09:00-23:00" },
] as const;

export const compactWorkingHours =
  "Пн-Пт 08:00-23:00, Сб-Вс 09:00-23:00";
