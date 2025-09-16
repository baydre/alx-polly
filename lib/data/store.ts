// Enhanced in-memory data store for polls and votes
// This can be easily replaced with database operations later

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  status: "active" | "closed" | "draft";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  endDate?: string;
}

export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId: string;
  votedAt: string;
}

// In-memory storage
let users: User[] = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewkGQ.jPn7z9.KQW", // "password123"
    createdAt: new Date().toISOString(),
  },
];

let polls: Poll[] = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Help us understand our developer community preferences",
    options: [
      { id: "1", text: "JavaScript", votes: 45 },
      { id: "2", text: "Python", votes: 67 },
      { id: "3", text: "TypeScript", votes: 89 },
      { id: "4", text: "Go", votes: 23 },
    ],
    totalVotes: 224,
    status: "active",
    createdAt: "2025-09-10T10:00:00Z",
    updatedAt: "2025-09-12T13:30:00Z",
    createdBy: "1",
    endDate: "2025-09-20T23:59:59Z",
  },
  {
    id: "2",
    title: "Best time for team meetings?",
    description: "Finding the optimal meeting schedule for our team",
    options: [
      { id: "1", text: "Morning (9-11 AM)", votes: 34 },
      { id: "2", text: "Afternoon (2-4 PM)", votes: 28 },
      { id: "3", text: "Evening (5-7 PM)", votes: 12 },
    ],
    totalVotes: 74,
    status: "active",
    createdAt: "2025-09-11T14:30:00Z",
    updatedAt: "2025-09-12T13:30:00Z",
    createdBy: "1",
    endDate: "2025-09-15T23:59:59Z",
  },
  {
    id: "3",
    title: "Office lunch preferences",
    description: "Planning next week's catered lunch options",
    options: [
      { id: "1", text: "Italian", votes: 42 },
      { id: "2", text: "Asian", votes: 38 },
      { id: "3", text: "Mexican", votes: 31 },
      { id: "4", text: "Mediterranean", votes: 19 },
    ],
    totalVotes: 130,
    status: "closed",
    createdAt: "2025-09-08T09:00:00Z",
    updatedAt: "2025-09-10T18:00:00Z",
    createdBy: "1",
    endDate: "2025-09-10T18:00:00Z",
  },
];

let votes: Vote[] = [];

// User operations
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const newUser: User = {
    ...userData,
    id: (users.length + 1).toString(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}

// Poll operations
export function getAllPolls(userId?: string): Poll[] {
  if (userId) {
    return polls.filter(poll => poll.createdBy === userId);
  }
  return polls;
}

export function getPollById(id: string): Poll | undefined {
  return polls.find(poll => poll.id === id);
}

export function createPoll(pollData: {
  title: string;
  description: string;
  options: string[];
  createdBy: string;
  endDate?: string;
}): Poll {
  const newPoll: Poll = {
    id: (polls.length + 1).toString(),
    title: pollData.title,
    description: pollData.description,
    options: pollData.options.map((text, index) => ({
      id: (index + 1).toString(),
      text,
      votes: 0,
    })),
    totalVotes: 0,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: pollData.createdBy,
    endDate: pollData.endDate,
  };
  
  polls.push(newPoll);
  return newPoll;
}

export function updatePoll(id: string, updates: Partial<Poll>): Poll | undefined {
  const pollIndex = polls.findIndex(poll => poll.id === id);
  if (pollIndex === -1) return undefined;
  
  polls[pollIndex] = {
    ...polls[pollIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return polls[pollIndex];
}

export function deletePoll(id: string): boolean {
  const pollIndex = polls.findIndex(poll => poll.id === id);
  if (pollIndex === -1) return false;
  
  polls.splice(pollIndex, 1);
  // Also remove related votes
  votes = votes.filter(vote => vote.pollId !== id);
  return true;
}

// Vote operations
export function hasUserVoted(userId: string, pollId: string): boolean {
  return votes.some(vote => vote.userId === userId && vote.pollId === pollId);
}

export function getUserVote(userId: string, pollId: string): Vote | undefined {
  return votes.find(vote => vote.userId === userId && vote.pollId === pollId);
}

export function createVote(voteData: {
  pollId: string;
  optionId: string;
  userId: string;
}): Vote | null {
  // Check if user already voted
  if (hasUserVoted(voteData.userId, voteData.pollId)) {
    return null;
  }
  
  // Find the poll and option
  const poll = getPollById(voteData.pollId);
  if (!poll || poll.status !== "active") {
    return null;
  }
  
  const option = poll.options.find(opt => opt.id === voteData.optionId);
  if (!option) {
    return null;
  }
  
  // Create the vote
  const newVote: Vote = {
    id: (votes.length + 1).toString(),
    pollId: voteData.pollId,
    optionId: voteData.optionId,
    userId: voteData.userId,
    votedAt: new Date().toISOString(),
  };
  
  votes.push(newVote);
  
  // Update poll vote counts
  option.votes += 1;
  poll.totalVotes += 1;
  poll.updatedAt = new Date().toISOString();
  
  return newVote;
}

export function getPollVotes(pollId: string): Vote[] {
  return votes.filter(vote => vote.pollId === pollId);
}

// Statistics
export function getUserStats(userId: string) {
  const userPolls = getAllPolls(userId);
  const totalVotes = userPolls.reduce((sum, poll) => sum + poll.totalVotes, 0);
  const activePolls = userPolls.filter(poll => poll.status === "active").length;
  
  return {
    totalPolls: userPolls.length,
    totalVotes,
    activePolls,
    averageVotes: userPolls.length > 0 ? Math.round(totalVotes / userPolls.length) : 0,
  };
}
