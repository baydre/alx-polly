"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Poll } from "@/lib/data/database-store";
import { PollActions } from "./poll-actions";
import { formatDate } from "@/lib/utils/date";

export function PollsList() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await fetch("/api/polls");
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch polls");
      } else {
        setPolls(data.polls || []);
      }
    } catch (err) {
      setError("Failed to fetch polls");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading polls...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No polls found. Create your first poll!</p>
        <Button asChild>
          <Link href="/create-poll">Create Poll</Link>
        </Button>
      </div>
    );
  }

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
                <PollActions poll={poll} onUpdate={fetchPolls} />
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
                  <p className="font-medium">{formatDate(poll.createdAt)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Ends:</span>
                  <p className="font-medium">
                    {poll.endDate ? formatDate(poll.endDate) : "No end date"}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">Options: </span>
                <span className="text-sm">{poll.options.map(o => o.text).join(", ")}</span>
              </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
