"use server";
import { db } from "@/drizzle/db";
import {company, job } from "@/drizzle/schema/schema";
import { toSlug } from "@/lib/utils";
import { jobSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function editJob(formData: FormData, jobID: number) {
  const values = Object.fromEntries(formData.entries());
  const data = jobSchema.parse(values);

  const slug = toSlug(data.jobTitle);
  const companyResult = await db
    .select({ companyID: company.id })
    .from(company)
    .where(eq(company.name, data.jobCompany));

  await db
    .update(job)
    .set({
      ...data,
      companyID: companyResult[0]?.companyID,
      slug,
    })
    .where(eq(job.id, jobID));

  revalidatePath("/admin/jobs");
}
