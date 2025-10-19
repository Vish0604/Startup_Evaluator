import express, { Request, Response } from "express";
// Temporary workaround if @types/cors isn't installed:
// treat cors as any to avoid TS error about missing declaration file.
const cors: any = require("cors");
import dotenv from "dotenv";
import axios from "axios";
import pino from "pino";
import agentsRouter from "./routes/agents";

dotenv.config();
const log = pino();
const app = express();

// If you want to restrict origins, set CORS_ORIGIN in .env; otherwise allow all in dev
app.use(
  cors(
    process.env.CORS_ORIGIN
      ? { origin: process.env.CORS_ORIGIN, credentials: true }
      : {}
  )
);
app.use(express.json());

// Ensure PORT is a number (fixes TS error on app.listen)
const PORT = Number(process.env.PORT || 4000);

app.get("/api/health", (_: Request, res: Response) =>
  res.json({ ok: true, time: new Date().toISOString() })
);

// Proxy to external AI agents service
app.use("/api/agents", agentsRouter);

app.listen(PORT, () => {
  log.info({ port: PORT }, "Backend listening");
});
