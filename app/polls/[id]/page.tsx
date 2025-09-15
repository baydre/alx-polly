import { PollDetail } from "@/components/polls/poll-detail";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { notFound } from "next/navigation";
import { getPollById } from "@/lib/data/database-store";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/config";

interface PollPageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicPollPage({ params }: PollPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  // Fetch poll data from our data store
  const poll = await getPollById(id);
  
  if (!poll) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show header if user is logged in */}
      {session && <DashboardHeader />}
      <div className="container mx-auto px-4 py-8">
        <PollDetail poll={poll} />
      </div>
    </div>
  );
}