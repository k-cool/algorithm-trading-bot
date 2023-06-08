import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { getBalanceDTO, getCandleDTO, getCurrentPriceDTO, getTickerDTO, getTradeDTO } from "../../dto/lv1Tolv2.dto";

export default class Upbit {
  upbitAxios: AxiosInstance;
  headers: any;

  constructor(
    private accessKey: string,
    private secretKey: string,
    private serverUrl: string
  ) {
    const config: AxiosRequestConfig = {
      baseURL: this.serverUrl,
    };

    this.upbitAxios = axios.create(config);
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  //token 생성
  private getToken() {
    const payload = {
      access_key: this.accessKey,
      nonce: uuid(),
    };

    const token = jwt.sign(payload, this.secretKey);
    return token;
  }

  //upbit 서버 활성화 조회
  async getServerStatus(): Promise<boolean> {
    const serverStatus = await this.upbitAxios.get(this.serverUrl + "/market/all", {
      params: { isDetails: 'false' },
    });
    return (serverStatus.status === 200 ? true : false);
  }

  //전체 계좌 조회
  async getBalance(ticker?: string): Promise<getBalanceDTO[]> {
    this.headers.Authorization = this.getToken();

    const balanceData = await this.upbitAxios.get(this.serverUrl + "/accounts", {
      headers: this.headers,
    });    
    
    const transformedBalanceData: getBalanceDTO[] = balanceData.data.map((item: { english_name: string; market: string; korean_name: string; }) => ({
      name: item.english_name,
      koreanName: item.korean_name,
      ticker: item.market.replace('KRW-', ''),
    }));
    return transformedBalanceData;
  }

  //마켓 티커 조회
  async getTicker(): Promise<getTickerDTO[]> {
    const externalTickerData = this.upbitAxios.get(this.serverUrl + "/market/all", {
      params: { isDetails: 'false' },
    });
    const tickerData = (await externalTickerData).data
    
    const filteredData = tickerData.filter((item: { market: string; }) => item.market.startsWith('KRW-'));

    const transformedTickerData: getTickerDTO[] = filteredData.map((item: { english_name: string; market: string; korean_name: string; }) => ({
      name: item.english_name,
      koreanName: item.korean_name,
      ticker: item.market.replace('KRW-', ''),
    }));
    return transformedTickerData;
  }

  //캔들 조회 / 일단 1분봉만 구현
  async getCandle(market: string, count: number): Promise<getCandleDTO> {
    market = 'KRW' + '-' + market;
    const externalCandleData = await this.upbitAxios.get(this.serverUrl + `/candles/minutes/1`, {
      headers: this.headers,
      params: {
        market,
        count,
      }
    });
    const candleData: getCandleDTO = {
      open:  externalCandleData.data[0].opening_price,
      high:  externalCandleData.data[0].high_price,
      low:  externalCandleData.data[0].low_price,
      close:  externalCandleData.data[0].trade_price,
      volume:  externalCandleData.data[0].candle_acc_trade_volume,
      value:  externalCandleData.data[0].candle_acc_trade_price,
    };
    return candleData;
  }

  //채결 내역 조회
  async getTrade(market: string): Promise<getTradeDTO> {
    market = 'KRW' + '-' + market;
    const externalTradeData = await this.upbitAxios.get(this.serverUrl + "/trades/ticks", {
      params: {
        market
      }
    });
    const tradeData: getTradeDTO = {
      tradeDateUtc:  externalTradeData.data[0].trade_date_utc,
      tradeTimeUtc:  externalTradeData.data[0].trade_time_utc,
      tradePrice:  externalTradeData.data[0].trade_price,
      tradeVolume:  externalTradeData.data[0].trade_volume,
      changePrice:  externalTradeData.data[0].change_price,
      askBid:  externalTradeData.data[0].ask_bid,
    };
    return tradeData;
  }

  //현재가 정보 조회
  async getCurrentPrice(markets: string): Promise<getCurrentPriceDTO> {
    markets = 'KRW' + '-' + markets;
    const externalcurrentPriceData = await this.upbitAxios.get(this.serverUrl + "/ticker", {
      headers: this.headers,
      params: {
        markets,
      }
    });
    const currentPrice: getCurrentPriceDTO = {
      tradeDateKst: externalcurrentPriceData.data[0].trade_date_kst,
      tradeTimeKst: externalcurrentPriceData.data[0].trade_time_kst,
      tradeTimestamp:  externalcurrentPriceData.data[0].trade_timestamp,
      open:  externalcurrentPriceData.data[0].opening_price,
      high: externalcurrentPriceData.data[0].high_price,
      low: externalcurrentPriceData.data[0].low_price,
      close: externalcurrentPriceData.data[0].trade_price,
      prevClosingPrice: externalcurrentPriceData.data[0].prev_closing_price,
      change: externalcurrentPriceData.data[0].change,
      changePrice: externalcurrentPriceData.data[0].change_price,
      changeRate:  externalcurrentPriceData.data[0].change_rate,
      signedChangePrice:  externalcurrentPriceData.data[0].signed_change_price,
      signedChangeRate:  externalcurrentPriceData.data[0].signed_change_rate,
      tradeVolume:  externalcurrentPriceData.data[0].trade_volume,
      accTradePrice:  externalcurrentPriceData.data[0].acc_trade_price,
      accTradePrice24h:  externalcurrentPriceData.data[0].acc_trade_price_24h,
      accTradeVolume:  externalcurrentPriceData.data[0].acc_trade_volume,
      accTradeVolume24h:  externalcurrentPriceData.data[0].acc_trade_volume_24h,
      highest52WeekPrice:  externalcurrentPriceData.data[0].highest_52_week_price,
      highest52WeekDate:  externalcurrentPriceData.data[0].highest_52_week_date,
      lowest52WeekPrice:  externalcurrentPriceData.data[0].lowest_52_week_price,
      lowest52WeekDate:  externalcurrentPriceData.data[0].lowest_52_week_date,
      timestamp:  externalcurrentPriceData.data[0].timestamp,
    };
    return currentPrice;
  }
}
