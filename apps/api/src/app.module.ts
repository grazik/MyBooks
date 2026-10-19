import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from './config/env.js';
import { DatabaseModule } from './database/database.module.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      validationSchema: EnvSchema,
    }),
    DatabaseModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
