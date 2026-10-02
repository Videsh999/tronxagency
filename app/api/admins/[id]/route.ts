import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import mongoose from "mongoose";

type Params = {
  params: Promise<{ id: string }>;
};

// GET ONE ADMIN
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin ID",
        },
        { status: 400 }
      );
    }

    const admin = await Admin.findById(id)
      .select("-passwordHash")
      .lean();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Admin not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: admin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/admins/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch admin",
      },
      { status: 500 }
    );
  }
}

// PATCH ADMIN
export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (body.email) {
      body.email = body.email.trim().toLowerCase();

      const existingAdmin = await Admin.findOne({
        email: body.email,
        _id: { $ne: id },
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
    }

    if (body.name) {
      body.name = body.name.trim();
    }

    if (body.role && !["admin", "superadmin"].includes(body.role)) {
      return NextResponse.json(
        {
          success: false,
          error: "Role must be admin or superadmin",
        },
        { status: 400 }
      );
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-passwordHash")
      .lean();

    if (!updatedAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: "Admin not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedAdmin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/admins/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update admin",
      },
      { status: 500 }
    );
  }
}

// DELETE ADMIN
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin ID",
        },
        { status: 400 }
      );
    }

    const deletedAdmin = await Admin.findByIdAndDelete(id)
      .select("-passwordHash")
      .lean();

    if (!deletedAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: "Admin not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin deleted successfully",
        data: deletedAdmin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/admins/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete admin",
      },
      { status: 500 }
    );
  }
}