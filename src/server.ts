import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    `😈 unhandledRejection is detected , shutting down ...`,
    reason,
    "promise: ",
    promise
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
// Promise.reject();
// console.log("hello");
