import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorDto, CreateAuthorInput } from './dto';
import { BooksService } from 'src/books/book.service';
import { BookDto } from 'src/books/dto';
import { UpdateAuthorMetadataInput } from './dto/update-author-metadata.input';
import { AssignBooksInput } from './dto/assign-books.input';
import { Book } from 'src/books/entity';
import { Author } from './entity';

@Resolver(() => AuthorDto)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorService,
    private readonly booksService: BooksService,
  ) {}

  @Query(() => [AuthorDto])
  async authors(): Promise<AuthorDto[]> {
    return this.authorsService.findAll();
  }

  @Query(() => AuthorDto)
  async author(@Args('id') id: number): Promise<AuthorDto> {
    return this.authorsService.findOneById(id);
  }

  @Mutation(() => AuthorDto)
  async createAuthor(
    @Args('data') createAuthorInput: CreateAuthorInput,
  ): Promise<AuthorDto> {
    return this.authorsService.create(createAuthorInput);
  }

  @Mutation(() => AuthorDto)
  async updateAuthor(
    @Args('id') id: number,
    @Args('data') updateAuthorInput: UpdateAuthorMetadataInput,
  ): Promise<AuthorDto> {
    return this.authorsService.update(id, updateAuthorInput);
  }

  @Mutation(() => Boolean)
  async deleteAuthor(@Args('id') id: number): Promise<boolean> {
    return this.authorsService.delete(id);
  }

  @Mutation(() => AuthorDto)
  async assignBooksToAuthor(
    @Args('data') data: AssignBooksInput,
  ): Promise<AuthorDto> {
    return this.authorsService.assignBooksToAuthor(data.authorId, data.bookIds);
  }

  @ResolveField(() => [BookDto])
  async books(
    @Parent() author: Author,
    @Context('loaders') loaders,
  ): Promise<BookDto[]> {
    if (!author.bookIds) return [];

    const books = [];

    for (const bookId of author.bookIds) {
      const book = await loaders.booksLoader.load(bookId);
      books.push(book);
    }

    return books.filter(Boolean);
  }
}
