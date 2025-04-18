import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { HdrRepository } from "@repository/dsmart90/hdr.repo";
import { RedisCacheModule } from "../redis-cache/redis-cache.module";
import { LoyaltyService } from './loyalty.service';

@Module({
  imports: [
    ScheduleModule,
    RedisCacheModule,
  ],
  controllers: [],
  providers: [
    LoyaltyService,
    HdrRepository,
    Logger,
  ],
  exports: [LoyaltyService],
})
export class LoyaltyModule {}
