import { Controller, Get, Header, ServiceUnavailableException } from '@nestjs/common';
import { HealthService } from './health.service.js';
import type { HealthResponse } from './health.types.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Header('Cache-Control', 'no-store')
  async getHealth(): Promise<HealthResponse> {
    const isOk = await this.healthService.isDatabaseHealthy();

    if (isOk) {
      return { status: 'ok' };
    }

    throw new ServiceUnavailableException({ status: 'error' } satisfies HealthResponse);
  }
}
