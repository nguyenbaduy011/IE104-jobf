import { NextResponse } from "next/server";
import { getJob } from "@/lib/action/getJob";

export async function GET() {
  try {
    const jobs = await getJob();
    return NextResponse.json({ job: jobs });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching jobs", error },
      { status: 500 }
    );
  }
}
