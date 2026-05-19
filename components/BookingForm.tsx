"use client";

import { FormEvent, useState } from "react";
import { CalendarClock, CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { business } from "@/lib/env";

type ServiceType = "TYRE" | "AUTO_SERVICE" | "CAR_WASH" | "CONSULTATION" | "";
type ContactMethod = "PHONE" | "WHATSAPP" | "TELEGRAM";

type FormState = {
  name: string;
  phone: string;
  serviceType: ServiceType;
  carModel: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  comment: string;
  contactMethod: ContactMethod;
  personalDataConsent: boolean;
  privacyPolicyConsent: boolean;
  companyWebsite: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  serviceType: "",
  carModel: "",
  problemDescription: "",
  preferredDate: "",
  preferredTime: "",
  comment: "",
  contactMethod: "PHONE",
  personalDataConsent: false,
  privacyPolicyConsent: false,
  companyWebsite: "",
};

const serviceOptions = [
  { value: "TYRE", label: "Шиномонтаж" },
  { value: "AUTO_SERVICE", label: "Автосервис" },
  { value: "CAR_WASH", label: "Автомойка" },
  { value: "CONSULTATION", label: "Не знаю, нужна консультация" },
] as const;

const contactOptions = [
  { value: "PHONE", label: "Звонок", icon: Phone },
  { value: "WHATSAPP", label: "WhatsApp", icon: MessageCircle },
  { value: "TELEGRAM", label: "Telegram", icon: MessageCircle },
] as const;

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const clientErrors = validateClient(form);

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus("error");
      setMessage("Проверьте обязательные поля.");
      return;
    }

    setStatus("loading");
    setMessage("");

    if (isStaticExport) {
      window.location.href = buildWhatsAppHref(form);
      setStatus("success");
      setMessage(
        "Откроем WhatsApp с данными заявки. Если приложение не открылось, позвоните по номеру на сайте.",
      );
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          serviceType: form.serviceType || undefined,
          source: "landing",
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrors(data.errors || {});
        setMessage(data.message || "Не удалось отправить заявку.");
        return;
      }

      setStatus("success");
      setErrors({});
      setMessage(
        data.message ||
          "Заявка отправлена. Мы свяжемся с вами, подтвердим время и подскажем ориентир по стоимости.",
      );
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage(
        "Не удалось отправить заявку. Позвоните нам или попробуйте еще раз позже.",
      );
    }
  }

  return (
    <section className="section relative isolate overflow-hidden bg-[#171b24] text-[#fffaf2]" id="booking">
      <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute -right-20 top-0 -z-10 h-28 w-[520px] bg-[#f5a524]/16 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]" />
      <div className="container grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="section-kicker">Запись</p>
          <h2 className="section-title">
            Оставьте заявку - подтвердим время до приезда
          </h2>
          <p className="mt-5 max-w-xl text-lg text-[#d9d4c8]">
            Оставьте заявку - администратор подтвердит свободное время и
            подскажет, что подготовить к приезду. Стоимость зависит от задачи,
            автомобиля и объема работ.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              "Уточняем услугу, автомобиль и удобное время",
              "Сразу фиксируем способ связи: звонок, WhatsApp или Telegram",
              "Способ оплаты лучше уточнить при записи",
              "После работ рекомендуем проверить результат на месте",
            ].map((item) => (
              <div
                className="flex gap-3 border-l-4 border-[#f5a524] bg-white/[0.075] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                key={item}
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#64d5bd]"
                  size={20}
                />
                <p className="text-sm font-bold text-[#fffaf2]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <form
          className="border border-[#c9c1b4] bg-[#fffaf2] p-5 text-[#151922] shadow-[0_28px_70px_rgba(0,0,0,0.28)] sm:p-7"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-[#171b24]">
                Записаться на услугу
              </h3>
              <p className="mt-1 text-sm text-[#59616e]">
                Поля со звездочкой обязательны.
              </p>
            </div>
            <span className="hidden size-12 items-center justify-center rounded-md bg-[#171b24] text-[#f5a524] sm:flex">
              <CalendarClock aria-hidden="true" size={24} />
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              autoComplete="name"
              error={errors.name}
              id="name"
              label="Имя"
              onChange={(value) => updateField("name", value)}
              required
              value={form.name}
            />
            <TextInput
              autoComplete="tel"
              error={errors.phone}
              id="phone"
              inputMode="tel"
              label="Телефон"
              onChange={(value) => updateField("phone", formatPhone(value))}
              placeholder="+7 (___) ___-__-__"
              required
              type="tel"
              value={form.phone}
            />

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-black text-[#171b24]" htmlFor="serviceType">
                Услуга <span className="text-[#b91c1c]">*</span>
              </label>
              <select
                aria-describedby={errors.serviceType ? "serviceType-error" : undefined}
                aria-invalid={Boolean(errors.serviceType)}
                className={inputClass(Boolean(errors.serviceType))}
                id="serviceType"
                onChange={(event) =>
                  updateField("serviceType", event.target.value as ServiceType)
                }
                value={form.serviceType}
              >
                <option value="">Выберите услугу</option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError id="serviceType-error" message={errors.serviceType} />
            </div>

            <TextInput
              autoComplete="off"
              error={errors.carModel}
              id="carModel"
              label="Марка и модель автомобиля"
              onChange={(value) => updateField("carModel", value)}
              placeholder="Например: Kia Rio, R16"
              value={form.carModel}
            />
            <TextInput
              error={errors.preferredDate}
              id="preferredDate"
              label="Желаемая дата"
              onChange={(value) => updateField("preferredDate", value)}
              type="date"
              value={form.preferredDate}
            />
            <TextInput
              error={errors.preferredTime}
              id="preferredTime"
              label="Желаемое время"
              onChange={(value) => updateField("preferredTime", value)}
              type="time"
              value={form.preferredTime}
            />

            <div>
              <label className="mb-2 block text-sm font-black text-[#171b24]" htmlFor="problemDescription">
                Что нужно сделать
              </label>
              <textarea
                aria-describedby={
                  errors.problemDescription ? "problemDescription-error" : undefined
                }
                aria-invalid={Boolean(errors.problemDescription)}
                className={`${inputClass(Boolean(errors.problemDescription))} min-h-28 resize-y`}
                id="problemDescription"
                maxLength={700}
                onChange={(event) =>
                  updateField("problemDescription", event.target.value)
                }
                placeholder="Например: переобуть резину, проверить колесо, появилась вибрация"
                value={form.problemDescription}
              />
              <FieldError
                id="problemDescription-error"
                message={errors.problemDescription}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-[#171b24]" htmlFor="comment">
                Комментарий
              </label>
              <textarea
                aria-describedby={errors.comment ? "comment-error" : undefined}
                aria-invalid={Boolean(errors.comment)}
                className={`${inputClass(Boolean(errors.comment))} min-h-28 resize-y`}
                id="comment"
                maxLength={700}
                onChange={(event) => updateField("comment", event.target.value)}
                placeholder="Удобные детали: срочность, вопросы по оплате, ожидание на месте"
                value={form.comment}
              />
              <FieldError id="comment-error" message={errors.comment} />
            </div>
          </div>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-black text-[#171b24]">
              Способ связи
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {contactOptions.map((option) => (
                <label
                  className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-black transition ${
                    form.contactMethod === option.value
                      ? "border-[#b45309] bg-[#ffe3ad] text-[#7c2d12]"
                      : "border-[#c9c1b4] bg-white text-[#171b24] hover:border-[#f5a524]"
                  }`}
                  key={option.value}
                >
                  <input
                    checked={form.contactMethod === option.value}
                    className="sr-only"
                    name="contactMethod"
                    onChange={() => updateField("contactMethod", option.value)}
                    type="radio"
                    value={option.value}
                  />
                  <option.icon aria-hidden="true" size={18} />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <input
            aria-hidden="true"
            autoComplete="off"
            className="hidden"
            name="companyWebsite"
            onChange={(event) => updateField("companyWebsite", event.target.value)}
            tabIndex={-1}
            value={form.companyWebsite}
          />

          <div className="mt-5 space-y-3">
            <Checkbox
              checked={form.personalDataConsent}
              error={errors.personalDataConsent}
              id="personalDataConsent"
              label={
                <>
                  Я согласен на{" "}
                  <Link className="font-black text-[#8a4b05] underline" href="/consent">
                    обработку персональных данных
                  </Link>
                </>
              }
              onChange={(value) => updateField("personalDataConsent", value)}
            />
            <Checkbox
              checked={form.privacyPolicyConsent}
              error={errors.privacyPolicyConsent}
              id="privacyPolicyConsent"
              label={
                <>
                  Я ознакомлен с{" "}
                  <Link className="font-black text-[#8a4b05] underline" href="/privacy">
                    Политикой обработки персональных данных
                  </Link>
                </>
              }
              onChange={(value) => updateField("privacyPolicyConsent", value)}
            />
          </div>

          <button
            className="button-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" size={20} />
                Отправляем
              </>
            ) : (
              "Записаться на шиномонтаж / сервис / мойку"
            )}
          </button>

          <p
            aria-live="polite"
            className={`mt-4 rounded-md border p-4 text-sm font-bold ${
              status === "success"
                ? "border-[#99f6e4] bg-[#f0fdfa] text-[#0f766e]"
                : status === "error"
                  ? "border-[#fecaca] bg-[#fef2f2] text-[#b91c1c]"
                  : "border-[#c9c1b4] bg-[#ece7dc] text-[#59616e]"
            }`}
          >
            {message ||
              "После заявки администратор подтвердит свободное время и подскажет ориентир по стоимости."}
          </p>
        </form>
      </div>
    </section>
  );
}

function buildWhatsAppHref(form: FormState) {
  const selectedService = serviceOptions.find(
    (option) => option.value === form.serviceType,
  );
  const details = [
    "Здравствуйте! Хочу записаться на услугу.",
    selectedService ? `Услуга: ${selectedService.label}` : undefined,
    `Имя: ${form.name}`,
    `Телефон: ${form.phone}`,
    form.carModel ? `Автомобиль: ${form.carModel}` : undefined,
    form.problemDescription ? `Что нужно: ${form.problemDescription}` : undefined,
    form.preferredDate ? `Дата: ${form.preferredDate}` : undefined,
    form.preferredTime ? `Время: ${form.preferredTime}` : undefined,
    form.comment ? `Комментарий: ${form.comment}` : undefined,
  ].filter(Boolean);

  return `${business.whatsappHref}?text=${encodeURIComponent(details.join("\n"))}`;
}

function TextInput({
  autoComplete,
  error,
  id,
  inputMode,
  label,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: {
  autoComplete?: string;
  error?: string;
  id: keyof FormState;
  inputMode?: "text" | "tel" | "email" | "numeric";
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label className="mb-2 block text-sm font-black text-[#171b24]" htmlFor={id}>
        {label} {required ? <span className="text-[#b91c1c]">*</span> : null}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={inputClass(Boolean(error))}
        id={id}
        inputMode={inputMode}
        maxLength={120}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function Checkbox({
  checked,
  error,
  id,
  label,
  onChange,
}: {
  checked: boolean;
  error?: string;
  id: keyof FormState;
  label: React.ReactNode;
  onChange: (value: boolean) => void;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 rounded-md border border-[#c9c1b4] bg-[#ece7dc] p-3 text-sm text-[#3a414d]">
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          checked={checked}
          className="mt-1 size-4 accent-[#b45309]"
          id={id}
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        <span>{label}</span>
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1 text-sm font-bold text-[#b91c1c]" id={id}>
      {message}
    </p>
  );
}

function inputClass(hasError: boolean) {
  return `min-h-12 w-full rounded-md border bg-white px-4 py-3 text-[#151922] shadow-[inset_0_1px_0_rgba(23,27,36,0.04)] transition placeholder:text-[#8f97a3] ${
    hasError
      ? "border-[#b91c1c] focus:border-[#b91c1c]"
      : "border-[#c9c1b4] focus:border-[#b45309]"
  }`;
}

function validateClient(form: FormState) {
  const nextErrors: FieldErrors = {};

  if (!form.name.trim()) {
    nextErrors.name = "Укажите имя";
  }

  if (form.phone.replace(/\D/g, "").length < 10) {
    nextErrors.phone = "Укажите корректный телефон";
  }

  if (!form.serviceType) {
    nextErrors.serviceType = "Выберите услугу";
  }

  if (!form.personalDataConsent) {
    nextErrors.personalDataConsent =
      "Необходимо согласие на обработку персональных данных";
  }

  if (!form.privacyPolicyConsent) {
    nextErrors.privacyPolicyConsent =
      "Необходимо согласие с политикой обработки данных";
  }

  return nextErrors;
}

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);

  const country = digits.slice(0, 1);
  const code = digits.slice(1, 4);
  const first = digits.slice(4, 7);
  const second = digits.slice(7, 9);
  const third = digits.slice(9, 11);

  let formatted = `+${country}`;

  if (code) {
    formatted += ` (${code}`;
  }

  if (code.length === 3) {
    formatted += ")";
  }

  if (first) {
    formatted += ` ${first}`;
  }

  if (second) {
    formatted += `-${second}`;
  }

  if (third) {
    formatted += `-${third}`;
  }

  return formatted;
}
