import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Author } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { BooksService } from '../books/book.service';

@Injectable()
export class AuthorService extends BaseService<Author> {
  constructor(
    @InjectRepository(Author)
    protected readonly repository: Repository<Author>,
    @Inject(forwardRef(() => BooksService))
    private readonly bookService: BooksService,
  ) {
    super();
  }

  async assignBooksToAuthor(
    authorId: number,
    bookIds: number[],
  ): Promise<Author> {
    const author = await this.repository.findOne({
      where: { id: authorId },
      relations: {
        books: true,
      },
    });
    if (!author) {
      throw new Error('Author not found');
    }

    const books = await this.bookService.findByIds(bookIds);
    author.books = books;
    return this.repository.save(author);
  }
}
