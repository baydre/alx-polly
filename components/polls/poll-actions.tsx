"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Poll } from "@/lib/data/database-store";

interface PollActionsProps {
  poll: Poll;
  onUpdate?: () => void;
}

export function PollActions({ poll, onUpdate }: PollActionsProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Check ownership - session.user.id should match poll.createdBy
  const isOwner = session?.user && (session.user as any).id === poll.createdBy;

  const handleEdit = () => {
    router.push(`/polls/${poll.id}/edit`);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/polls/${poll.id}/delete`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Poll deleted successfully");
        onUpdate?.();
        router.refresh();
      } else {
        alert(data.message || "Failed to delete poll");
      }
    } catch (error) {
      console.error("Error deleting poll:", error);
      alert("An error occurred while deleting the poll");
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleStatusToggle = async () => {
    setLoading(true);
    try {
      const newStatus = poll.status === "active" ? "closed" : "active";
      const response = await fetch(`/api/polls/${poll.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: poll.title,
          description: poll.description,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Poll ${newStatus === "active" ? "activated" : "closed"} successfully`);
        onUpdate?.();
        router.refresh();
      } else {
        alert(data.message || "Failed to update poll status");
      }
    } catch (error) {
      console.error("Error updating poll status:", error);
      alert("An error occurred while updating the poll");
    } finally {
      setLoading(false);
    }
  };

  // Always show dropdown menu for logged in users, nothing for non-logged in users
  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={loading}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isOwner && (
            <>
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Poll
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleStatusToggle} disabled={loading}>
                {poll.status === "active" ? "Close Poll" : "Activate Poll"}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setDeleteDialogOpen(true)} 
                className="text-red-600"
                disabled={loading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Poll
              </DropdownMenuItem>
            </>
          )}
          {!isOwner && (
            <DropdownMenuItem disabled>
              <Eye className="h-4 w-4 mr-2" />
              View Only (Not Owner)
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the poll
              and all associated votes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete Poll"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
