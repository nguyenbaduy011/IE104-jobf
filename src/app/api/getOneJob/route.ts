import { NextResponse } from "next/server";
import { getOneJob } from "@/lib/action/getJob";

export async function POST(request: Request) {
  try {
    const { jobID } = await request.json();
    const result = await getOneJob(jobID);
    return NextResponse.json({ job: result });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching job", error },
      { status: 500 }
    );
  }
}
