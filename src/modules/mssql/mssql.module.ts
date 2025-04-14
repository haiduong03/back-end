import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): DataSourceOptions => ({
                type: 'mssql',
                host: configService.get<string>('HOST'),
                username: configService.get<string>('USER_NAME'),
                password: configService.get<string>('PASSWORD'),
                database: configService.get<string>('DATABASE'),
                synchronize: configService.get<string>('SYNCHRONIZE') === 'true',
                logging: configService.get<string>('LOGGING') === 'true',
                extra: {
                    encrypt: false,
                    trustServerCertificate: true,
                },
                entities: ['dist/database/entity/dsmart90/*.entity{.ts,.js}'],
                migrations: ['dist/database/migrations/**/*{.ts,.js}'],
                pool: {
                    max: 100,
                },
                connectionTimeout: 15000,
                requestTimeout: 30000
            }),
        }),
    ],
})
export class MssqlDatabaseModule { }
