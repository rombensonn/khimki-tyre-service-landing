import { BadgeRussianRuble, Car, Droplets, Gauge } from "lucide-react";

const groups = [
  {
    icon: Gauge,
    title: "Шиномонтаж",
    items: [
      "радиус колес",
      "тип автомобиля",
      "сезонная нагрузка",
      "необходимость ремонта",
      "балансировка",
      "состояние крепежа и колес",
    ],
  },
  {
    icon: Car,
    title: "Автосервис",
    items: [
      "вид работ",
      "сложность диагностики",
      "состояние узла",
      "необходимость запчастей",
      "срочность",
    ],
  },
  {
    icon: Droplets,
    title: "Автомойка",
    items: [
      "тип мойки",
      "размер автомобиля",
      "степень загрязнения",
      "нужна ли уборка салона",
      "нужна ли двухфазная мойка",
    ],
  },
];

export default function PriceGuide() {
  return (
    <section className="section bg-[#fffaf2]" id="prices">
      <div className="container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">Стоимость</p>
            <h2 className="section-title">Цена считается по задаче, а не по шаблону</h2>
          </div>
          <div className="border border-[#171b24] bg-[#171b24] p-5 text-[#fffaf2]">
            <div className="mb-2 flex items-center gap-2 text-[#ffd47a]">
              <BadgeRussianRuble aria-hidden="true" size={22} />
              <p className="font-black">Без выдуманных прайсов</p>
            </div>
            <p className="text-[#d9d4c8]">
              Стоимость зависит от задачи, автомобиля и объема работ. Лучше
              описать проблему заранее - так проще сориентировать вас до визита.
            </p>
            <p className="mt-3 text-sm font-bold text-[#ffd47a]">
              Подробный прайс можно добавить после согласования с владельцем.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {groups.map((group) => (
            <article className="border-t-4 border-[#f5a524] bg-[#ece7dc] p-6 shadow-[0_18px_46px_rgba(23,27,36,0.08)]" key={group.title}>
              <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-[#171b24] text-[#f5a524]">
                <group.icon aria-hidden="true" size={24} />
              </span>
              <h3 className="text-2xl font-black text-[#171b24]">{group.title}</h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li className="flex gap-3 text-[#3a414d]" key={item}>
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#b45309]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a className="button-primary" href="#booking">
            Оставьте заявку - подскажем ориентир до приезда
          </a>
        </div>
      </div>
    </section>
  );
}
