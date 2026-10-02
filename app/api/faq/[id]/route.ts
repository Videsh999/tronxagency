import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FAQ from "@/lib/models/FAQ";
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
          error: "Invalid FAQ ID",
        },
        { status: 400 }
      );
    }

    const faq = await FAQ.findById(id).lean();

    if (!faq) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: faq,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/faq/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch FAQ",
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
          error: "Invalid FAQ ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (body.question) {
      body.question = body.question.trim();
    }

    if (body.answer) {
      body.answer = body.answer.trim();
    }

    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFAQ) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedFAQ,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/faq/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update FAQ",
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
          error: "Invalid FAQ ID",
        },
        { status: 400 }
      );
    }

    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return NextResponse.json(
        {
          success: false,
          error: "FAQ not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "FAQ deleted successfully",
        data: deletedFAQ,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/faq/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete FAQ",
      },
      { status: 500 }
    );
  }
}