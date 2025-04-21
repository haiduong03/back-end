import KeyvRedis, { createClient, Keyv } from "@keyv/redis";
import { CacheModule } from "@nestjs/cache-manager";
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisCacheService } from "./redis-cache.service";
@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const host = configService.get('REDIS_HOST');
                const port = +configService.get('REDIS_PORT');
                const user = configService.get('REDIS_USER');
                const password = configService.get('REDIS_PASSWORD');

                const namespace = { namespace: 'familymart' }
                const url = `redis://:${password}@${host}:${port}`

                const keyvRedis = new KeyvRedis(url, namespace)
                const keyv = new Keyv(keyvRedis, namespace)

                return { stores: [keyv] };
            },
        }),
    ],
    exports: [RedisCacheService],
    providers: [RedisCacheService],
})
export class RedisCacheModule { }
