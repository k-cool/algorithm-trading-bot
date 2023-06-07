import { getBalanceDTO } from "../DTO/temp.dto";

export const BALANCE_DATA: getBalanceDTO = {
  balanceData: [
    {
      currency: "KRW",
      balance: 1000000,
      locked: 0,
      avgBuyPrice: 0,
      unitCurrency: "KRW",
    },
    {
      currency: "BTC",
      balance: 2.0,
      locked: 0.0,
      avgBuyPrice: 101000,
      unitCurrency: "KRW",
    },
  ],
};
