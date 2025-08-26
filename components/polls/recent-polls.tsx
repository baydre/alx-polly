import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RecentPolls() {
  // TODO: Fetch real polls from API
  const recentPolls = [
    {
      id: "1",
      title: "What's your favorite programming language?",
      description: "Help us understand our developer community preferences",
      totalVotes: 245,
      status: "active",
      createdAt: "2025-08-20",
      options: ["JavaScript", "Python", "TypeScript", "Go"],
    },
    {
      id: "2",
      title: "Best time for team meetings?",
      description: "Finding the optimal meeting schedule for our team",
      totalVotes: 89,
      status: "active",
      createdAt: "2025-08-19",
      options: ["Morning", "Afternoon", "Evening"],
    },
    {
      id: "3",
      title: "Office lunch preferences",
      description: "Planning next week's catered lunch options",
      totalVotes: 156,
      status: "closed",
      createdAt: "2025-08-15",
      options: ["Italian", "Asian", "Mexican", "Mediterranean"],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent Polls</CardTitle>
          <Button variant="outline" asChild>
            <Link href="/polls">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPolls.map((poll) => (
            <div key={poll.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{poll.title}</h3>
                  <Badge variant={poll.status === "active" ? "default" : "secondary"}>
                    {poll.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{poll.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{poll.totalVotes} votes</span>
                  <span>{poll.options.length} options</span>
                  <span>Created {poll.createdAt}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/polls/${poll.id}`}>View</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
