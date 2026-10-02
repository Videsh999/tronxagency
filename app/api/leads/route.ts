import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";

export async function GET() {
  try {
    await connectDB();

    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: leads.length,
        data: leads,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/leads error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch leads",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request body",
        },
        { status: 400 }
      );
    }

    const {
      name,
      phone,
      email,
      businessName,
      serviceInterested,
      projectDescription,
      status,
    } = body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required",
        },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number is required",
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Email address is required",
        },
        { status: 400 }
      );
    }

    if (
      status &&
      !["new", "contacted", "closed"].includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Status must be new, contacted, or closed",
        },
        { status: 400 }
      );
    }

    const newLead = await Lead.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      businessName: businessName?.trim(),
      serviceInterested: serviceInterested?.trim(),
      projectDescription,
      status: status || "new",
    });

    return NextResponse.json(
      {
        success: true,
        data: newLead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/leads error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create lead",
      },
      { status: 500 }
    );
  }
}