import { Double } from "typeorm";

class getBalanceDTO {
    currency: string;
    balance: number;
    locked: number;
    avgBuyPrice: number;
    unitCurrency: string; //KRW
}

class getTickerDTO {
    //market과 ticker는 다르다?
    name: string;
    ticker: string;
    koreanName: string;
}

class getCandleDTO {
    // market은 이미 알고있다고 가정 
    //market: string; //market
    open: Double; //opening_price
    high: Double; //high_price
    low: Double; //low_price
    close: Double; //trade_price
    volume: Double; //candle_acc_trade_volume
    value: Double; //candle_acc_trade_price
}

class getTradeDTO {
    // 가장 최근의 체결 내역 하나만 가져온다고 가정
    // market은 이미 알고있다고 가정 
    tradeDateUtc: string; //trade_date_utc
    tradeTimeUtc: string; //trade_time_utc
    tradePrice: Double; //trade_price
    tradeVolume: Double; //trade_volume
    changePrice: Double; //change_price
    askBid: string; //ask_bid
}

class getCurrentPriceDTO {
    tradeDateKst: string;
    tradeTimeKst: string;
    tradeTimestamp: string; // 원래는 long
    open: Double;
    high: Double;
    low: Double;
    close: Double;
    prevClosingPrice: Double;
    change: string;
    changePrice: Double;
    changeRate: Double;
    signedChangePrice: Double;
    signedChangeRate: Double;
    tradeVolume: Double;
    accTradePrice: Double;
    accTradePrice24h: Double;
    accTradeVolume: Double;
    accTradeVolume24h: Double;
    highest52WeekPrice: Double;
    highest52WeekDate: string;
    lowest52WeekPrice: Double;
    lowest52WeekDate: string;
    timestamp: string // 원래는 long
}


export { getBalanceDTO, getTickerDTO, getCandleDTO, getTradeDTO, getCurrentPriceDTO };