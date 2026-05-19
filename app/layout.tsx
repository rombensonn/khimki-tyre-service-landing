import type { Metadata, Viewport } from "next";

import "./globals.css";
import YandexMetrika from "@/components/YandexMetrika";
import { business, env, siteUrl } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Шиномонтаж, автосервис и автомойка в Химках, Новогорск — запись до 23:00",
  description:
    "Шиномонтаж, автосервис и автомойка в Химках, Новогорск. Рейтинг 4,4 на Яндекс.Картах, 65 оценок. Запись на удобное время, работа каждый день до 23:00.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Шиномонтаж, автосервис и автомойка в Химках, Новогорск — запись до 23:00",
    description:
      "Запишитесь на шиномонтаж, автосервис или автомойку. Администратор подтвердит свободное время и подскажет ориентир по стоимости.",
    url: siteUrl,
    siteName: business.fullName,
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Шиномонтаж, автосервис и автомойка в Химках, Новогорск — запись до 23:00",
    description:
      "Работаем каждый день до 23:00. Заявка на шиномонтаж, сервис и мойку.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171b24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
        {env.NEXT_PUBLIC_YANDEX_METRIKA_ID ? (
          <YandexMetrika counterId={env.NEXT_PUBLIC_YANDEX_METRIKA_ID} />
        ) : null}
      </body>
    </html>
  );
}
