import { PollsList } from "@/components/polls/polls-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PollsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Polls</h1>
            <p className="text-gray-600 mt-2">View and manage your polls</p>
          </div>
          <Button asChild>
            <Link href="/create-poll">Create New Poll</Link>
          </Button>
        </div>
        
        <PollsList />
      </div>
    </div>
  );
}
