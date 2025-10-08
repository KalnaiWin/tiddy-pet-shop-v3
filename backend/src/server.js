import express from "express";
import "dotenv/config";
import path from "path";

import authRoute from "./routes/auth.route.js";

const app = express();

const port = process.env.PORT || 3000;

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*splat", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log("Listening Port: ", port);
});
