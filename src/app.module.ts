import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
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
    EventEmitterModule.forRoot(),
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter
    },
  ]
})
export class AppModule { }
