import { NextResponse } from "next/server";
import { getJobCompany } from "@/lib/action/getJob";

export async function GET() {
  try {
    const jobs = await getJobCompany();
    return NextResponse.json({ job: jobs });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching jobs", error },
      { status: 500 }
    );
  }
}
