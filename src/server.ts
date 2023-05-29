// import app from "@/app.ts";

import app from "./app";
import connect from "./model";

const start = async () => {
  try {
    connect();
  } catch (error) {
    console.error(error);
  }
};

start();
