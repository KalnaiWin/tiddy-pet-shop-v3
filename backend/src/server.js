import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
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

app.use(express.json({ limit: "25mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

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
