import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";
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
          error: "Invalid portfolio ID",
        },
        { status: 400 }
      );
    }

    const item = await Portfolio.findById(id).lean();

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          error: "Portfolio item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: item,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/portfolio/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch portfolio item",
      },
      { status: 500 }
    );
  }
}

// UPDATE
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
          error: "Invalid portfolio ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (body.slug) {
      body.slug = body.slug.trim().toLowerCase();

      const existingItem = await Portfolio.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });

      if (existingItem) {
        return NextResponse.json(
          {
            success: false,
            error: "A portfolio item with this slug already exists",
          },
          { status: 400 }
        );
      }
    }

    if (body.title) {
      body.title = body.title.trim();
    }

    const updatedItem = await Portfolio.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return NextResponse.json(
        {
          success: false,
          error: "Portfolio item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/portfolio/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update portfolio item",
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
          error: "Invalid portfolio ID",
        },
        { status: 400 }
      );
    }

    const deletedItem = await Portfolio.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json(
        {
          success: false,
          error: "Portfolio item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Portfolio item deleted successfully",
        data: deletedItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/portfolio/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete portfolio item",
      },
      { status: 500 }
    );
  }
}