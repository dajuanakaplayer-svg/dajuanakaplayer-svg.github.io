import { eq, desc } from "drizzle-orm";
import { applications, type InsertApplication } from "../drizzle/schema";
import { getDb } from "./db";

export async function createApplication(application: InsertApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(applications).values(application);
  return result;
}

export async function getUserApplication(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(applications)
    .where(eq(applications.userId, userId))
    .orderBy(desc(applications.createdAt))
    .limit(1);
  
  return result[0] || null;
}

export async function getAllApplications() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));
  
  return result;
}

export async function getPendingApplications() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(applications)
    .where(eq(applications.status, "pending"))
    .orderBy(desc(applications.createdAt));
  
  return result;
}

export async function updateApplicationStatus(
  applicationId: number,
  status: "approved" | "rejected",
  reviewedBy: number,
  reviewNotes?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(applications)
    .set({
      status,
      reviewedBy,
      reviewNotes,
      reviewedAt: new Date(),
    })
    .where(eq(applications.id, applicationId));
}

export async function getApplicationById(applicationId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(applications)
    .where(eq(applications.id, applicationId))
    .limit(1);
  
  return result[0] || null;
}
