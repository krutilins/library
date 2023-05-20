import { Module } from '@nestjs/common';
import { LoadersService } from './loaders.service';
import { AuthorModule } from 'src/models/authors/author.module';
import { BookModule } from 'src/models/books/book.module';

@Module({
  imports: [AuthorModule, BookModule],
  providers: [LoadersService],
  exports: [LoadersService],
})
export class LoadersModule {}
