"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DashboardStats() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalPolls: 0,
    totalVotes: 0,
    activePolls: 0,
    averageVotes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (session?.user) {
        try {
          setLoading(true);
          const response = await fetch('/api/stats');
          const data = await response.json();
          
          if (data.success) {
            setStats(data.stats);
          }
        } catch (error) {
          console.error('Error fetching stats:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchStats();
  }, [session]);

  const statsData = [
    {
      title: "Total Polls",
      value: loading ? "..." : stats.totalPolls.toString(),
      description: "Polls you've created",
      trend: `${stats.activePolls} active`,
    },
    {
      title: "Total Votes",
      value: loading ? "..." : stats.totalVotes.toLocaleString(),
      description: "Votes received",
      trend: `${stats.averageVotes} avg per poll`,
    },
    {
      title: "Active Polls",
      value: loading ? "..." : stats.activePolls.toString(),
      description: "Currently running",
      trend: "accepting votes",
    },
    {
      title: "Avg Engagement",
      value: loading ? "..." : `${stats.averageVotes}`,
      description: "Votes per poll",
      trend: "responses",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <Badge variant="secondary" className="mt-2">
              {stat.trend}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
