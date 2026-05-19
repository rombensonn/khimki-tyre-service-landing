import { CalendarClock, Phone } from "lucide-react";

import { business } from "@/lib/env";

export default function FloatingCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#c9c1b4] bg-[#fffaf2]/[0.96] p-3 shadow-[0_-14px_34px_rgba(23,27,36,0.16)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a className="button-secondary" href={business.phoneHref}>
          <Phone aria-hidden="true" size={19} />
          Позвонить
        </a>
        <a className="button-primary" href="#booking">
          <CalendarClock aria-hidden="true" size={19} />
          Записаться
        </a>
      </div>
    </div>
  );
}
