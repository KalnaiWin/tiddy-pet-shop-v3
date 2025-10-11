import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();

const port = ENV.PORT || 3000;

const __dirname = path.resolve();

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*splat", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.use(express.json({limit: "25mb"}));
app.use(cookieParser);

app.use("/api/auth", authRoute);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on port: ", port);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
