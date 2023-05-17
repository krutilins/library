import * as DataLoader from 'dataloader';

import { mapFromArray } from 'src/utils/mapFromArray';
import { BooksService } from './book.service';
import { Book } from './entity';

export function createBooksLoader(bookService: BooksService) {
  return new DataLoader<number, Book>(async (ids) => {
    const books = await bookService.findByIds(ids);

    const booksMap = mapFromArray(books, 'id');

    return ids.map((id) => booksMap.get(id));
  });
}
