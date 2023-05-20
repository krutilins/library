import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app/config.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [AppConfigModule, ProvidersModule, ModelsModule],
  controllers: [AppController],
})
export class AppModule {}
