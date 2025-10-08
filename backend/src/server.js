import express from "express";
import "dotenv/config";

import authRoute from "./routes/auth.route.js";

const app = express();

const port = process.env.PORT || 3000;

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log("Listening Port: ", port);
});
