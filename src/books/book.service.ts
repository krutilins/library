import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findById(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
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
}
