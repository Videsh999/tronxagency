import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/lib/models/Service";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get("all") === "true";
    const publishedParam = searchParams.get("published");

    let query: Record<string, unknown> = { published: true };
    if (includeAll) {
      query = {};
    } else if (publishedParam !== null) {
      query = { published: publishedParam === "true" };
    }

    const services = await Service.find(query)
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: services.length,
        data: services,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
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

    const { title, slug } = body || {};

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 }
      );
    }

    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Slug is required",
        },
        { status: 400 }
      );
    }

    const existingService = await Service.findOne({
      slug: slug.trim().toLowerCase(),
    });

    if (existingService) {
      return NextResponse.json(
        {
          success: false,
          error: "A service with this slug already exists",
        },
        { status: 400 }
      );
    }

    const newService = await Service.create({
      ...body,
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
    });

    return NextResponse.json(
      {
        success: true,
        data: newService,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST /api/services error:", error);

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
          error: "A service with this unique field already exists",
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
