import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from './entity';
import { AuthorService } from 'src/authors/author.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @Inject(forwardRef(() => AuthorService))
    private readonly authorService: AuthorService,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findById(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
  }

  async findByIds(bookIds: Readonly<number[]>): Promise<Book[]> {
    const authors = await this.booksRepository.findBy({ id: In(bookIds) });
    return authors;
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const book = this.booksRepository.create(bookData);
    return this.booksRepository.save(book);
  }

  async update(id: number, bookData: Partial<Book>): Promise<Book> {
    await this.booksRepository.update(id, bookData);
    return this.booksRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async assignAuthorsByBookId(
    bookId: number,
    authorIds: number[],
  ): Promise<Book> {
    const book = await this.findById(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    const authors = await this.authorService.findByIds(authorIds);

    book.authors = authors;

    return await this.booksRepository.save(book);
  }
}
