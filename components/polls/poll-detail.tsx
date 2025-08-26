"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: string;
  isActive: boolean;
}

interface PollDetailProps {
  poll: Poll;
}

export function PollDetail({ poll }: PollDetailProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (!selectedOption) return;

    setIsVoting(true);
    try {
      // TODO: Implement voting API call
      console.log("Voting for option:", selectedOption);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasVoted(true);
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  const getPercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{poll.title}</CardTitle>
              <p className="text-gray-600">{poll.description}</p>
            </div>
            <Badge variant={poll.isActive ? "default" : "secondary"}>
              {poll.isActive ? "Active" : "Closed"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 text-sm text-gray-500 mb-6">
            <span>Total Votes: {poll.totalVotes}</span>
            <span>Created: {new Date(poll.createdAt).toLocaleDateString()}</span>
          </div>

          {hasVoted && (
            <Alert className="mb-6">
              <AlertDescription>
                Thank you for voting! Your response has been recorded.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {poll.options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="poll-option"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      disabled={!poll.isActive || hasVoted}
                      className="text-blue-600"
                    />
                    <span className={hasVoted || !poll.isActive ? "text-gray-600" : ""}>
                      {option.text}
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{option.votes} votes</span>
                    <Badge variant="outline">{getPercentage(option.votes)}%</Badge>
                  </div>
                </div>
                
                {hasVoted && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getPercentage(option.votes)}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {poll.isActive && !hasVoted && (
            <div className="mt-6 pt-6 border-t">
              <Button
                onClick={handleVote}
                disabled={!selectedOption || isVoting}
                className="w-full sm:w-auto"
              >
                {isVoting ? "Submitting Vote..." : "Submit Vote"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Poll Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Poll Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{poll.totalVotes}</div>
              <div className="text-sm text-gray-500">Total Votes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{poll.options.length}</div>
              <div className="text-sm text-gray-500">Options</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {poll.totalVotes > 0 ? Math.max(...poll.options.map(o => getPercentage(o.votes))) : 0}%
              </div>
              <div className="text-sm text-gray-500">Leading Option</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
