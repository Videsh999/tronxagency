import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
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
          error: "Invalid lead ID",
        },
        { status: 400 }
      );
    }

    const lead = await Lead.findById(id).lean();

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          error: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: lead,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/leads/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch lead",
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
          error: "Invalid lead ID",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (body.name) {
      body.name = body.name.trim();
    }

    if (body.phone) {
      body.phone = body.phone.trim();
    }

    if (body.email) {
      body.email = body.email.trim().toLowerCase();
    }

    if (body.businessName) {
      body.businessName = body.businessName.trim();
    }

    if (body.serviceInterested) {
      body.serviceInterested = body.serviceInterested.trim();
    }

    if (
      body.status &&
      !["new", "contacted", "closed"].includes(body.status)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Status must be new, contacted, or closed",
        },
        { status: 400 }
      );
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLead) {
      return NextResponse.json(
        {
          success: false,
          error: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedLead,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/leads/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update lead",
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
          error: "Invalid lead ID",
        },
        { status: 400 }
      );
    }

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json(
        {
          success: false,
          error: "Lead not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead deleted successfully",
        data: deletedLead,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/leads/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete lead",
      },
      { status: 500 }
    );
  }
}