import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  private readonly helloWorldMessage = 'Hello World!';

  @Get('checkStatus')
  @HttpCode(HttpStatus.OK)
  helloWorld(@Req() req: Request): string {
    this.logger.log(`Request from ${req.ip} to ${req.originalUrl}`);
    return this.helloWorldMessage;
  }
}
