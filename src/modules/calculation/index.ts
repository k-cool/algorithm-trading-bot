import Upbit from "../upbit";
import { getBalanceDTO, getTickerDTO } from "../../DTO/temp.dto";
import { CoinRepository } from "../../types/coinRepository.type";
import { CandleRepository } from "../../types/candleRepository.type";
import { CANDLE_DATA } from "../../data/candleData";
import { BALANCE_DATA } from "../../data/balanceData";

export default class Calculation {
  state = {};

  constructor(
    private upbit: Upbit,
    private coinRepository: CoinRepository,
    private candleRepository: CandleRepository
  ) {
    this.init();
  }

  private async init() {
    // 코인 정보 조회
    // 코인 정보 DB에 저장
    // await this.setCoinMetadataToDB(tickerData);
    // 잔고 정보 조회
    // 잔고 정보 저장
    // this.setBalance(BALANCE_DATA);
    // 캔들 정보 조회 조회 및 저장
    await this.setCandleDataToDB();
    //

    const test = await this.candleRepository.find();
    console.log(test);
  }

  private async setCoinMetadataToDB({ tickerData }: getTickerDTO) {
    const coinList = tickerData.map(({ ticker, koName }) => ({
      ticker,
      koName,
      enName: "",
    }));

    await this.coinRepository.upsertMany(coinList);
  }

  private setBalance({ balanceData }: getBalanceDTO) {
    this.state = balanceData;
  }

  private async setCandleDataToDB() {
    const coinList = await this.coinRepository.getTickerList();

    const promises = coinList.map(async ({ id, ticker }) => {
      // upbit 캔들데이터 요청
      const data = CANDLE_DATA;

      await this.candleRepository.setCandleDataByCoinId(id, data);
    });

    await Promise.all(promises);
  }
}
