import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Homepage from "@/lib/models/Homepage";
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
          error: "Invalid homepage ID",
        },
        { status: 400 }
      );
    }

    const homepage = await Homepage.findById(id).lean();

    if (!homepage) {
      return NextResponse.json(
        {
          success: false,
          error: "Homepage not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: homepage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/homepage/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch homepage",
      },
      { status: 500 }
    );
  }
}

//Patch ONE

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
          error: "Invalid homepage ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedHomepage = await Homepage.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHomepage) {
      return NextResponse.json(
        {
          success: false,
          error: "Homepage not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedHomepage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/homepage/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update homepage",
      },
      { status: 500 }
    );
  }
}

//Delete ONE

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
          error: "Invalid homepage ID",
        },
        { status: 400 }
      );
    }

    const deletedHomepage = await Homepage.findByIdAndDelete(id);

    if (!deletedHomepage) {
      return NextResponse.json(
        {
          success: false,
          error: "Homepage not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Homepage deleted successfully",
        data: deletedHomepage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/homepage/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete homepage",
      },
      { status: 500 }
    );
  }
}