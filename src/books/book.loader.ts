import { BooksService } from './book.service';
import { createBaseLoader } from 'src/base/base.loader';

export function createBooksLoader(bookService: BooksService) {
  return createBaseLoader(bookService);
}
