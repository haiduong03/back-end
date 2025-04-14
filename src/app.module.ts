import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { HttpExceptionFilter } from "./common/filters/httpException.filter";
import { LoyaltyModule } from "./modules/loyalty/loyalty.module";
import { MssqlDatabaseModule } from "./modules/mssql/mssql.module";
import { RedisCacheModule } from "./modules/redis-cache/redis-cache.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    LoyaltyModule,
    MssqlDatabaseModule,
    RedisCacheModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    HttpExceptionFilter,
  ]
})
export class AppModule { }
