import { dataSource } from "../model";
import { Candle } from "../model/CandleEntity";

export const candleRepository = dataSource.getRepository(Candle).extend({
  // customRepository
});
