import { Areas } from "@/drizzle/seed/areaSeed";
import { area } from "@/drizzle/schema/schema";
import { db } from "@/drizzle/db";

export async function InsertAreas() {
  try {
    const insertedAreas = await Promise.all(
      Areas.map(async (Area) => {
        return await db.insert(area).values({
          id: Area.id,
          name: Area.name,
        });
      })
    );
    return insertedAreas;
  } catch (error) {
    console.error("Error inserting levels:", error);
    throw error;
  }
}
