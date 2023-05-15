import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './book.service';
import { BookResolver } from './book.resolver';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from 'src/authors/author.module';

@Module({
  imports: [forwardRef(() => AuthorModule), TypeOrmModule.forFeature([Book])],
  providers: [BooksService, BookResolver],
  exports: [BooksService],
})
export class BookModule {}
