import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

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

  private getToken() {
    const payload = {
      access_key: this.accessKey,
      nonce: uuid(),
    };

    const token = jwt.sign(payload, this.secretKey);
    return token;
  }

  async getBalance(ticker?: string) {
    this.headers.Authorization = this.getToken();

    return this.upbitAxios.get(this.serverUrl + "/accounts", {
      headers: this.headers,
    });
  }
}
