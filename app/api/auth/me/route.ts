import { NextResponse } from "next/server";
import { getAuthAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getAuthAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { success: true, data: admin },
    { status: 200 }
  );
}
