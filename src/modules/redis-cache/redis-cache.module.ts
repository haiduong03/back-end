import { createKeyv, Keyv } from "@keyv/redis";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheableMemory } from "cacheable";
import { RedisCacheService } from "./redis-cache.service";

@Module({
    imports: [
        CacheModule.register({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const host = "" + configService.get('REDIS_HOST');
                const port = +configService.get('REDIS_PORT');
                const ttl = +configService.get('REDIS_TTL');

                return {
                    stores: [
                        createKeyv(`redis://${host}:${port}`),
                    ],
                    ttl,
                }
            }
        }),
    ],
    exports: [RedisCacheService],
    providers: [RedisCacheService],
})
export class RedisCacheModule { }
