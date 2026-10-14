import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

export interface PoolOptions {
  max?: number;
  connectionTimeoutMillis?: number;
  idleTimeoutMillis?: number;
}

export interface CreatePrismaClientOptions {
  url: string;
  applicationName: string;
  onPoolError: (error: Error) => void;
  pool?: PoolOptions;
}
export function createPrismaClient({
  url,
  onPoolError,
  pool,
  applicationName,
}: CreatePrismaClientOptions): PrismaClient {
  const adapter = new PrismaPg(
    {
      connectionString: url,
      application_name: applicationName,
      max: pool?.max ?? 10,
      connectionTimeoutMillis: pool?.connectionTimeoutMillis ?? 5_000,
      idleTimeoutMillis: pool?.idleTimeoutMillis ?? 30_000,
    },
    { onPoolError },
  );
  return new PrismaClient({ adapter });
}

export type { PrismaClient } from '../generated/prisma/client.js';
