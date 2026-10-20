import { Module, type OnApplicationShutdown } from '@nestjs/common';
import { PrismaService, prismaProvider } from './prisma.service.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [prismaProvider],
  exports: [PrismaService],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(private readonly prisma: PrismaService) {}

  async onApplicationShutdown() {
    await this.prisma.$disconnect();
  }
}
