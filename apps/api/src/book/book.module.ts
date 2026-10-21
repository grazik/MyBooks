import { Module } from '@nestjs/common';
import { BookService } from './book.service.js';
import { DatabaseModule } from '../database/database.module.js';
import { BookResolver } from './book.resolver.js';

@Module({
  imports: [DatabaseModule],
  providers: [BookService, BookResolver],
})
export class BookModule {}
