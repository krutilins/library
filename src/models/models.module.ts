import { Module } from '@nestjs/common';
import { AuthorModule } from './authors/author.module';
import { BookModule } from './books/book.module';

const apiModules = [AuthorModule, BookModule];

@Module({
  imports: [...apiModules],
  exports: [...apiModules],
})
export class ModelsModule {}
