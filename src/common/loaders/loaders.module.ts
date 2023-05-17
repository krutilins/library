import { Module } from '@nestjs/common';
import { LoadersService } from './loaders.service';
import { AuthorModule } from 'src/authors/author.module';
import { BookModule } from 'src/books/book.module';

@Module({
  imports: [AuthorModule, BookModule],
  providers: [LoadersService],
  exports: [LoadersService],
})
export class LoadersModule {}
