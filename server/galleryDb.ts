import { desc, eq } from "drizzle-orm";
import { galleryImages, InsertGalleryImage } from "../drizzle/schema";
import { getDb } from "./db";

export async function createGalleryImage(image: InsertGalleryImage) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(galleryImages).values(image);
  return result;
}

export async function getAllGalleryImages() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get gallery images: database not available");
    return [];
  }

  return await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
}

export async function getGalleryImageById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserGalleryImages(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user gallery images: database not available");
    return [];
  }

  return await db.select().from(galleryImages)
    .where(eq(galleryImages.userId, userId))
    .orderBy(desc(galleryImages.createdAt));
}

export async function deleteGalleryImage(id: number, userId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Verify ownership before deleting
  const image = await getGalleryImageById(id);
  if (!image || image.userId !== userId) {
    throw new Error("Unauthorized to delete this image");
  }

  await db.delete(galleryImages).where(eq(galleryImages.id, id));
  return image;
}
