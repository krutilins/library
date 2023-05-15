import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './book.service';
import { BookDto, CreateBookInput } from './dto';

@Resolver(() => BookDto)
export class BookResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [BookDto])
  async books(): Promise<BookDto[]> {
    return this.booksService.findAll();
  }

  @Query(() => BookDto)
  async book(@Args('id') id: number): Promise<BookDto> {
    return this.booksService.findById(id);
  }

  @Mutation(() => BookDto)
  async createBook(
    @Args('data') createBookInput: CreateBookInput,
  ): Promise<BookDto> {
    return this.booksService.create(createBookInput);
  }
}
