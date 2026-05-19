import { MessageSquareText, Star } from "lucide-react";

import { business } from "@/lib/env";

const reviewMeanings = [
  "быстро выполняют шиномонтаж",
  "помогают с проблемами по колесам",
  "хвалят мастера Алексея за двигатель и подвеску",
  "отмечают аккуратную мойку",
  "удобно, что есть мойка, шиномонтаж и сервис",
  "некоторым клиентам нравится зона ожидания и кафе",
];

export default function Reviews() {
  return (
    <section className="section relative isolate overflow-hidden bg-[#171b24] text-[#fffaf2]" id="reviews">
      <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Отзывы</p>
            <h2 className="section-title">Что отмечают клиенты</h2>
          </div>
          <a className="button-ghost border-white/20 bg-white/[0.08] text-white hover:bg-white hover:text-[#171b24]" href={business.yandexMapsHref} target="_blank" rel="noreferrer">
            Открыть карточку на Яндекс.Картах
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="border border-white/[0.14] bg-white/[0.08] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-3">
              <span className="flex size-14 items-center justify-center rounded-md bg-[#f5a524] text-[#171b24]">
                <Star aria-hidden="true" size={28} />
              </span>
              <div>
                <p className="text-5xl font-black leading-none text-[#fffaf2]">
                  {business.rating}
                </p>
                <p className="mt-1 text-sm font-bold text-[#d9d4c8]">
                  рейтинг на Яндекс.Картах
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="border-l-4 border-[#f5a524] bg-white/[0.1] p-4">
                <p className="text-2xl font-black text-[#ffd47a]">
                  {business.ratingCount}
                </p>
                <p className="text-sm text-[#d9d4c8]">оценок</p>
              </div>
              <div className="border-l-4 border-[#e11d48] bg-white/[0.1] p-4">
                <p className="text-2xl font-black text-[#ffd47a]">
                  {business.reviewCount}
                </p>
                <p className="text-sm text-[#d9d4c8]">отзывов</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-[#d9d4c8]">
              Не публикуем выдуманные цитаты. Ниже собраны только реальные
              смыслы, которые встречаются в отзывах.
            </p>
          </aside>

          <div className="grid gap-4 sm:grid-cols-2">
            {reviewMeanings.map((item) => (
              <div className="border-l-4 border-[#f5a524] bg-[#fffaf2] p-5 text-[#151922] shadow-[0_18px_46px_rgba(0,0,0,0.16)]" key={item}>
                <MessageSquareText
                  aria-hidden="true"
                  className="mb-4 text-[#b45309]"
                  size={26}
                />
                <p className="font-bold text-[#171b24]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border border-white/[0.14] bg-white/[0.08] p-5">
          <p className="font-bold text-[#fffaf2]">
            Мы внимательно относимся к записи и качеству выдачи автомобиля:
            перед приездом подтверждаем время, а после работ рекомендуем
            проверить результат на месте.
          </p>
        </div>
      </div>
    </section>
  );
}
