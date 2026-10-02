import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/lib/models/Testimonial";
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
          error: "Invalid testimonial ID",
        },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findById(id).lean();

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          error: "Testimonial not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: testimonial,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/testimonials/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch testimonial",
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
          error: "Invalid testimonial ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (body.name) {
      body.name = body.name.trim();
    }

    if (body.company) {
      body.company = body.company.trim();
    }

    if (body.role) {
      body.role = body.role.trim();
    }

    if (body.content) {
      body.content = body.content.trim();
    }

    if (body.image) {
      body.image = body.image.trim();
    }

    if (body.rating !== undefined && (body.rating < 1 || body.rating > 5)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        {
          success: false,
          error: "Testimonial not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedTestimonial,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/testimonials/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update testimonial",
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
          error: "Invalid testimonial ID",
        },
        { status: 400 }
      );
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        {
          success: false,
          error: "Testimonial not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial deleted successfully",
        data: deletedTestimonial,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/testimonials/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete testimonial",
      },
      { status: 500 }
    );
  }
}