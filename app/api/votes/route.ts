import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/config";
import { createVote, hasUserVoted } from "@/lib/data/database-store";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { pollId, optionId } = await request.json();

    console.log("Vote request received:", { pollId, optionId, hasSession: !!session });

    if (!pollId || !optionId) {
      console.error("Missing pollId or optionId:", { pollId, optionId });
      return NextResponse.json(
        { success: false, message: "Poll ID and option ID are required" },
        { status: 400 }
      );
    }

    let userId: string;
    
    if (session) {
      // Authenticated user
      userId = (session.user as any).id;
    } else {
      // Anonymous user - create a unique identifier based on IP and user agent
      const forwarded = request.headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';
      userId = `anonymous_${Buffer.from(`${ip}_${userAgent}_${pollId}`).toString('base64').slice(0, 20)}`;
    }

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
      console.error("Failed to create vote:", { pollId, optionId, userId });
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
