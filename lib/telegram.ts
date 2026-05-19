import { env } from "@/lib/env";
import { formatLeadMessage } from "@/lib/validators";

type LeadForNotification = Parameters<typeof formatLeadMessage>[0];

export async function sendTelegramLead(lead: LeadForNotification) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.info(
      "[leads] Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.",
    );
    return;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: formatLeadMessage(lead),
          disable_web_page_preview: true,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[leads] Telegram notification failed:", errorText);
    }
  } catch (error) {
    console.error("[leads] Telegram notification error:", error);
  }
}
