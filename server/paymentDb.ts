import { eq } from "drizzle-orm";
import { payments, InsertPayment } from "../drizzle/schema";
import { getDb } from "./db";

export async function createPayment(payment: InsertPayment) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(payments).values(payment);
  return result;
}

export async function getPaymentByStripeSessionId(sessionId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(payments)
    .where(eq(payments.stripeCheckoutSessionId, sessionId))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function getPaymentByStripePaymentIntentId(paymentIntentId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(payments)
    .where(eq(payments.stripePaymentIntentId, paymentIntentId))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserPayments(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user payments: database not available");
    return [];
  }

  return await db.select().from(payments)
    .where(eq(payments.userId, userId));
}

export async function updatePaymentStatus(
  paymentIntentId: string,
  status: "pending" | "succeeded" | "failed" | "refunded",
  receiptUrl?: string
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const updateData: any = {
    status,
    updatedAt: new Date(),
  };

  if (receiptUrl) {
    updateData.receiptUrl = receiptUrl;
  }

  await db.update(payments)
    .set(updateData)
    .where(eq(payments.stripePaymentIntentId, paymentIntentId));
}
