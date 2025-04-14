import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { HdrRepository } from "@repository/dsmart90/hdr.repo";
import { LoyaltyService } from './loyalty.service';
import { RedisCacheModule } from "../redis-cache/redis-cache.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule,
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
