import crypto from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { sendCrmWebhook } from "@/lib/crm";
import { prisma } from "@/lib/db";
import { sendEmailLead } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";
import { sendTelegramLead } from "@/lib/telegram";
import { leadRequestSchema, toFieldErrors } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const ipHash = hashIp(ip);
  const rate = rateLimit(`lead:${ipHash}`, {
    limit: 4,
    windowMs: 60_000,
  });

  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Слишком много отправок. Попробуйте еще раз через минуту.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rate.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Не удалось прочитать данные формы.",
      },
      { status: 400 },
    );
  }

  const parsed = leadRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Проверьте поля формы.",
        errors: toFieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({
      ok: true,
      message:
        "Заявка отправлена. Мы свяжемся с вами, подтвердим время и подскажем ориентир по стоимости.",
    });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        serviceType: parsed.data.serviceType,
        carModel: parsed.data.carModel,
        problemDescription: parsed.data.problemDescription,
        preferredDate: parsed.data.preferredDate,
        preferredTime: parsed.data.preferredTime,
        contactMethod: parsed.data.contactMethod,
        comment: parsed.data.comment,
        source: parsed.data.source || "website",
        userAgent: request.headers.get("user-agent"),
        ipHash,
      },
    });

    await Promise.allSettled([
      sendTelegramLead(lead),
      sendEmailLead(lead),
      sendCrmWebhook(lead),
    ]);

    return NextResponse.json(
      {
        ok: true,
        message:
          "Заявка отправлена. Мы свяжемся с вами, подтвердим время и подскажем ориентир по стоимости.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[leads] Failed to save lead:", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Не удалось отправить заявку. Позвоните нам или попробуйте еще раз позже.",
      },
      { status: 500 },
    );
  }
}

function getIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip: string) {
  return crypto
    .createHash("sha256")
    .update(`${ip}:${process.env.ADMIN_PASSWORD || "lead-salt"}`)
    .digest("hex")
    .slice(0, 32);
}
