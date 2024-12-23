import { NextResponse } from "next/server";
import { getArea } from "@/lib/action/getArea";

export async function GET() {
  try {
    const areas = await getArea();
    return NextResponse.json({ area: areas });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching areas", error },
      { status: 500 }
    );
  }
}
