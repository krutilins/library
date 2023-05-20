import * as DataLoader from 'dataloader';

import { createBaseLoader } from 'src/base';

import { BooksService } from './book.service';
import { Book } from './entity';

export function createBooksLoader(
  bookService: BooksService,
): DataLoader<number, Book, number> {
  return createBaseLoader<Book>(bookService);
}
