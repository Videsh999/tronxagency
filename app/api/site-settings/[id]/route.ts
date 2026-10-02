import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/lib/models/SiteSettings";
import mongoose from "mongoose";

type Params = {
  params: Promise<{ id: string }>;
};

// GET ONE
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
          error: "Invalid site settings ID",
        },
        { status: 400 }
      );
    }

    const settings = await SiteSettings.findById(id).lean();

    if (!settings) {
      return NextResponse.json(
        {
          success: false,
          error: "Site settings not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: settings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/site-settings/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch site settings",
      },
      { status: 500 }
    );
  }
}

// PATCH
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
          error: "Invalid site settings ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedSettings = await SiteSettings.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSettings) {
      return NextResponse.json(
        {
          success: false,
          error: "Site settings not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedSettings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/site-settings/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update site settings",
      },
      { status: 500 }
    );
  }
}

// DELETE
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
          error: "Invalid site settings ID",
        },
        { status: 400 }
      );
    }

    const deletedSettings = await SiteSettings.findByIdAndDelete(id);

    if (!deletedSettings) {
      return NextResponse.json(
        {
          success: false,
          error: "Site settings not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Site settings deleted successfully",
        data: deletedSettings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/site-settings/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete site settings",
      },
      { status: 500 }
    );
  }
}