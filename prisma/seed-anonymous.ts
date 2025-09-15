import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAnonymousUser() {
  try {
    // Check if anonymous user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'anonymous@system.local' }
    });

    if (!existingUser) {
      // Create anonymous user
      const hashedPassword = await bcrypt.hash('anonymous', 12);
      await prisma.user.create({
        data: {
          id: 'anonymous-user-system',
          name: 'Anonymous User',
          email: 'anonymous@system.local',
          password: hashedPassword,
        }
      });
      console.log('Anonymous user created successfully');
    } else {
      console.log('Anonymous user already exists');
    }
  } catch (error) {
    console.error('Error seeding anonymous user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAnonymousUser();