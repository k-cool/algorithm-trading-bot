import { getCandleDTO } from "../DTO/temp.dto";
import { dataSource } from "../model";
import { Candle } from "../model/CandleEntity";

export const candleRepository = dataSource.getRepository(Candle).extend({
  async setCandleDataByCoinId(coinId: number, candleData: getCandleDTO) {
    // TODO: Double 타입
    //@ts-ignore
    const data = this.create({ ...candleData, coin: coinId });
    await this.save(data);
  },
});
