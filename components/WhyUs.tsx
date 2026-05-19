import { CalendarDays, Clock, ClipboardPen, MapPinned, MessagesSquare, Wrench } from "lucide-react";

const reasons = [
  {
    icon: Wrench,
    title: "Несколько услуг в одном месте",
    text: "Удобно совместить сезонную переобувку, мойку и базовое обслуживание.",
  },
  {
    icon: Clock,
    title: "Можно записаться на вечернее время",
    text: "Сервис работает до 23:00, а время визита подтверждается после заявки.",
  },
  {
    icon: CalendarDays,
    title: "Работаем каждый день",
    text: "В будни с 08:00 до 23:00, в выходные с 09:00 до 23:00.",
  },
  {
    icon: ClipboardPen,
    title: "Можно заранее описать проблему",
    text: "Так проще понять задачу и подготовиться к визиту.",
  },
  {
    icon: MessagesSquare,
    title: "Мастер подскажет, что проверить",
    text: "Особенно если колесо спускает, появилась вибрация или посторонний звук.",
  },
  {
    icon: MapPinned,
    title: "Есть место ожидания",
    text: "По отзывам клиентов, можно дождаться результата на месте.",
  },
];

export default function WhyUs() {
  return (
    <section className="section bg-[#fffaf2]">
      <div className="container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_0.55fr] lg:items-end">
          <div>
          <p className="section-kicker">Почему удобно</p>
          <h2 className="section-title">Практичный сервис для обычного визита</h2>
          <p className="mt-5 text-lg text-[#59616e]">
            Без громких обещаний: просто несколько нужных автомобильных услуг,
            понятная запись и возможность заранее описать задачу.
          </p>
          </div>
          <div className="border-l-4 border-[#e11d48] bg-[#ece7dc] p-5">
            <p className="text-sm font-black uppercase tracking-[0.12em] text-[#9f1239]">
              без лишней витрины
            </p>
            <p className="mt-3 text-[#3a414d]">
              Акцент на том, что важно перед визитом: время, понятная задача,
              связь с администратором и возможность дождаться результата.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <article
              className={`relative overflow-hidden border p-5 ${
                index === 0 || index === 5
                  ? "border-[#171b24] bg-[#171b24] text-[#fffaf2]"
                  : "border-[#c9c1b4] bg-[#ece7dc] text-[#151922]"
              }`}
              key={reason.title}
            >
              <span className={`mb-5 flex size-12 items-center justify-center rounded-md ${
                index === 0 || index === 5
                  ? "bg-[#f5a524] text-[#171b24]"
                  : "bg-[#171b24] text-[#f5a524]"
              }`}>
                <reason.icon aria-hidden="true" size={24} />
              </span>
              <p className={`absolute right-4 top-4 text-xs font-black uppercase tracking-[0.12em] ${
                index === 0 || index === 5 ? "text-[#ffd47a]" : "text-[#b45309]"
              }`}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl font-black leading-tight">
                {reason.title}
              </h3>
              <p className={`mt-3 ${index === 0 || index === 5 ? "text-[#d9d4c8]" : "text-[#59616e]"}`}>{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
