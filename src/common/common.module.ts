import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { CustomTypeOrmModule } from './typeorm/typeorm.module';
import { CustomGraphQLModule } from './graphql/graphql.module';

@Module({
  imports: [
    CustomGraphQLModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CustomTypeOrmModule,
  ],
})
export class CommonModule {}
