import { NextResponse } from "next/server";
import { getIndustry } from "@/lib/action/getIndustry";

export async function GET() {
  try {
    const industries = await getIndustry();
    return NextResponse.json({ industry: industries });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching industries", error },
      { status: 500 }
    );
  }
}
