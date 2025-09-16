import { DashboardStats } from "@/components/polls/dashboard-stats";
import { RecentPolls } from "@/components/polls/recent-polls";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your polling activity overview.</p>
        </div>
        
        <div className="space-y-8">
          <DashboardStats />
          <RecentPolls />
        </div>
      </div>
    </div>
  );
}
