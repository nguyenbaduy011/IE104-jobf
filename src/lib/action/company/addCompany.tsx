"use server";

import { db } from "@/drizzle/db";
import { area, company, industry } from "@/drizzle/schema/schema";
import { toSlug } from "@/lib/utils";
import { companySchema } from "@/lib/validations";
import { eq } from "drizzle-orm";

export async function addCompany(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const data = companySchema.parse(values);

  const slug = toSlug(data.name);
  const industryResult = await db
    .select({ industryID: industry.id })
    .from(industry)
    .where(eq(industry.name, data.companyIndustry));
  const areaResult = await db
    .select({ areaID: area.id })
    .from(area)
    .where(eq(area.name, data.companyArea));

  await db.insert(company).values({
    ...data,
    employeeNumber: data.employeeNumber === undefined ? 0 : data.employeeNumber,
    industryID: industryResult[0]?.industryID || "",
    areaID: areaResult[0]?.areaID || "",
    slug,
  });
}
