import app from "./app";
import connect from "./model";

const start = async () => {
  // DB 연결
  try {
    await connect();

    app.listen(app.get("port"), () => {
      `서버가 ${(app.get("port") as string).purple()}번에 열렸어요~`.log();
    });
  } catch (err) {
    console.log("DB 연결 에러", err);
  }

  // app 실행
  try {
  } catch (err) {
    console.log("App 실행중 에러", err);
  }
};

start();
