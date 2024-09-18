import express, { Express, Response, Request, NextFunction } from "express"
import * as http from "http"
import { config } from "dotenv"
import nodemailer from "nodemailer"

config()

const PORT: string = process.env.PORT || "3000"
const app: Express = express()

const smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP,
  port: 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

app.get("/api/send", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mailInfo = await smtpTransport.sendMail({
      from: `Sandil Adhikari <${process.env.SMTP_USER}>`,
      to: "yopofo7256@cetnob.com",
      subject: "Password Reset Link",
      text: "this is the link to reset the password",
      html: "<h2>Heading</h2>",
    })

    return res.status(200).json({ success: true, message: "server ready with tyepscript", mailInfo })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(app)
server.listen(PORT, () => console.log(`[server] server ready at port ${PORT}`))
