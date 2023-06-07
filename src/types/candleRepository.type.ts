import { Repository } from "typeorm";
import { Candle } from "../model/CandleEntity";
import { getCandleDTO } from "../DTO/temp.dto";

export type CandleRepository = Repository<Candle> & {
  setCandleDataByCoinId(
    coinId: number,
    candleData: getCandleDTO
  ): Promise<void>;
};
