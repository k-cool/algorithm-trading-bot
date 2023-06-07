import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import startProcess from "./process";
import bootstrapLog from "./util/log";
import dotenv from "dotenv";

// 환경변수 세팅 - 환경변수를 사용하는 모듈은 아래에서 import
dotenv.config();

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;
const isDebug = process.env.NODE_ENV !== "production";

if (!access_key || !secret_key || !server_url)
  throw new Error("환경변수를 확인해주세요.");

// util 함수
bootstrapLog(isDebug);

// 앱 시작
const app = express();
app.set("port", process.env.PORT || 8080);

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(router);

// pingpong test
app.get("/ping", (req, res) => {
  const message = "pong";
  res.status(200).json({ message });
});

// process 실행
app.get("/start", async (req, res, next) => {
  try {
    const result = await startProcess(access_key, secret_key, server_url);
    res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 예외처리
app.use((req: Request, res: Response) => {
  const message = `${req.method}:${req.url} NOT FOUND`;
  res.status(404).json({ message });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const message =
    process.env.NODE_ENV === "production" ? null : err?.toString();
  res.status(500).json({ message });
});

export default app;
