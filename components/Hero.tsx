"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import { CalendarCheck, MapPin, Phone, Star, Timer, Wrench } from "lucide-react";

import { business } from "@/lib/env";
import { withBasePath } from "@/lib/paths";

const proofItems = [
  { icon: Star, label: "4,4 на Яндекс.Картах" },
  { icon: CalendarCheck, label: "65 оценок клиентов" },
  { icon: Timer, label: "до 23:00 ежедневно" },
  { icon: Wrench, label: "колеса, сервис, мойка" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#2b313d] bg-[#171b24] text-white">
      <div className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="absolute -left-28 top-12 -z-10 h-52 w-[620px] -rotate-12 bg-[#f5a524]/12" />
      <div className="absolute bottom-0 right-0 -z-10 h-32 w-1/2 bg-[#f5a524]/10 [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" />
      <div className="container grid min-h-[640px] gap-10 py-12 lg:grid-cols-[0.9fr_0.78fr] lg:items-center lg:py-16">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.08] px-3 py-2 text-sm font-black text-[#ffd47a] backdrop-blur">
            <MapPin aria-hidden="true" size={17} />
            Химки, микрорайон Новогорск
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-normal text-[#fffaf2] sm:text-5xl lg:text-7xl">
            Шиномонтаж, сервис и мойка без лишних кругов
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#d9d4c8] sm:text-xl">
            Запишитесь на удобное время: переобуем колеса, проверим
            балансировку, поможем с ремонтом и приведем автомобиль в порядок на
            мойке.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary" href="#booking">
              <CalendarCheck aria-hidden="true" size={20} />
              Записаться на услугу
            </a>
            <a className="button-ghost border-white/20 bg-white/[0.09] text-white hover:bg-white hover:text-[#171b24]" href={business.phoneHref}>
              <Phone aria-hidden="true" size={20} />
              Позвонить сейчас
            </a>
          </div>

          <p className="mt-4 max-w-2xl text-sm font-semibold text-[#b8c0cc]">
            После заявки администратор подтвердит свободное время и подскажет
            ориентир по стоимости.
          </p>

          <motion.ul
            animate={{ opacity: 1, y: 0 }}
            className="mt-9 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
          >
            {proofItems.map((item) => (
              <li
                className="flex min-h-20 items-center gap-3 border-l-4 border-[#f5a524] bg-white/[0.075] p-4 backdrop-blur"
                key={item.label}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#fffaf2] text-[#b45309]">
                  <item.icon aria-hidden="true" size={21} />
                </span>
                <span className="text-sm font-black leading-snug text-[#fffaf2]">{item.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative min-h-[420px] overflow-hidden rounded-md border border-white/15 bg-[#0f141c] shadow-[0_30px_80px_rgba(0,0,0,0.34)] sm:min-h-[540px] lg:min-h-[620px]"
          initial={{ opacity: 0, x: 24 }}
          transition={{ delay: 0.08, duration: 0.5, ease: "easeOut" }}
        >
          <img
            alt="Мастер шиномонтажа работает с колесом в современном автосервисе"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            src={withBasePath("/images/hero-workshop-generated.jpg")}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#171b24] via-[#171b24]/70 to-transparent p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-white/15 bg-white/[0.1] p-4 backdrop-blur">
                <p className="text-3xl font-black text-[#ffd47a]">3 в 1</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-[#d9d4c8]">
                  колеса / ремонт / мойка
                </p>
              </div>
              <div className="border border-white/15 bg-white/[0.1] p-4 backdrop-blur">
                <p className="text-3xl font-black text-[#ffd47a]">23:00</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-[#d9d4c8]">
                  вечерние записи
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
