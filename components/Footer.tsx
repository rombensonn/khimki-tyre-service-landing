import Link from "next/link";

import { business, compactWorkingHours } from "@/lib/env";

export default function Footer() {
  return (
    <footer className="border-t border-[#c9c1b4] bg-[#fffaf2] pb-24 pt-8 text-[#3a414d] md:pb-8">
      <div className="container grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <p className="text-xl font-black text-[#171b24]">{business.name}</p>
          <p className="mt-2">{business.fullName}</p>
          <p className="mt-2">
            <a className="font-black text-[#171b24]" href={business.phoneHref}>
              {business.phone}
            </a>
            <span className="mx-2 text-[#74808f]">/</span>
            {compactWorkingHours}
          </p>
          <p className="mt-4 max-w-3xl text-sm">
            Информация на сайте носит справочный характер. Точную стоимость и
            наличие свободного времени уточняйте при записи.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-bold md:text-right" aria-label="Юридические документы">
          <Link className="hover:text-[#7c2d12]" href="/privacy">
            Политика обработки персональных данных
          </Link>
          <Link className="hover:text-[#7c2d12]" href="/consent">
            Согласие на обработку персональных данных
          </Link>
        </nav>
      </div>
    </footer>
  );
}
