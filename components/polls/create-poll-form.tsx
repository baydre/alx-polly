"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

interface PollOption {
  id: string;
  text: string;
}

export function CreatePollForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [options, setOptions] = useState<PollOption[]>([
    { id: "1", text: "" },
    { id: "2", text: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const addOption = () => {
    const newId = (options.length + 1).toString();
    setOptions([...options, { id: newId, text: "" }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text } : option
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!title.trim()) {
      setError("Poll title is required");
      setIsLoading(false);
      return;
    }

    const validOptions = options.filter(option => option.text.trim());
    if (validOptions.length < 2) {
      setError("At least 2 options are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          endDate: endDate ? new Date(endDate).toISOString() : null,
          options: validOptions.map(option => option.text.trim()),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create poll");
      } else {
        // Success! Redirect to the new poll or polls page
        router.push(`/polls/${data.poll.id}`);
      }
    } catch (err) {
      setError("Failed to create poll. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          type="text"
          placeholder="Enter your poll question"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Add more context or details about your poll"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">End Date (optional)</Label>
        <Input
          id="endDate"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
        />
        <p className="text-sm text-gray-500">
          If not set, the poll will remain active indefinitely
        </p>
      </div>

      <div className="space-y-4">
        <Label>Poll Options</Label>
        {options.map((option, index) => (
          <Card key={option.id} className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.text}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                  />
                </div>
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(option.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addOption}
          className="w-full"
        >
          Add Another Option
        </Button>
      </div>

      <div className="flex gap-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Creating Poll..." : "Create Poll"}
        </Button>
      </div>
    </form>
  );
}
