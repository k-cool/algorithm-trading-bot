import "reflect-metadata";
import { DataSource } from "typeorm";
import app from "../app";

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

const connect = () =>
  AppDataSource.initialize()
    .then(() => {
      app.listen(app.get("port"), () => {
        console.log(`서버가 ${app.get("port")}번에 열렸어요~`);
      });
    })
    .catch((error: unknown) => console.log("DB 연결 에러", error));

export default connect;
