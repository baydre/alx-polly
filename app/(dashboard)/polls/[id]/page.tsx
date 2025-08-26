import { PollDetail } from "@/components/polls/poll-detail";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { notFound } from "next/navigation";

interface PollPageProps {
  params: Promise<{ id: string }>;
}

export default async function PollPage({ params }: PollPageProps) {
  const { id } = await params;
  
  // TODO: Fetch poll data from API
  const poll = await fetchPoll(id);
  
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

// Placeholder function - replace with actual API call
async function fetchPoll(id: string) {
  // TODO: Implement poll fetching logic
  return {
    id,
    title: `Sample Poll ${id}`,
    description: "This is a sample poll description",
    options: [
      { id: "1", text: "Option 1", votes: 10 },
      { id: "2", text: "Option 2", votes: 15 },
      { id: "3", text: "Option 3", votes: 8 },
    ],
    totalVotes: 33,
    createdAt: new Date().toISOString(),
    isActive: true,
  };
}
