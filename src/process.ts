import Upbit from "./modules/upbit";
import Calculation from "./modules/calculation";
import { candleRepository, coinRepository } from "./repository";

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
  const calculation = new Calculation(upbit, coinRepository, candleRepository);

  return "ok";
}
