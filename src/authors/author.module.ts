import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorsResolver } from './author.resolver';
import { Author } from './author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorsResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
