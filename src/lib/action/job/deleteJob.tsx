"use server";

import { db } from "@/drizzle/db";
import { job } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteJob(id: number) {
  await db.delete(job).where(eq(job.id, id));

  revalidatePath("/admin");
}
