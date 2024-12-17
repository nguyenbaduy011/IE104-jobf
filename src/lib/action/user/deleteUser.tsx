"use server";

import { db } from "@/drizzle/db";
import { user, account } from "@/drizzle/schema/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
  await db.delete(account).where(eq(account.userId, id));
  await db.delete(user).where(eq(user.id, id));

  revalidatePath("/admin");
}
