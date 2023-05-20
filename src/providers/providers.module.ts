import { Module } from '@nestjs/common';
import { TypeOrmModule } from './typeorm/typeorm.module';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
  imports: [GraphQLModule, TypeOrmModule],
})
export class ProvidersModule {}
