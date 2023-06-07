import { Repository } from "typeorm";
import { Coin } from "../model/CoinEntity";
import { getCandleDTO } from "../DTO/temp.dto";

export type CoinRepository = Repository<Coin> & {
  deleteAll(): Promise<void>;
  upsertMany(coinList: Partial<Coin>[]): Promise<void>;
  getTickerList(): Promise<ITicker[]>;
};

export interface ITicker {
  id: number;
  ticker: string;
}
