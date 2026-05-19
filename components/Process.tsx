import { CalendarPlus, CheckCheck, ClipboardList, Handshake, Wrench } from "lucide-react";

const steps = [
  {
    icon: CalendarPlus,
    title: "Вы оставляете заявку или звоните",
    text: "Можно сразу выбрать услугу, желаемую дату и удобный способ связи.",
  },
  {
    icon: ClipboardList,
    title: "Администратор уточняет детали",
    text: "Уточняем услугу, автомобиль, задачу и свободное время на выбранный день.",
  },
  {
    icon: Handshake,
    title: "Подтверждаем запись",
    text: "Сообщаем ориентир по стоимости и что лучше подготовить к приезду.",
  },
  {
    icon: Wrench,
    title: "Мастер выполняет работу",
    text: "Вы приезжаете в подтвержденное время, мастер принимает автомобиль в работу.",
  },
  {
    icon: CheckCheck,
    title: "Проверяем результат",
    text: "После работ рекомендуем проверить результат на месте и сразу задать вопрос мастеру или администратору.",
  },
];

export default function Process() {
  return (
    <section className="section bg-[#ece7dc]" id="process">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker">Как проходит запись</p>
          <h2 className="section-title">Понятный процесс вместо неопределенности</h2>
          <p className="mt-5 text-lg text-[#59616e]">
            Запись подтверждается после заявки: так проще согласовать свободное
            время, объем работ и ориентир по стоимости до визита.
          </p>
        </div>

        <ol className="relative grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li className="relative border border-[#c9c1b4] bg-[#fffaf2] p-5 shadow-[0_18px_44px_rgba(23,27,36,0.08)]" key={step.title}>
              <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-[#171b24] text-[#f5a524]">
                <step.icon aria-hidden="true" size={24} />
              </span>
              <p className="mb-2 text-sm font-black text-[#b45309]">
                Шаг {index + 1}
              </p>
              <h3 className="text-xl font-black leading-tight text-[#171b24]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-[#59616e]">{step.text}</p>
              <span className="absolute right-5 top-5 h-px w-12 bg-[#f5a524]" />
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col items-start gap-4 border border-[#171b24] bg-[#171b24] p-5 text-[#fffaf2] md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl font-bold">
            Запишитесь заранее - подтвердим дату, время, услугу и подскажем
            ориентир до приезда.
          </p>
          <a className="button-primary" href="#booking">
            Подобрать удобное время
          </a>
        </div>
      </div>
    </section>
  );
}
