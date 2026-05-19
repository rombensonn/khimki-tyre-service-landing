/* eslint-disable @next/next/no-img-element */

import { Armchair, Coffee, Timer } from "lucide-react";

import { withBasePath } from "@/lib/paths";

export default function WaitingArea() {
  return (
    <section className="section bg-[#ece7dc]">
      <div className="container grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative overflow-hidden border border-[#c9c1b4] bg-[#fffaf2] p-3 shadow-[0_24px_64px_rgba(23,27,36,0.12)]">
          <div className="absolute left-3 top-3 z-10 bg-[#171b24] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#f5a524]">
            зона ожидания
          </div>
          <img
            alt="Зона ожидания для клиентов"
            className="h-full min-h-80 w-full object-cover"
            loading="lazy"
            src={withBasePath("/images/waiting-area-photo.jpg")}
          />
        </div>

        <div>
          <p className="section-kicker">Пока автомобиль в работе</p>
          <h2 className="section-title">Можно подождать на месте</h2>
          <p className="mt-5 text-lg text-[#59616e]">
            По отзывам клиентов, на месте есть зона ожидания и кафе. Уточните
            актуальные условия при записи.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Armchair, label: "ожидание на месте" },
              { icon: Coffee, label: "кафе по отзывам" },
              { icon: Timer, label: "удобно совместить услуги" },
            ].map((item) => (
              <div className="border-l-4 border-[#f5a524] bg-[#fffaf2] p-4" key={item.label}>
                <item.icon aria-hidden="true" className="mb-3 text-[#b45309]" size={24} />
                <p className="text-sm font-black leading-snug text-[#171b24]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
