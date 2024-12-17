"use server";

import { db } from "@/drizzle/db";
import { company } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";

export async function getCompany() {
  const result = await db.select().from(company);
  return result;
}

export async function getOneCompany(companyID: number) {
  const result = await db.query.company.findFirst({
    where: eq(company.id, companyID),
    with: {
      industry: true,
      area: true,
    },
  });
  return result;
}
