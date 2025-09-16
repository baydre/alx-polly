// User types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

// Poll types
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

export interface CreatePollData {
  title: string;
  description?: string;
  options: string[];
  endDate?: string;
}

// Vote types
export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId: string;
  votedAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Component prop types
export interface PollCardProps {
  poll: Poll;
  onEdit?: (poll: Poll) => void;
  onDelete?: (pollId: string) => void;
}

export interface PollDetailProps {
  poll: Poll;
  onVote?: (optionId: string) => void;
}
