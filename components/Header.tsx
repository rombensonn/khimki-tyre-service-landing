import { CalendarClock, Menu, Phone } from "lucide-react";
import Link from "next/link";

import { business } from "@/lib/env";

const navItems = [
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Как работаем" },
  { href: "#prices", label: "Цены" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#c9c1b4]/80 bg-[#fffaf2]/[0.92] shadow-[0_10px_34px_rgba(23,27,36,0.08)] backdrop-blur">
      <a
        className="visually-hidden focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-[#151922]"
        href="#content"
      >
        Перейти к содержимому
      </a>
      <div className="container flex min-h-18 items-center justify-between gap-4 py-3">
        <Link className="flex items-center gap-3" href="/" aria-label="На главную">
          <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-md bg-[#171b24] text-sm font-black text-[#f5a524] shadow-[inset_0_-10px_20px_rgba(245,165,36,0.14)]">
            <span className="absolute inset-x-0 top-2 h-px bg-[#f5a524]/45" />
            <span className="absolute inset-x-0 bottom-2 h-px bg-[#f5a524]/45" />
            Ш
          </span>
          <span>
            <span className="block text-lg font-black leading-tight text-[#151922]">
              {business.name}
            </span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.12em] text-[#59616e] sm:block">
              сервис / мойка / колеса
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основное меню">
          {navItems.map((item) => (
            <a
              className="rounded-md px-3 py-2 text-sm font-black text-[#3a414d] transition hover:bg-[#ece7dc] hover:text-[#151922]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="hidden min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-black text-[#171b24] transition hover:bg-[#ece7dc] md:inline-flex"
            href={business.phoneHref}
          >
            <Phone aria-hidden="true" size={18} />
            {business.phone}
          </a>
          <a className="button-primary hidden sm:inline-flex" href="#booking">
            <CalendarClock aria-hidden="true" size={18} />
            Записаться
          </a>
          <a
            className="button-secondary px-3 sm:hidden"
            href={business.phoneHref}
            aria-label="Позвонить"
          >
            <Phone aria-hidden="true" size={20} />
          </a>
          <a
            className="button-ghost px-3 lg:hidden"
            href="#services"
            aria-label="Открыть раздел услуг"
          >
            <Menu aria-hidden="true" size={20} />
          </a>
        </div>
      </div>
    </header>
  );
}
