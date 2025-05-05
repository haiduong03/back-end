import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Cache } from "cache-manager";
import { EVENT_EMIT } from "../telegram/enum/event-emit.enum";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class RedisCacheService {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly configService: ConfigService,
    ) {
        this.configService.get('NODE_ENV') === 'production' &&
            this.set('connected', 'connected', 50000);
     }

    async get(key: string): Promise<string | null> {
        return await this.cacheManager.get(key);
    }

    @OnEvent(EVENT_EMIT.SET_CACHE)
    async set<T>(key: string, value: T, ttl?: number) {
        await this.cacheManager.set(key, value, ttl);
    }

    async del(key: string) {
        await this.cacheManager.del(key);
    }

    async clear() {
        await this.cacheManager.clear();
    }

    async wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T> {
        return this.cacheManager.wrap(key, fn, ttl);
    }
}