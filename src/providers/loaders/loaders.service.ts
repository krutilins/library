import { Injectable } from '@nestjs/common';
import { ILoaders } from './interfaces';
import { createAuthorsLoader } from 'src/models/authors/author.loader';
import { createBooksLoader } from 'src/models/books/book.loader';
import { BooksService } from 'src/models/books/book.service';
import { AuthorService } from 'src/models/authors/author.service';

@Injectable()
export class LoadersService {
  constructor(
    private readonly authorsService: AuthorService,
    private readonly booksService: BooksService,
  ) {}

  public getLoaders(): ILoaders {
    return {
      authorsLoader: createAuthorsLoader(this.authorsService),
      booksLoader: createBooksLoader(this.booksService),
    };
  }
}
