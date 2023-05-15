import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Author } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateAuthorMetadataInput } from './dto/update-author-metadata.input';
import { BooksService } from 'src/books/book.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @Inject(forwardRef(() => BooksService))
    private readonly bookService: BooksService,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async findOneById(id: number): Promise<Author> {
    return await this.authorRepository.findOneBy({ id });
  }

  async create(authorData: Partial<Author>): Promise<Author> {
    const author = await this.authorRepository.create(authorData);
    return await this.authorRepository.save(author);
  }

  async findByBookId(bookId: number): Promise<Author[]> {
    const authors = await this.authorRepository.find({
      where: { books: { id: bookId } },
    });
    return authors;
  }

  async findByIds(authorIds: number[]): Promise<Author[]> {
    const authors = await this.authorRepository.findBy({ id: In(authorIds) });
    return authors;
  }

  async update(
    id: number,
    authorData: UpdateAuthorMetadataInput,
  ): Promise<Author> {
    await this.authorRepository.update(id, authorData);
    return this.authorRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.authorRepository.delete(id);
    return result.affected > 0;
  }

  async assignBooksToAuthor(
    authorId: number,
    bookIds: number[],
  ): Promise<Author> {
    const author = await this.authorRepository.findOne({
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
    return this.authorRepository.save(author);
  }
}
