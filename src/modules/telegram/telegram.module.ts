import { Logger, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
  providers: [
    TelegramService,
    Logger,
  ],
  exports: [TelegramService],
})
export class TelegramModule { }
