import Upbit from "./modules/upbit";

export default async function startProcess(
  accessKey: string,
  secretKey: string,
  serverUrl: string
) {
  const upbit = new Upbit(accessKey, secretKey, serverUrl);

  const result = await upbit.getBalance();
  console.log(result.data);
}
