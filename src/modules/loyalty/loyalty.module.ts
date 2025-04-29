import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from "@nestjs/schedule";
import { HdrRepository } from "@repository/dsmart90/hdr.repo";
import { RedisCacheModule } from "../redis-cache/redis-cache.module";
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from "./loyalty.controller";

@Module({
  imports: [
    ScheduleModule,
    RedisCacheModule,
  ],
  controllers: [LoyaltyController],
  providers: [
    LoyaltyService,
    HdrRepository,
    Logger,
  ],
  exports: [LoyaltyService],
})
export class LoyaltyModule {}
