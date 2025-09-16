import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { getAllPolls, createPoll } from '@/lib/data/database-store';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    const polls = await getAllPolls(userId || undefined);

    return NextResponse.json({
      success: true,
      polls,
      total: polls.length,
    });
  } catch (error) {
    console.error("Error fetching polls:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch polls" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, description, options, endDate } = await request.json();

    // Debug session
    console.log("Create Poll Debug:", {
      sessionUserId: (session.user as any)?.id,
      sessionUserEmail: session.user?.email,
      sessionUserName: session.user?.name
    });

    // Validate input
    if (!title || !options || options.length < 2) {
      return NextResponse.json(
        { success: false, message: "Title and at least 2 options are required" },
        { status: 400 }
      );
    }

    const userId = (session.user as any)?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID not found in session" },
        { status: 400 }
      );
    }

    const newPoll = await createPoll({
      title,
      description: description || "",
      options,
      createdBy: userId,
      endDate,
    });

    return NextResponse.json({
      success: true,
      message: "Poll created successfully",
      poll: newPoll,
    });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create poll" },
      { status: 500 }
    );
  }
}
