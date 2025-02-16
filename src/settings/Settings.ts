import * as path from 'path';
import dotenv from 'dotenv';
import DataSourceOptions from 'typeorm';

dotenv.config();

const {
  PORT = '3000',
  NODE_ENV = 'development',
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN_HOURS = '24',
  OPENSTREETMAP_NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search',
  REDIS_HOST = 'localhost',
  REDIS_PORT = '6379',
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE
} = process.env;

export default class Settings {
  static environment: string = NODE_ENV;
  static port: number = parseInt(PORT);
  static accessTokenSecret: string = ACCESS_TOKEN_SECRET!;
  static timeToExpireAccessToken = `${ACCESS_TOKEN_EXPIRES_IN_HOURS}h`;
  static urlnominatim = OPENSTREETMAP_NOMINATIM_URL;
  static redisDb = {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT)
  };
  static database = {
    client: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT!),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE
  };
}
