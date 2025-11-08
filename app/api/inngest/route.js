import { serve } from "inngest/next";
import arcjet from "@arcjet/next";
import { inngest } from "@/lib/inngest/client";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    { rateLimit: { mode: "LIVE", interval: "1m", max: 60 } },
  ],
});
 
export async function POST(req) {
  const decision = await aj.protect(req);
  if (!decision.ok) {
    return new Response("Rate limit exceeded", { status: 429 });
  }
}
import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransactions,
    generateMonthlyReports,
    checkBudgetAlerts,
  ],
});
