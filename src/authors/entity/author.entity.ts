import { Book } from 'src/books/entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  RelationId,
} from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];

  @RelationId((author: Author) => author.books)
  bookIds: number[];
}
