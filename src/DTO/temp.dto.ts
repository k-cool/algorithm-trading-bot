import { Double } from "typeorm";

export class getBalanceDTO {
  balanceData: {
    currency: string;
    balance: number;
    locked: number;
    avgBuyPrice: number;
    unitCurrency: string; //KRW
  }[];
}

export class getTickerDTO {
  tickerData: {
    market: string;
    koName: string;
    ticker: string;
  }[];
}

export class getCandleDTO {
  // market은 이미 알고있다고 가정
  //market: string; //market
  open: Double; //opening_price
  high: Double; //high_price
  low: Double; //low_price
  close: Double; //trade_price
  volume: Double; //candle_acc_trade_volume
  value: Double; //candle_acc_trade_price
}

export class getTradeDTO {
  // 가장 최근의 체결 내역 하나만 가져온다고 가정
  // market은 이미 알고있다고 가정
  tradeDateUtc: string; //trade_date_utc
  tradeTimeUtc: string; //trade_time_utc
  tradePrice: Double; //trade_price
  tradeVolume: Double; //trade_volume
  changePrice: Double; //change_price
  askBid: string; //ask_bid
}

export class getCurrentPriceDTO {
  tradePrice: Double; //trade_price
}
