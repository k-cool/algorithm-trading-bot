// import app from "@/app.ts";

import app from "./app";

const start = async () => {
  try {
    app.listen(app.get("port"), () => {
      console.log(`서버가 ${app.get("port")}번에 열렸어요~`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
