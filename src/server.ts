import express from "express";
import { Express } from "express";
import cors from "cors";
import { apiRouter } from "./api/routes";
import * as bodyParser from "body-parser";
const jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 1024,
});

export const app: Express = express();
app.use(cors({ origin: "*" }));
app.use(jsonParser);

app.get("/health", (_req, res, _next) => {
  res.send(200);
  return;
});
app.use("/api", apiRouter);
