import { createPrismaClient } from '../src';
import type { Prisma } from '../generated/prisma/client';

const url = process.env['DATABASE_URL'];
if (!url) throw new Error('DATABASE_URL is not set');

const books = [
  { id: '01a14f2f-4b6b-748f-bdb1-6231717e37b4', title: 'Random title' },
] satisfies Prisma.BookCreateInput[];

const prisma = createPrismaClient({
  url,
  applicationName: 'mybooks-seed',
  onPoolError: (error) => console.error('Pool error:', error),
});

try {
  for (const { id, ...data } of books) {
    await prisma.book.upsert({ where: { id }, create: { id, ...data }, update: data });
  }
  console.log(`Seeded ${books.length} books`);
} finally {
  await prisma.$disconnect();
}
