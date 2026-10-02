import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/lib/models/Testimonial";

export async function GET() {
  try {
    await connectDB();

    const testimonials = await Testimonial.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: testimonials.length,
        data: testimonials,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/testimonials error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch testimonials",
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

    const { name, company, role, content, image, rating, published, order } =
      body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required",
        },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Content is required",
        },
        { status: 400 }
      );
    }

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({
      name: name.trim(),
      company: company?.trim(),
      role: role?.trim(),
      content: content.trim(),
      image: image?.trim(),
      rating,
      published: published ?? true,
      order: order ?? 0,
    });

    return NextResponse.json(
      {
        success: true,
        data: newTestimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/testimonials error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create testimonial",
      },
      { status: 500 }
    );
  }
}