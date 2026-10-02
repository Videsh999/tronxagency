import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Homepage from "@/lib/models/Homepage";

export async function GET() {
  try {
    await connectDB();

    const homepage = await Homepage.findOne().lean();

    return NextResponse.json(
      {
        success: true,
        data: homepage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/homepage error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch homepage",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const homepage = await Homepage.create(body);

    return NextResponse.json(
      {
        success: true,
        data: homepage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/homepage error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create homepage",
      },
      { status: 500 }
    );
  }
}