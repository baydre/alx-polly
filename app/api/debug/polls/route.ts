import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { getAllPolls } from '@/lib/data/database-store';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const polls = await getAllPolls();

    return NextResponse.json({
      success: true,
      debug: {
        sessionUserId: (session.user as any)?.id,
        sessionUserEmail: session.user?.email,
        sessionUserName: session.user?.name,
        polls: polls.map(poll => ({
          id: poll.id,
          title: poll.title,
          createdBy: poll.createdBy,
          isOwner: poll.createdBy === (session.user as any)?.id
        }))
      }
    });
  } catch (error) {
    console.error("Error in debug endpoint:", error);
    return NextResponse.json(
      { success: false, message: "Debug failed" },
      { status: 500 }
    );
  }
}
