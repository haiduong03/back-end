import { Logger, Module } from '@nestjs/common';
import { HdrRepository } from "@repository/dsmart90/hdr.repo";
import { LoyaltyService } from './loyalty.service';
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    ConfigModule,
    CacheModule
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
