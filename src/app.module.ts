import { Module } from '@nestjs/common';
import { LoyaltyModule } from "./loyalty/loyalty.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    LoyaltyModule,
    ScheduleModule.forRoot(),
  ],
  providers: []
})
export class AppModule  {}
