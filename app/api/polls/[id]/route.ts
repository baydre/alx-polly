import { NextRequest, NextResponse } from "next/server";
import { getPollById, getUserVote } from "@/lib/data/database-store";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const poll = await getPollById(id);

    if (!poll) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 }
      );
    }

    // Check if user has voted (if authenticated)
    const session = await getServerSession(authOptions);
    let userVote = null;
    
    if (session) {
      const userId = (session.user as any).id;
      userVote = await getUserVote(userId, id);
    }

    return NextResponse.json({
      success: true,
      poll,
      userVote,
    });
  } catch (error) {
    console.error("Error fetching poll:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch poll" },
      { status: 500 }
    );
  }
}
