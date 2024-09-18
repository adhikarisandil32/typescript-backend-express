import express, { Express, Response, Request, NextFunction } from "express";
import * as http from "http";
import { config } from "dotenv";

config();

const PORT: number | string = process.env.PORT || 3000;
const app: Express = express();

app.get("/send", async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ success: true, message: "server ready with tyepscript" });
});

const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(app);
server.listen(PORT, () => console.log(`[server] server ready at port ${PORT}`));
