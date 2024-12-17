"use server";

import { db } from "@/drizzle/db";
import { industry } from "@/drizzle/schema/schema";

export async function getIndustry() {
  const result = await db.select().from(industry);
  return result;
}
