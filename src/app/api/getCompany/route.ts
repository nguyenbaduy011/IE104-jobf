import { NextResponse } from "next/server";
import { getCompany } from "@/lib/action/getCompany";

export async function GET() {
  try {
    const companies = await getCompany();
    return NextResponse.json({ company: companies });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching companies", error },
      { status: 500 }
    );
  }
}
