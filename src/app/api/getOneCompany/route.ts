import { NextResponse } from "next/server";
import { getOneCompany } from "@/lib/action/getCompany";

export async function POST(request: Request) {
  try {
    const { companyID } = await request.json();
    const result = await getOneCompany(companyID);
    return NextResponse.json({ company: result });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching company", error },
      { status: 500 }
    );
  }
}
