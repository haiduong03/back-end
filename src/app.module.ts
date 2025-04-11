import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { HttpExceptionFilter } from "./common/filters/httpException.filter";
import { LoyaltyModule } from "./modules/loyalty/loyalty.module";
import { MssqlDatabaseModule } from "./modules/mssql/mssql.module";
import { CacheModule } from "@nestjs/cache-manager";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoyaltyModule,
    MssqlDatabaseModule,
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          host: 'localhost',
          port: 6379,
          ttl: 3600, // 1 hour
        }),
      }),
    }),
  ],
  providers: [
    HttpExceptionFilter,
  ]
})
export class AppModule  {}
