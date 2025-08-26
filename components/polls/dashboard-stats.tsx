import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DashboardStats() {
  // TODO: Fetch real stats from API
  const stats = [
    {
      title: "Total Polls",
      value: "12",
      description: "Active polls created",
      trend: "+2 this week",
    },
    {
      title: "Total Votes",
      value: "1,284",
      description: "Votes received",
      trend: "+156 this week",
    },
    {
      title: "Response Rate",
      value: "68%",
      description: "Average engagement",
      trend: "+5% this week",
    },
    {
      title: "Active Polls",
      value: "8",
      description: "Currently running",
      trend: "4 ending soon",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
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
