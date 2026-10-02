import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function GET() {
  try {
    await connectDB();

    const admins = await Admin.find()
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: admins.length,
        data: admins,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/admins error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch admins",
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

    const { name, email, passwordHash, role } = body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required",
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required",
        },
        { status: 400 }
      );
    }

    if (
      !passwordHash ||
      typeof passwordHash !== "string" ||
      !passwordHash.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Password hash is required",
        },
        { status: 400 }
      );
    }

    if (role && !["admin", "superadmin"].includes(role)) {
      return NextResponse.json(
        {
          success: false,
          error: "Role must be admin or superadmin",
        },
        { status: 400 }
      );
    }

    const existingAdmin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: "An admin with this email already exists",
        },
        { status: 400 }
      );
    }

    const newAdmin = await Admin.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: passwordHash.trim(),
      role: role || "admin",
    });

    const adminObj = newAdmin.toObject();
    const { passwordHash: _, ...responseData } = adminObj;

    return NextResponse.json(
      {
        success: true,
        data: responseData,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST /api/admins error:", error);

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ValidationError"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: (error as Error).message,
        },
        { status: 400 }
      );
    }

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "An admin with this email already exists",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}