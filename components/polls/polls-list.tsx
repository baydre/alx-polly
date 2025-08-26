import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PollsList() {
  // TODO: Fetch real polls from API
  const polls = [
    {
      id: "1",
      title: "What's your favorite programming language?",
      description: "Help us understand our developer community preferences",
      totalVotes: 245,
      status: "active",
      createdAt: "2025-08-20",
      endDate: "2025-08-30",
      options: ["JavaScript", "Python", "TypeScript", "Go"],
    },
    {
      id: "2",
      title: "Best time for team meetings?",
      description: "Finding the optimal meeting schedule for our team",
      totalVotes: 89,
      status: "active",
      createdAt: "2025-08-19",
      endDate: "2025-08-29",
      options: ["Morning", "Afternoon", "Evening"],
    },
    {
      id: "3",
      title: "Office lunch preferences",
      description: "Planning next week's catered lunch options",
      totalVotes: 156,
      status: "closed",
      createdAt: "2025-08-15",
      endDate: "2025-08-22",
      options: ["Italian", "Asian", "Mexican", "Mediterranean"],
    },
    {
      id: "4",
      title: "Remote work policy feedback",
      description: "Share your thoughts on our new remote work policy",
      totalVotes: 67,
      status: "active",
      createdAt: "2025-08-18",
      endDate: "2025-09-01",
      options: ["Fully remote", "Hybrid", "Office only", "Flexible"],
    },
  ];

  return (
    <div className="space-y-4">
      {polls.map((poll) => (
        <Card key={poll.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg">{poll.title}</CardTitle>
                  <Badge variant={poll.status === "active" ? "default" : "secondary"}>
                    {poll.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{poll.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/polls/${poll.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Votes:</span>
                <p className="font-medium">{poll.totalVotes}</p>
              </div>
              <div>
                <span className="text-gray-500">Options:</span>
                <p className="font-medium">{poll.options.length}</p>
              </div>
              <div>
                <span className="text-gray-500">Created:</span>
                <p className="font-medium">{poll.createdAt}</p>
              </div>
              <div>
                <span className="text-gray-500">Ends:</span>
                <p className="font-medium">{poll.endDate}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-500">Options: </span>
              <span className="text-sm">{poll.options.join(", ")}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
