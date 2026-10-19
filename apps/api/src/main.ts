import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { Env } from './config/env.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Env, true>);

  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  const port = configService.get('PORT', { infer: true });
  await app.listen(port);

  console.log(`Nest started at ${port}`);
}
await bootstrap();
