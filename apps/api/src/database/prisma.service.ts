import { createPrismaClient, type PrismaClient } from '@mybooks/database';
import { ConfigService } from '@nestjs/config';
import { Logger, Provider } from '@nestjs/common';
import type { Env } from '../config/env.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class PrismaService {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type,@typescript-eslint/no-unsafe-declaration-merging
export interface PrismaService extends PrismaClient {}

export const prismaProvider: Provider = {
  provide: PrismaService,
  inject: [ConfigService],
  useFactory(config: ConfigService<Env, true>): PrismaService {
    const logger = new Logger(PrismaService.name);

    return createPrismaClient({
      url: config.get('DATABASE_URL', { infer: true }),
      applicationName: 'mybooks-api',
      onPoolError: (err) => logger.error(err.message, err.stack),
    });
  },
};
