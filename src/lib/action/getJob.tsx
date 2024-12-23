"use server";

import { db } from "@/drizzle/db";
import { job } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";

export async function getJob() {
  const result = await db.select().from(job);
  return result;
}

export async function getOneJob(jobID: number) {
  const result = await db.query.job.findFirst({
    where: eq(job.id, jobID),
    with: {
      company: true,
    },
  });
  return result;
}

export async function getJobCompany() {
  const result = await db.query.job.findMany({
    with: {
      company: true,
    },
  });
  return result;
}
