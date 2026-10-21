import { Query, Resolver } from '@nestjs/graphql';
import { BookModel } from './book.model.js';
import { BookService } from './book.service.js';

@Resolver(() => BookModel)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [BookModel])
  books(): Promise<BookModel[]> {
    return this.bookService.findMany();
  }
}
