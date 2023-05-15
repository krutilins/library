import { Injectable } from '@nestjs/common';
import { Author } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
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
}
