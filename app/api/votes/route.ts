import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/config";
import { createVote, hasUserVoted } from "@/lib/data/database-store";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { pollId, optionId } = await request.json();

    if (!pollId || !optionId) {
      return NextResponse.json(
        { success: false, message: "Poll ID and option ID are required" },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;

    // Check if user already voted
    if (await hasUserVoted(userId, pollId)) {
      return NextResponse.json(
        { success: false, message: "You have already voted on this poll" },
        { status: 400 }
      );
    }

    const vote = await createVote({
      pollId,
      optionId,
      userId,
    });

    if (!vote) {
      return NextResponse.json(
        { success: false, message: "Failed to record vote" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Vote recorded successfully",
      vote,
    });
  } catch (error) {
    console.error("Error recording vote:", error);
    return NextResponse.json(
      { success: false, message: "Failed to record vote" },
      { status: 500 }
    );
  }
}
