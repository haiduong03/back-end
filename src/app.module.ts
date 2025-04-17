import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { HttpExceptionFilter } from "./common/filters/httpException.filter";
import { LoyaltyModule } from "./modules/loyalty/loyalty.module";
import { MssqlDatabaseModule } from "./modules/mssql/mssql.module";
import { RedisCacheModule } from "./modules/redis-cache/redis-cache.module";
import { TelegramModule } from './modules/telegram/telegram.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoyaltyModule,
    MssqlDatabaseModule,
    RedisCacheModule,
    ScheduleModule.forRoot(),
    TelegramModule,
  ],
  providers: [
    HttpExceptionFilter,
  ]
})
export class AppModule { }
