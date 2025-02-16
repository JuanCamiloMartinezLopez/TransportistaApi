import { injectable } from 'inversify';
import { createClient, RedisClientType } from 'redis';
import { Settings } from '@settings';

@injectable()
export class Redis {
  private instance: RedisClientType;
  constructor() {
    this.instance = createClient({ url: `redis://${Settings.redisDb.host}:${Settings.redisDb.port}` });
    this.instance.connect();
  }

  // Function to set a key-value pair in Redis
  async setValue(key: string, value: string): Promise<void> {
    await this.instance.set(key, value);
  }

  // Function to retrieve a value by key from Redis
  async getValue(key: string): Promise<string | null> {
    return this.instance.get(key);
  }
}
