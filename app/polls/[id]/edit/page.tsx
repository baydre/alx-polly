"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Poll {
  id: string;
  title: string;
  description: string | null;
  status: string;
  isActive: boolean;
  createdBy: string;
  options: {
    id: string;
    text: string;
  }[];
}

export default function EditPollPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchPoll();
    }
  }, [params.id]);

  const fetchPoll = async () => {
    try {
      const response = await fetch(`/api/polls/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch poll");
        return;
      }

      const pollData = data.poll;
      setPoll(pollData);
      setFormData({
        title: pollData.title,
        description: pollData.description || "",
        isActive: pollData.isActive,
      });
    } catch (err) {
      setError("Failed to fetch poll");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) {
      setError("You must be logged in to edit polls");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/polls/${params.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to update poll");
        return;
      }

      // Show a success message before redirecting
      setError("");
      router.push(`/polls/${params.id}`);
    } catch (err) {
      setError("Failed to update poll");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading poll...</div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>Poll not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>You must be logged in to edit polls</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (poll.createdBy !== (session.user as any).id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>You can only edit your own polls</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/polls/${poll.id}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Poll
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Poll</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Poll Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Poll Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter poll title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter poll description"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked: boolean) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive">
                Poll is {formData.isActive ? "Active" : "Closed"}
              </Label>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm font-medium">Current Options:</Label>
              <div className="mt-2 space-y-1">
                {poll.options.map((option, index) => (
                  <div key={option.id} className="text-sm">
                    {index + 1}. {option.text}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Note: Poll options cannot be edited to preserve vote integrity.
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Updating..." : "Update Poll"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/polls/${poll.id}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
