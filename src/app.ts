import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";

// 환경변수 세팅 - 환경변수를 사용하는 모듈은 아래에서 import
dotenv.config();

// 앱 시작
const app = express();
app.set("port", process.env.PORT || 8080);

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(router);

app.get("/ping", (req, res) => {
  const message = "pong";
  res.status(200).json({ message });
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
