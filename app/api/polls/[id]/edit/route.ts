import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/config";
import { updatePoll, getPollById } from "@/lib/data/database-store";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, status } = body;

    // Check if poll exists and user owns it
    const existingPoll = await getPollById(id);
    if (!existingPoll) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 }
      );
    }

    // Debug logging
    console.log("Edit Poll Debug:", {
      sessionUserId: (session.user as any)?.id,
      sessionUserEmail: session.user?.email,
      pollCreatedBy: existingPoll.createdBy,
      pollId: id,
      match: existingPoll.createdBy === (session.user as any)?.id
    });

    if (existingPoll.createdBy !== (session.user as any)?.id) {
      return NextResponse.json(
        { success: false, message: "You can only edit your own polls" },
        { status: 403 }
      );
    }

    const updatedPoll = await updatePoll(id, {
      title,
      description,
      status,
    });

    if (updatedPoll) {
      return NextResponse.json({
        success: true,
        poll: updatedPoll,
        message: "Poll updated successfully"
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to update poll" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating poll:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
