"use server";

import { db } from "@/drizzle/db";
import { area } from "@/drizzle/schema/schema";

export async function getArea() {
  const result = await db.select().from(area);
  return result;
}
