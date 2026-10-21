import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}

  findMany() {
    return this.prismaService.book.findMany({
      orderBy: {
        title: 'asc',
      },
    });
  }
}
