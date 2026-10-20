import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(HealthService.name);

  private static readonly HEALTH_TIMEOUT_MS = 3_000;

  async isDatabaseHealthy() {
    const query = this.prisma.$queryRaw`SELECT 1;`;
    let timeoutId: NodeJS.Timeout | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error('query timeout')),
        HealthService.HEALTH_TIMEOUT_MS,
      );
    });

    try {
      await Promise.race([query, timeout]);

      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
