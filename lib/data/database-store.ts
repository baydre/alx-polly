import { prisma } from '../database'
import { PollStatus } from '@prisma/client'

// Types that match our original interfaces
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

// Helper function to convert Prisma status to our format
function convertPollStatus(status: PollStatus): "active" | "closed" | "draft" {
  switch (status) {
    case 'ACTIVE':
      return 'active'
    case 'CLOSED':
      return 'closed'
    case 'DRAFT':
      return 'draft'
    default:
      return 'active'
  }
}

// Helper function to convert our status to Prisma format
function convertToPrismaStatus(status: "active" | "closed" | "draft"): PollStatus {
  switch (status) {
    case 'active':
      return 'ACTIVE'
    case 'closed':
      return 'CLOSED'
    case 'draft':
      return 'DRAFT'
    default:
      return 'ACTIVE'
  }
}

// User operations
export async function findUserByEmail(email: string): Promise<User | undefined> {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  if (!user) return undefined
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt.toISOString(),
  }
}

export async function findUserById(id: string): Promise<User | undefined> {
  const user = await prisma.user.findUnique({
    where: { id }
  })
  
  if (!user) return undefined
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt.toISOString(),
  }
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }
  })
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt.toISOString(),
  }
}

// Poll operations
export async function getAllPolls(userId?: string): Promise<Poll[]> {
  const polls = await prisma.poll.findMany({
    where: userId ? { createdBy: userId } : undefined,
    include: {
      options: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return polls.map(poll => ({
    id: poll.id,
    title: poll.title,
    description: poll.description,
    options: poll.options.map(option => ({
      id: option.id,
      text: option.text,
      votes: option.votes,
    })),
    totalVotes: poll.totalVotes,
    status: convertPollStatus(poll.status),
    createdAt: poll.createdAt.toISOString(),
    updatedAt: poll.updatedAt.toISOString(),
    createdBy: poll.createdBy,
    endDate: poll.endDate?.toISOString(),
  }))
}

export async function getPollById(id: string): Promise<Poll | undefined> {
  const poll = await prisma.poll.findUnique({
    where: { id },
    include: {
      options: true,
    }
  })
  
  if (!poll) return undefined
  
  return {
    id: poll.id,
    title: poll.title,
    description: poll.description,
    options: poll.options.map(option => ({
      id: option.id,
      text: option.text,
      votes: option.votes,
    })),
    totalVotes: poll.totalVotes,
    status: convertPollStatus(poll.status),
    createdAt: poll.createdAt.toISOString(),
    updatedAt: poll.updatedAt.toISOString(),
    createdBy: poll.createdBy,
    endDate: poll.endDate?.toISOString(),
  }
}

export async function createPoll(pollData: {
  title: string;
  description: string;
  options: string[];
  createdBy: string;
  endDate?: string;
}): Promise<Poll> {
  const poll = await prisma.poll.create({
    data: {
      title: pollData.title,
      description: pollData.description,
      createdBy: pollData.createdBy,
      endDate: pollData.endDate ? new Date(pollData.endDate) : undefined,
      options: {
        create: pollData.options.map(text => ({
          text,
          votes: 0,
        }))
      }
    },
    include: {
      options: true,
    }
  })
  
  return {
    id: poll.id,
    title: poll.title,
    description: poll.description,
    options: poll.options.map(option => ({
      id: option.id,
      text: option.text,
      votes: option.votes,
    })),
    totalVotes: poll.totalVotes,
    status: convertPollStatus(poll.status),
    createdAt: poll.createdAt.toISOString(),
    updatedAt: poll.updatedAt.toISOString(),
    createdBy: poll.createdBy,
    endDate: poll.endDate?.toISOString(),
  }
}

export async function updatePoll(id: string, updates: Partial<Poll>): Promise<Poll | undefined> {
  try {
    const poll = await prisma.poll.update({
      where: { id },
      data: {
        ...(updates.title && { title: updates.title }),
        ...(updates.description && { description: updates.description }),
        ...(updates.status && { status: convertToPrismaStatus(updates.status) }),
        ...(updates.endDate && { endDate: new Date(updates.endDate) }),
        ...(updates.totalVotes !== undefined && { totalVotes: updates.totalVotes }),
      },
      include: {
        options: true,
      }
    })
    
    return {
      id: poll.id,
      title: poll.title,
      description: poll.description,
      options: poll.options.map(option => ({
        id: option.id,
        text: option.text,
        votes: option.votes,
      })),
      totalVotes: poll.totalVotes,
      status: convertPollStatus(poll.status),
      createdAt: poll.createdAt.toISOString(),
      updatedAt: poll.updatedAt.toISOString(),
      createdBy: poll.createdBy,
      endDate: poll.endDate?.toISOString(),
    }
  } catch (error) {
    return undefined
  }
}

export async function deletePoll(id: string): Promise<boolean> {
  try {
    await prisma.poll.delete({
      where: { id }
    })
    return true
  } catch (error) {
    return false
  }
}

// Vote operations
export async function hasUserVoted(userId: string, pollId: string): Promise<boolean> {
  const vote = await prisma.vote.findUnique({
    where: {
      userId_pollId: {
        userId,
        pollId
      }
    }
  })
  
  return !!vote
}

export async function getUserVote(userId: string, pollId: string): Promise<Vote | undefined> {
  const vote = await prisma.vote.findUnique({
    where: {
      userId_pollId: {
        userId,
        pollId
      }
    }
  })
  
  if (!vote) return undefined
  
  return {
    id: vote.id,
    pollId: vote.pollId,
    optionId: vote.optionId,
    userId: vote.userId,
    votedAt: vote.votedAt.toISOString(),
  }
}

export async function createVote(voteData: {
  pollId: string;
  optionId: string;
  userId: string;
}): Promise<Vote | null> {
  try {
    // Check if user already voted
    const existingVote = await hasUserVoted(voteData.userId, voteData.pollId)
    if (existingVote) {
      return null
    }
    
    // Check if poll exists and is active
    const poll = await prisma.poll.findUnique({
      where: { id: voteData.pollId },
      include: { options: true }
    })
    
    if (!poll || poll.status !== 'ACTIVE') {
      return null
    }
    
    // Check if option exists
    const option = poll.options.find(opt => opt.id === voteData.optionId)
    if (!option) {
      return null
    }
    
    // Use transaction to create vote and update counts
    const result = await prisma.$transaction(async (tx) => {
      // Create the vote
      const vote = await tx.vote.create({
        data: {
          pollId: voteData.pollId,
          optionId: voteData.optionId,
          userId: voteData.userId,
        }
      })
      
      // Update option vote count
      await tx.pollOption.update({
        where: { id: voteData.optionId },
        data: { votes: { increment: 1 } }
      })
      
      // Update poll total votes
      await tx.poll.update({
        where: { id: voteData.pollId },
        data: { totalVotes: { increment: 1 } }
      })
      
      return vote
    })
    
    return {
      id: result.id,
      pollId: result.pollId,
      optionId: result.optionId,
      userId: result.userId,
      votedAt: result.votedAt.toISOString(),
    }
  } catch (error) {
    return null
  }
}

export async function getPollVotes(pollId: string): Promise<Vote[]> {
  const votes = await prisma.vote.findMany({
    where: { pollId }
  })
  
  return votes.map(vote => ({
    id: vote.id,
    pollId: vote.pollId,
    optionId: vote.optionId,
    userId: vote.userId,
    votedAt: vote.votedAt.toISOString(),
  }))
}

// Statistics
export async function getUserStats(userId: string) {
  const userPolls = await getAllPolls(userId)
  const totalVotes = userPolls.reduce((sum, poll) => sum + poll.totalVotes, 0)
  const activePolls = userPolls.filter(poll => poll.status === "active").length
  
  return {
    totalPolls: userPolls.length,
    totalVotes,
    activePolls,
    averageVotes: userPolls.length > 0 ? Math.round(totalVotes / userPolls.length) : 0,
  }
}
