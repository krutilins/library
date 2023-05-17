import { Author } from 'src/authors/entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  RelationId,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: 'books_authors', // table name for the junction table of this relation
  })
  authors?: Author[];

  @RelationId((book: Book) => book.authors)
  authorIds?: number[];
}
