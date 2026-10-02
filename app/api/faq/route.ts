import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FAQ from "@/lib/models/FAQ";

export async function GET() {
  try {
    await connectDB();

    const faqs = await FAQ.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: faqs.length,
        data: faqs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/faq error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch FAQs",
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

    const { question, answer, published, order } = body || {};

    if (
      !question ||
      typeof question !== "string" ||
      !question.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Question is required",
        },
        { status: 400 }
      );
    }

    if (
      !answer ||
      typeof answer !== "string" ||
      !answer.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Answer is required",
        },
        { status: 400 }
      );
    }

    const newFAQ = await FAQ.create({
      question: question.trim(),
      answer: answer.trim(),
      published: published ?? true,
      order: order ?? 0,
    });

    return NextResponse.json(
      {
        success: true,
        data: newFAQ,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/faq error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create FAQ",
      },
      { status: 500 }
    );
  }
}