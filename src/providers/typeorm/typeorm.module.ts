import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/providers/typeorm/typeorm-config.service';

@Module({
  imports: [
    NestTypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class TypeOrmModule {}
