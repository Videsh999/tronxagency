import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";

export async function GET() {
  try {
    await connectDB();

    const settings = await SiteSettings.findOne().lean();

    return NextResponse.json(
      {
        success: true,
        data: settings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/site-settings error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch site settings",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const settings = await SiteSettings.create(body);

    return NextResponse.json(
      {
        success: true,
        data: settings,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/site-settings error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create site settings",
      },
      { status: 500 }
    );
  }
}