import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorModule } from './authors/author.module';
import { BookModule } from './books/book.module';
import { CommonModule } from './common/common.module';

const apiModules = [AuthorModule, BookModule];

@Module({
  imports: [CommonModule, ...apiModules],
  providers: [AppService],
})
export class AppModule {}
