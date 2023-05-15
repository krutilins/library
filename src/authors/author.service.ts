import { Injectable } from '@nestjs/common';
import { Author } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorService: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorService.find();
  }

  async findOneById(id: number): Promise<Author> {
    return await this.authorService.findOneBy({ id });
  }

  async create(authorData: Partial<Author>): Promise<Author> {
    const author = await this.authorService.create(authorData);
    return await this.authorService.save(author);
  }
}
