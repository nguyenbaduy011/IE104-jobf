"use server";

import { db } from "@/drizzle/db";
import { company } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteCompany(id: number) {
  await db.delete(company).where(eq(company.id, id));

  revalidatePath("/admin");
}
