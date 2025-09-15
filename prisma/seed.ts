import { prisma } from '../lib/database'
import bcrypt from 'bcryptjs'

async function main() {
  // Create a test user or find existing one
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  let user = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
      }
    })
    console.log('Created user:', user.id)
  } else {
    console.log('Found existing user:', user.id)
  }

  // Create some sample polls
  const poll1 = await prisma.poll.create({
    data: {
      title: "What's your favorite programming language?",
      description: "Help us understand our developer community preferences",
      createdBy: user.id, // Use user.id as it should be
      endDate: new Date('2025-09-20T23:59:59Z'),
      options: {
        create: [
          { text: 'JavaScript', votes: 45 },
          { text: 'Python', votes: 67 },
          { text: 'TypeScript', votes: 89 },
          { text: 'Go', votes: 23 },
        ]
      }
    },
    include: { options: true }
  })

  const poll2 = await prisma.poll.create({
    data: {
      title: "Best time for team meetings?",
      description: "Finding the optimal meeting schedule for our team",
      createdBy: user.id, // Use user.id as it should be
      endDate: new Date('2025-09-15T23:59:59Z'),
      options: {
        create: [
          { text: 'Morning (9-11 AM)', votes: 34 },
          { text: 'Afternoon (2-4 PM)', votes: 28 },
          { text: 'Evening (5-7 PM)', votes: 12 },
        ]
      }
    },
    include: { options: true }
  })

  const poll3 = await prisma.poll.create({
    data: {
      title: "Office lunch preferences",
      description: "Planning next week's catered lunch options",
      createdBy: user.id, // Use user.id as it should be
      status: 'CLOSED',
      endDate: new Date('2025-09-10T18:00:00Z'),
      options: {
        create: [
          { text: 'Italian', votes: 42 },
          { text: 'Asian', votes: 38 },
          { text: 'Mexican', votes: 31 },
          { text: 'Mediterranean', votes: 19 },
        ]
      }
    },
    include: { options: true }
  })

  // Update total votes for polls
  await prisma.poll.update({
    where: { id: poll1.id },
    data: { totalVotes: 224 }
  })

  await prisma.poll.update({
    where: { id: poll2.id },
    data: { totalVotes: 74 }
  })

  await prisma.poll.update({
    where: { id: poll3.id },
    data: { totalVotes: 130 }
  })

  console.log('Created polls:', poll1.id, poll2.id, poll3.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
