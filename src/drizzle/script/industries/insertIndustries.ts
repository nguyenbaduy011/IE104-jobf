import { Industries } from "@/drizzle/seed/industrySeed";
import { industry } from "@/drizzle/schema/schema";
import { db } from "@/drizzle/db";

export async function InsertIndustries() {
  try {
    const insertedIndustries = await Promise.all(
      Industries.map(async (Industry) => {
        return await db.insert(industry).values({
          id: Industry.id,
          name: Industry.name,
        });
      })
    );
    return insertedIndustries;
  } catch (error) {
    console.error("Error inserting levels:", error);
    throw error;
  }
}
