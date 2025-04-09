import { Module } from '@nestjs/common';
import { ScheduleModule } from "@nestjs/schedule";
import { LoyaltyService } from './loyalty.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { STrSaleDtl } from "src/database/entity/dsmart90/STr_SaleDtl.entity";
import { GoodRepository } from "src/database/repository/dsmart90/good.repo";

@Module({
  imports: [
    ScheduleModule,
    TypeOrmModule.forFeature([STrSaleDtl]),
  ],
  controllers: [],
  providers: [LoyaltyService, GoodRepository],
  exports: [LoyaltyService],
})
export class LoyaltyModule {}
