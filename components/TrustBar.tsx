import { CalendarDays, Clock3, MapPinned, ShieldCheck, Wrench } from "lucide-react";

const items = [
  { icon: CalendarDays, label: "Работаем каждый день" },
  { icon: Clock3, label: "До 23:00 в будни" },
  { icon: ShieldCheck, label: "Можно записаться заранее" },
  { icon: Wrench, label: "Шиномонтаж + сервис + мойка" },
  { icon: MapPinned, label: "Можно дождаться результата на месте" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-[#c9c1b4] bg-[#fffaf2] py-4" aria-label="Короткие преимущества">
      <div className="container grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div
            className="flex min-h-20 items-center gap-3 border-l-2 border-[#f5a524] bg-[#ece7dc] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]"
            key={item.label}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#171b24] text-[#f5a524]">
              <item.icon aria-hidden="true" size={20} />
            </span>
            <span className="text-sm font-black leading-snug text-[#171b24]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
