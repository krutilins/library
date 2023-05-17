import { Injectable } from '@nestjs/common';
import { ILoaders } from './interfaces';
import { AuthorService } from 'src/authors/author.service';
import { BooksService } from 'src/books/book.service';
import { createAuthorsLoader } from 'src/authors/author.loader';
import { createBooksLoader } from 'src/books/book.loader';

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
