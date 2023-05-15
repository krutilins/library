import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BooksService } from './book.service';
import { BookDto, CreateBookInput, UpdateBookMetadataInput } from './dto';
import { AuthorService } from 'src/authors/author.service';
import { AuthorDto } from 'src/authors/dto';
import { AssignAuthorsInput } from './dto/assign-book-author.input';

@Resolver(() => BookDto)
export class BookResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorService,
  ) {}

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

  @Mutation(() => BookDto)
  async updateBookMetadata(
    @Args('id') id: number,
    @Args('data') updateBookInput: UpdateBookMetadataInput,
  ): Promise<BookDto> {
    return this.booksService.update(id, updateBookInput);
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args('id') id: number): Promise<boolean> {
    await this.booksService.delete(id);
    return true;
  }

  @Mutation(() => BookDto)
  async assignAuthorsByBookId(
    @Args('data') assignAuthorsInput: AssignAuthorsInput,
  ): Promise<BookDto> {
    const { bookId, authorIds } = assignAuthorsInput;
    return this.booksService.assignAuthorsByBookId(bookId, authorIds);
  }

  @ResolveField(() => [AuthorDto])
  async authors(@Parent() book: BookDto): Promise<AuthorDto[]> {
    return this.authorsService.findByBookId(book.id);
  }
}