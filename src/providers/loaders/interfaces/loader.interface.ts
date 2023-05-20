import DataLoader from 'dataloader';
import { Author } from 'src/models/authors/entity';
import { Book } from 'src/models/books/entity';

export interface ILoaders {
  authorsLoader: DataLoader<number, Author, number>;
  booksLoader: DataLoader<number, Book, number>;
}
