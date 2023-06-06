import "reflect-metadata";
import { DataSource } from "typeorm";

import { Coin } from "./CoinEntity";
import { Candle } from "./CandleEntity";
import { Action } from "./ActionEntity";
import { Bot } from "./BotEntity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Coin, Candle, Action, Bot],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy(),
});

const connect = () => AppDataSource.initialize();

export default connect;