import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/config";
import { deletePoll, getPollById } from "@/lib/data/database-store";

export async function DELETE(
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
    
    // Check if poll exists and user owns it
    const poll = await getPollById(id);
    if (!poll) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 }
      );
    }

    if (poll.createdBy !== (session.user as any)?.id) {
      return NextResponse.json(
        { success: false, message: "You can only delete your own polls" },
        { status: 403 }
      );
    }

    const success = await deletePoll(id);
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: "Poll deleted successfully"
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to delete poll" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting poll:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
