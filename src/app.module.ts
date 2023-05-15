import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const environment = configService.get<string>('NODE_ENV');
        console.log(environment);
        return {
          type: 'mysql',
          host: 'mysql',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'library',
          entities: [],
          synchronize: environment === 'development' ? true : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
