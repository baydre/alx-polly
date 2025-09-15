import { CreatePollForm } from "@/components/polls/create-poll-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatePollPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create New Poll</CardTitle>
              <CardDescription>
                Create a new poll and start collecting responses from your audience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreatePollForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
