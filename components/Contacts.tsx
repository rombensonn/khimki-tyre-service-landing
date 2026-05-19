import { Clock3, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { business, workingHours } from "@/lib/env";

export default function Contacts() {
  return (
    <section className="section relative isolate overflow-hidden bg-[#171b24] text-white" id="contacts">
      <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker text-[#fbbf24]">Контакты</p>
          <h2 className="section-title">Записаться или построить маршрут</h2>
          <p className="mt-5 text-lg text-[#d9d4c8]">
            Для точной записи оставьте заявку или позвоните. Администратор
            подтвердит свободное время, услугу и ориентир по стоимости.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <div className="border border-white/[0.14] bg-white/[0.08] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <Phone aria-hidden="true" className="text-[#f5a524]" size={24} />
                <h3 className="text-2xl font-black">Связаться</h3>
              </div>
              <a className="text-3xl font-black text-white" href={business.phoneHref}>
                {business.phone}
              </a>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a className="button-primary" href={business.phoneHref}>
                  <Phone aria-hidden="true" size={20} />
                  Позвонить
                </a>
                <a className="button-ghost" href={business.whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" size={20} />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="border border-white/[0.14] bg-white/[0.08] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <Clock3 aria-hidden="true" className="text-[#f5a524]" size={24} />
                <h3 className="text-2xl font-black">График работы</h3>
              </div>
              <dl className="grid gap-2">
                {workingHours.map((item) => (
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.1] pb-2 last:border-0 last:pb-0" key={item.day}>
                    <dt className="text-[#d9d4c8]">{item.day}</dt>
                    <dd className="font-black">{item.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="border border-white/[0.14] bg-[#fffaf2] p-2 text-[#151922] shadow-[0_28px_70px_rgba(0,0,0,0.24)]">
            <div className="flex min-h-[420px] flex-col justify-between bg-[#ece7dc] p-6">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <MapPin aria-hidden="true" className="text-[#b45309]" size={26} />
                  <h3 className="text-2xl font-black text-[#171b24]">Адрес и карта</h3>
                </div>
                <p className="text-lg font-black text-[#171b24]">
                  {business.area}
                </p>
                <p className="mt-2 text-[#59616e]">
                  Открывайте карточку на Яндекс.Картах, чтобы построить маршрут
                  и проверить актуальный ориентир перед визитом.
                </p>
                <div className="mt-6 border border-dashed border-[#74808f] bg-[#fffaf2] p-5">
                  <p className="font-black text-[#171b24]">
                    Карта подключается через Яндекс после согласования формата публикации.
                  </p>
                  <p className="mt-2 text-sm text-[#59616e]">
                    Сейчас доступна кнопка перехода в карточку организации.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="button-secondary" href={business.yandexMapsHref} target="_blank" rel="noreferrer">
                  <Navigation aria-hidden="true" size={20} />
                  Открыть в Яндекс.Картах
                </a>
                <a className="button-primary" href="#booking">
                  Записаться
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
