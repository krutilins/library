import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity';
import { BaseService } from 'src/base';
import { AuthorService } from '../authors/author.service';

@Injectable()
export class BooksService extends BaseService<Book> {
  constructor(
    @InjectRepository(Book)
    protected readonly repository: Repository<Book>,
    @Inject(forwardRef(() => AuthorService))
    private readonly authorService: AuthorService,
  ) {
    super();
  }

  async assignAuthorsByBookId(
    bookId: number,
    authorIds: number[],
  ): Promise<Book> {
    const book = await this.findOneById(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    const authors = await this.authorService.findByIds(authorIds);

    book.authors = authors;

    return await this.repository.save(book);
  }
}
