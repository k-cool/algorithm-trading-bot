import Upbit from "./modules/upbit";
import Calculation from "./modules/calculation";
import { tickerData } from "./data/tickerTest";
import { coinRepository } from "./repository";
import { Coin } from "./model/CoinEntity";

export default async function startProcess(
  accessKey: string,
  secretKey: string,
  serverUrl: string
) {
  "\nProcess 시작!\n".logGreen();

  `환경변수 체크: ${serverUrl ? "PASS".blue() : "FAIL".red()}`.log();

  // 초기화
  "Upbit 초기화".logGreen();
  const upbit = new Upbit(accessKey, secretKey, serverUrl);

  // Calculation 시작
  "Calculation 초기화".logGreen();
  const calculation = new Calculation(upbit, coinRepository);

  // 코인 정보 DB에 저장
  await calculation.setCoinMetadataToDB(tickerData);

  // await coinRepository.deleteAll();
  return await coinRepository.find();
}
