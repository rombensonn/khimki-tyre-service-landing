/* eslint-disable @next/next/no-img-element */

import { CarFront, Droplets, Gauge, Wrench } from "lucide-react";

import { withBasePath } from "@/lib/paths";

const services = [
  {
    icon: Gauge,
    title: "Шиномонтаж",
    image: "/images/wheel-balance-photo.jpg",
    alt: "Балансировка колес",
    description:
      "Сезонная замена, балансировка и ремонт колес. Поможем, если колесо спускает, появилась вибрация или нужно быстро переобуть автомобиль.",
    items: [
      "сезонная замена колес",
      "балансировка",
      "ремонт проколов",
      "проверка колеса при спускании",
      "консультация по проблемам после замены",
    ],
  },
  {
    icon: Wrench,
    title: "Автосервис",
    image: "/images/auto-service-photo.jpg",
    alt: "Автосервис и ремонт подвески",
    description:
      "ТО, диагностика, подвеска и работы по двигателю. В отзывах клиенты отдельно отмечают мастера Алексея и внимательность к техническим проблемам.",
    items: [
      "техническое обслуживание",
      "диагностика",
      "ремонт подвески",
      "работы по двигателю",
      "устранение вибраций и посторонних звуков",
    ],
  },
  {
    icon: Droplets,
    title: "Автомойка",
    image: "/images/car-wash-photo.jpg",
    alt: "Автомойка автомобиля",
    description:
      "Кузов, салон, комплексная и двухфазная мойка. Можно совместить мойку с шиномонтажом или обращением в сервис.",
    items: [
      "мойка кузова",
      "комплексная мойка",
      "двухфазная мойка",
      "уборка салона",
      "финальная проверка результата",
    ],
  },
];

export default function Services() {
  return (
    <section className="section bg-[#ece7dc]" id="services">
      <div className="container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.95fr_0.55fr] lg:items-end">
          <div>
            <p className="section-kicker">Услуги</p>
            <h2 className="section-title">Три задачи за один визит, без разъездов</h2>
          </div>
          <div className="border-t-4 border-[#171b24] bg-[#fffaf2] p-5 shadow-[0_18px_48px_rgba(23,27,36,0.08)]">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-[#b45309]">
              рабочий формат
            </p>
            <p className="mt-3 text-[#59616e]">
              Выберите направление, опишите автомобиль и задачу. Администратор
              подскажет, что уточнить перед приездом.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              className="group overflow-hidden border border-[#c9c1b4] bg-[#fffaf2] shadow-[0_22px_58px_rgba(23,27,36,0.1)]"
              key={service.title}
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-[#d8d1c5]">
                <img
                  alt={service.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                  loading="lazy"
                  src={withBasePath(service.image)}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#171b24]/86 p-4 text-[#fffaf2] backdrop-blur">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-[#f5a524]">
                    направление {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-16 bg-[#f5a524]" />
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-md bg-[#171b24] text-[#f5a524]">
                    <service.icon aria-hidden="true" size={24} />
                  </span>
                  <h3 className="text-2xl font-black text-[#171b24]">
                    {service.title}
                  </h3>
                </div>
                <p className="text-[#59616e]">{service.description}</p>
                <ul className="mt-5 divide-y divide-[#d8d0c2] border-y border-[#d8d0c2]">
                  {service.items.map((item) => (
                    <li className="flex gap-3 py-3 text-sm font-bold text-[#2d3440]" key={item}>
                      <CarFront
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[#b45309]"
                        size={18}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a className="button-primary mt-6 w-full" href="#booking">
                  Уточнить стоимость
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
