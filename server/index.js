import express from "express";
import path from "node:path";
import { createApp } from "./app.js";

const port = Number(process.env.PORT || 4173);
const origin = process.env.APP_ORIGIN || `http://localhost:${port}`;
if (process.env.VERCEL)
  throw new Error(
    "O servidor de teste requer disco persistente; não execute SQLite em funções Vercel.",
  );
const { app, db } = createApp({
  origin,
  databasePath: process.env.DATABASE_PATH || "data/oficina.sqlite",
  stripeKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  priceIds: {
    basico: process.env.STRIPE_PRICE_BASICO,
    intermediario: process.env.STRIPE_PRICE_INTERMEDIARIO,
    avancado: process.env.STRIPE_PRICE_AVANCADO,
  },
});
app.use(express.static(path.resolve("dist"), { extensions: ["html"] }));
app.use((_req, res) => res.status(404).sendFile(path.resolve("dist/404.html")));
const server = app.listen(port, process.env.HOST || "127.0.0.1", () =>
  console.log(`Ronas Oficina (teste): ${origin}/ronas-oficina`),
);
process.on("SIGTERM", () =>
  server.close(() => {
    db.close();
    process.exit(0);
  }),
);
