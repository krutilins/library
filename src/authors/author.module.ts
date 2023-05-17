import { Module, forwardRef } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorsResolver } from './author.resolver';
import { Author } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/books/book.module';

@Module({
  imports: [forwardRef(() => BookModule), TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorsResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
