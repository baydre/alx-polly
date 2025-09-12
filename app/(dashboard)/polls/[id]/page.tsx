import { PollDetail } from "@/components/polls/poll-detail";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { notFound } from "next/navigation";
import { getPollById } from "@/lib/data/database-store";

interface PollPageProps {
  params: Promise<{ id: string }>;
}

export default async function PollPage({ params }: PollPageProps) {
  const { id } = await params;
  
  // Fetch poll data from our data store
  const poll = await getPollById(id);
  
  if (!poll) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <PollDetail poll={poll} />
      </div>
    </div>
  );
}
