import app from "./app";
import connect from "./model";

const start = async () => {
  // DB 연결
  try {
    const a = await connect();
    console.log("done");
    app.listen(app.get("port"), () => {
      console.log(`서버가 ${app.get("port")}번에 열렸어요~`);
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
