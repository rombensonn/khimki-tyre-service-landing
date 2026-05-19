import Link from "next/link";
import { connection } from "next/server";

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export default async function AdminPage() {
  if (isStaticExport) {
    return <StaticAdminPage />;
  }

  await connection();

  const [{ prisma }, { contactMethodLabels, serviceLabels }] = await Promise.all([
    import("@/lib/db"),
    import("@/lib/validators"),
  ]);

  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  return (
    <main className="min-h-dvh bg-[#ece7dc] px-4 py-8 text-[#151922]">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Админка</p>
            <h1 className="text-3xl font-black tracking-normal md:text-5xl">
              Заявки с сайта
            </h1>
            <p className="muted mt-2">
              Последние 100 заявок. Доступ закрыт Basic Auth через ADMIN_PASSWORD.
            </p>
          </div>
          <Link className="button-ghost" href="/">
            На сайт
          </Link>
        </div>

        <div className="card overflow-hidden">
          {leads.length === 0 ? (
            <p className="p-6 text-[#59616e]">Заявок пока нет.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-[#171b24] text-white">
                  <tr>
                    <th className="px-4 py-3 font-bold">Дата</th>
                    <th className="px-4 py-3 font-bold">Имя</th>
                    <th className="px-4 py-3 font-bold">Телефон</th>
                    <th className="px-4 py-3 font-bold">Услуга</th>
                    <th className="px-4 py-3 font-bold">Авто</th>
                    <th className="px-4 py-3 font-bold">Что нужно</th>
                    <th className="px-4 py-3 font-bold">Когда</th>
                    <th className="px-4 py-3 font-bold">Связь</th>
                    <th className="px-4 py-3 font-bold">Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr className="border-t border-[#c9c1b4]" key={lead.id}>
                      <td className="whitespace-nowrap px-4 py-3">
                        {lead.createdAt.toLocaleString("ru-RU")}
                      </td>
                      <td className="px-4 py-3 font-bold">{lead.name}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {serviceLabels[lead.serviceType]}
                      </td>
                      <td className="px-4 py-3">{lead.carModel || "-"}</td>
                      <td className="min-w-72 px-4 py-3">
                        {lead.problemDescription || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {[lead.preferredDate, lead.preferredTime]
                          .filter(Boolean)
                          .join(", ") || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {contactMethodLabels[lead.contactMethod]}
                      </td>
                      <td className="min-w-64 px-4 py-3">
                        {lead.comment || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StaticAdminPage() {
  return (
    <main className="min-h-dvh bg-[#ece7dc] px-4 py-8 text-[#151922]">
      <section className="mx-auto max-w-3xl">
        <p className="section-kicker">Админка</p>
        <h1 className="text-3xl font-black tracking-normal md:text-5xl">
          Админка недоступна на GitHub Pages
        </h1>
        <div className="card mt-6 space-y-4 border-l-4 border-[#f5a524] p-6 text-[#3a414d]">
          <p>
            GitHub Pages отдает только статические файлы, поэтому заявки и
            таблица администратора работают после деплоя на серверный Next.js
            хостинг с базой данных.
          </p>
          <Link className="button-primary" href="/">
            Вернуться на сайт
          </Link>
        </div>
      </section>
    </main>
  );
}
