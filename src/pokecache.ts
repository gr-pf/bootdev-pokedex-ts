type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, { createdAt: Date.now(), val })
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (!entry) {
            return;
        }
        return entry.val;
    }

    #reap(): void {
        const ref: number = Date.now() - this.#interval;
        for (const [key, entry] of this.#cache) {
            if (entry.createdAt < ref) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}