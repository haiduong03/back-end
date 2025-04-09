import { Module } from '@nestjs/common';
import { LoyaltyModule } from "./loyalty/loyalty.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    LoyaltyModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.10.16',
      username: 'it',
      password: 'Famima@123',
      database: 'DSMART90',
      synchronize: false,
      extra: {
        encrypt: false,
        trustServerCertificate: true,  
      },
      entities: [
        __dirname + '/database/entity/dsmart90/*.entity{.ts,.js}',
      ]
    }),
    ScheduleModule.forRoot(),
  ],
  providers: []
})
export class AppModule  {}
