import nodemailer from "nodemailer";

import { env } from "@/lib/env";
import { formatLeadMessage } from "@/lib/validators";

type LeadForNotification = Parameters<typeof formatLeadMessage>[0];

export async function sendEmailLead(lead: LeadForNotification) {
  const smtpReady =
    env.SMTP_HOST &&
    env.SMTP_PORT &&
    env.SMTP_USER &&
    env.SMTP_PASS &&
    env.LEADS_TO_EMAIL;

  if (!smtpReady) {
    console.info(
      "[leads] Email notification skipped: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS or LEADS_TO_EMAIL is not configured.",
    );
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    const text = formatLeadMessage(lead);

    await transporter.sendMail({
      from: env.SMTP_USER,
      to: env.LEADS_TO_EMAIL,
      subject: "Новая заявка с сайта шиномонтажа",
      text,
      html: `<pre style="font-family:Arial,sans-serif;white-space:pre-wrap;line-height:1.5">${text}</pre>`,
    });
  } catch (error) {
    console.error("[leads] Email notification error:", error);
  }
}
