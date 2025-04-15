import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";


@Injectable()
export class RedisCacheService {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) { }

    async get(key: string): Promise<string | null> {
        return await this.cacheManager.get(key);
    }

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