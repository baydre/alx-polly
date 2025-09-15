"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Poll as DatabasePoll } from "@/lib/data/database-store";
import { formatDate } from "@/lib/utils/date";

interface Poll {
  id: string;
  title: string;
  description: string;
  totalVotes: number;
  status: "active" | "closed" | "draft";
  createdAt: string;
  options: Array<{ id: string; text: string; votes: number }>;
}

export function RecentPolls() {
  const [recentPolls, setRecentPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPolls() {
      try {
        const response = await fetch("/api/polls");
        const data = await response.json();
        
        if (data.success) {
          // Get the 3 most recent polls
          setRecentPolls(data.polls.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching recent polls:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentPolls();
  }, []);

  if (loading) {
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
          <div className="text-center py-4">Loading recent polls...</div>
        </CardContent>
      </Card>
    );
  }

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
                  <span>Created {formatDate(poll.createdAt)}</span>
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
