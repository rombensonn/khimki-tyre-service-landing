const faqs = [
  {
    question: "Можно ли записаться заранее?",
    answer:
      "Да, оставьте заявку или позвоните. Администратор подтвердит свободное время.",
  },
  {
    question: "Сколько стоит шиномонтаж?",
    answer:
      "Стоимость зависит от радиуса колес, типа автомобиля и дополнительных работ. Оставьте заявку - подскажем ориентир до приезда.",
  },
  {
    question: "Можно ли приехать вечером?",
    answer:
      "Да, сервис работает до 23:00. В будни с 08:00 до 23:00, в выходные с 09:00 до 23:00.",
  },
  {
    question: "Можно ли одновременно помыть машину и сделать шиномонтаж?",
    answer:
      "Да, на месте есть шиномонтаж, автомойка и автосервис. Удобно совместить несколько задач за один визит.",
  },
  {
    question: "Как понять, что меня точно записали?",
    answer:
      "После заявки администратор связывается с вами и подтверждает дату, время и услугу.",
  },
  {
    question: "Какие способы оплаты доступны?",
    answer:
      "Способ оплаты лучше уточнить при записи. Не обещаем оплату картой, если это не подтверждено владельцем.",
  },
];

export default function FAQ() {
  return (
    <section className="section bg-[#fffaf2]" id="faq">
      <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2 className="section-title">Частые вопросы перед визитом</h2>
          <p className="mt-5 text-lg text-[#59616e]">
            Коротко о записи, стоимости и вечерних визитах.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              className="group border border-[#c9c1b4] bg-[#ece7dc] p-5 transition open:border-[#171b24] open:bg-[#fffaf2]"
              key={faq.question}
            >
              <summary className="cursor-pointer list-none text-lg font-black text-[#171b24] marker:hidden">
                <span className="inline-flex w-full items-center justify-between gap-4">
                  {faq.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#171b24] text-[#f5a524] transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 text-[#59616e]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
