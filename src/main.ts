import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  const appConfigService = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appConfigService.port);

  logger.log(`Server listening on ${await app.getUrl()}`);
}

bootstrap();
