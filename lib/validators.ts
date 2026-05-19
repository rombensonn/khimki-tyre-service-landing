import { z } from "zod";

export const serviceLabels = {
  TYRE: "Шиномонтаж",
  AUTO_SERVICE: "Автосервис",
  CAR_WASH: "Автомойка",
  CONSULTATION: "Нужна консультация",
} as const;

export const contactMethodLabels = {
  PHONE: "Звонок",
  WHATSAPP: "WhatsApp",
  TELEGRAM: "Telegram",
} as const;

export function sanitizeText(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const requiredTextField = (maxLength: number, requiredMessage: string) =>
  z
    .string({ required_error: requiredMessage })
    .trim()
    .min(1, requiredMessage)
    .max(maxLength, `Не больше ${maxLength} символов`)
    .transform(sanitizeText);

const textField = (maxLength: number) => {
  return z
    .string()
    .trim()
    .max(maxLength, `Не больше ${maxLength} символов`)
    .transform(sanitizeText)
    .optional()
    .or(z.literal(""))
    .transform((value) => {
      if (!value) {
        return undefined;
      }

      return sanitizeText(value);
    });
};

export const leadRequestSchema = z.object({
  name: requiredTextField(80, "Укажите имя"),
  phone: z
    .string({ required_error: "Укажите телефон" })
    .trim()
    .max(40, "Телефон слишком длинный")
    .transform(sanitizeText)
    .refine((phone) => phone.replace(/\D/g, "").length >= 10, {
      message: "Укажите корректный телефон",
    }),
  serviceType: z.enum(["TYRE", "AUTO_SERVICE", "CAR_WASH", "CONSULTATION"], {
    required_error: "Выберите услугу",
  }),
  carModel: textField(120),
  problemDescription: textField(700),
  preferredDate: textField(40),
  preferredTime: textField(40),
  contactMethod: z.enum(["PHONE", "WHATSAPP", "TELEGRAM"]).default("PHONE"),
  comment: textField(700),
  source: textField(120),
  companyWebsite: z.string().max(120).optional(),
  personalDataConsent: z
    .boolean()
    .refine(Boolean, "Необходимо согласие на обработку персональных данных"),
  privacyPolicyConsent: z
    .boolean()
    .refine(Boolean, "Необходимо согласие с политикой обработки данных"),
});

export type LeadRequest = z.infer<typeof leadRequestSchema>;

export function formatLeadMessage(lead: {
  name: string;
  phone: string;
  serviceType: keyof typeof serviceLabels;
  carModel?: string | null;
  problemDescription?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  contactMethod: keyof typeof contactMethodLabels;
  comment?: string | null;
  source?: string | null;
}) {
  return [
    "Новая заявка с сайта",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Услуга: ${serviceLabels[lead.serviceType]}`,
    `Авто: ${lead.carModel || "-"}`,
    `Что нужно: ${lead.problemDescription || "-"}`,
    `Дата: ${lead.preferredDate || "-"}`,
    `Время: ${lead.preferredTime || "-"}`,
    `Способ связи: ${contactMethodLabels[lead.contactMethod]}`,
    `Комментарий: ${lead.comment || "-"}`,
    `Источник: ${lead.source || "website"}`,
  ].join("\n");
}

export function toFieldErrors(error: z.ZodError) {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const path = issue.path[0];

    if (typeof path === "string" && !acc[path]) {
      acc[path] = issue.message;
    }

    return acc;
  }, {});
}
