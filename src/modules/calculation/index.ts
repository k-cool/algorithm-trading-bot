import { Repository } from "typeorm";
import { getTickerDTO } from "../../DTO/temp.dto";
import Upbit from "../upbit";
import { Coin } from "../../model/CoinEntity";
import { CoinRepository } from "../../repository/Coin.repo";

export default class Calculation {
  constructor(private upbit: Upbit, private coinRepository: CoinRepository) {}

  async setCoinMetadataToDB({ tickerData }: getTickerDTO) {
    const coinList = tickerData.map(({ ticker, koName }) => ({
      ticker,
      koName,
      enName: "ㅇ0000",
    }));

    await this.coinRepository.upsertMany(coinList);
  }
}
