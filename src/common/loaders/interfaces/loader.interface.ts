import DataLoader from 'dataloader';
import { Author } from 'src/authors/entity';
import { Book } from 'src/books/entity';

export interface ILoaders {
  authorsLoader: DataLoader<number, Author, number>;
  booksLoader: DataLoader<number, Book, number>;
}
