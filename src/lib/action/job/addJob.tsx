"use server";

import { db } from "@/drizzle/db";
import { company, InsertJobType, job } from "@/drizzle/schema/schema";
import { toSlug } from "@/lib/utils";
import { jobSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
// import { eq } from "drizzle-orm";

export async function addJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const {
    jobCompany,
    jobTitle,
    salary,
    requiredSkills,
    jobDescription,
    benefits,
    workingWay,
    jobRequirements,
  } = jobSchema.parse(values);

  const slug = toSlug(jobTitle);
  const companyResult = await db
    .select({ companyID: company.id })
    .from(company)
    .where(eq(company.name, jobCompany));
  const newProg: InsertJobType = {
    companyID: Number(companyResult[0]?.companyID || 0),
    jobTitle,
    salary,
    requiredSkills,
    jobDescription,
    benefits,
    workingWay,
    jobRequirements,
    slug,
  };

  await db.insert(job).values(newProg);

  revalidatePath("/");
}
