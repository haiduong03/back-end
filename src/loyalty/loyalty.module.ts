import { Module } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule
  ],
  controllers: [],
  providers: [LoyaltyService],
})
export class LoyaltyModule {}
