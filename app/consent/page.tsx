import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ConsentPage() {
  return (
    <>
      <Header />
      <main className="section">
        <article className="container max-w-3xl">
          <p className="section-kicker">Документ</p>
          <h1 className="section-title">Согласие на обработку персональных данных</h1>
          <div className="card mt-8 space-y-4 border-l-4 border-[#f5a524] p-6 text-[#3a414d]">
            <p className="font-bold text-[#171b24]">
              Требуется юридическое уточнение: реквизиты владельца сайта и
              финальная редакция согласия на обработку персональных данных.
            </p>
            <p>
              Отправляя форму заявки, пользователь подтверждает согласие на обработку
              персональных данных, указанных в форме, для связи по заявке,
              подтверждения времени визита и уточнения деталей услуги.
            </p>
            <p>
              Согласие действует до достижения целей обработки или до отзыва
              пользователем в порядке, который должен быть указан владельцем сайта.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
