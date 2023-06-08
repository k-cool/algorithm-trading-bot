import Upbit from "./modules/upbit";

export default async function startProcess(
  accessKey: string,
  secretKey: string,
  serverUrl: string
) {
  const upbit = new Upbit(accessKey, secretKey, serverUrl);
  
  const connectTest = await upbit.getServerStatus();
  console.log(connectTest); //true : 서버 활성화, false : 서버 비활성화
  
  
  const result = await upbit.getBalance();
  console.log(result);
  
  const result2 = await upbit.getTicker();
  console.log(result2);
  
  
  const result3 = await upbit.getCandle("BTC", 1);
  console.log(result3);
  

  const result4 = await upbit.getTrade("BTC");
  console.log(result4);
  

  const result5 = await upbit.getCurrentPrice("BTC");
  console.log(result5);  
}
