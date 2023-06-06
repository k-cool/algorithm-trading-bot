import { Repository } from "typeorm";
import { dataSource } from "../model";
import { Coin } from "../model/CoinEntity";

export type CoinRepository = Repository<Coin> & {
  deleteAll(): Promise<void>;
  upsertMany(coinList: Partial<Coin>[]): Promise<void>;
};

export const coinRepository: CoinRepository = dataSource
  .getRepository(Coin)
  .extend({
    async deleteAll() {
      await this.createQueryBuilder("coin").delete().execute();
    },

    // TODO: 더 좋은 방법 없을지 고민해보기
    async upsertMany(coinList: Partial<Coin>[]) {
      const promises = coinList.map(async ({ ticker, koName, enName }) => {
        const found = await this.findOneBy({ ticker });
        if (found) return;

        const coin = this.create({ ticker, koName, enName });
        await this.save(coin);
      });

      await Promise.all(promises);
    },
  });
