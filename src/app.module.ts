import { Module } from '@nestjs/common';
import { AuthorModule } from './authors/author.module';
import { BookModule } from './books/book.module';
import { CommonModule } from './common/common.module';

const apiModules = [AuthorModule, BookModule];

@Module({
  imports: [CommonModule, ...apiModules],
})
export class AppModule {}
