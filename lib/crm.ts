import { env } from "@/lib/env";
import { formatLeadMessage } from "@/lib/validators";

type LeadForNotification = Parameters<typeof formatLeadMessage>[0] & {
  id?: string;
  createdAt?: Date;
};

export async function sendCrmWebhook(lead: LeadForNotification) {
  if (!env.CRM_WEBHOOK_URL) {
    console.info("[leads] CRM webhook skipped: CRM_WEBHOOK_URL is not configured.");
    return;
  }

  try {
    const response = await fetch(env.CRM_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[leads] CRM webhook failed:", errorText);
    }
  } catch (error) {
    console.error("[leads] CRM webhook error:", error);
  }
}
