import type { 
  ContactFormData, 
  // CloudFlareVerifyResponse, 
  SentMessageType 
} from "@/lib/constants";
// import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer, { type Transporter, type SendMailOptions } from "nodemailer";
import { type NextRequest, NextResponse } from "next/server";

const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as ContactFormData;

  // const verify = await fetch(
  //   "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY as string,
  //       response: body["cf-turnstile-response"],
  //       remoteip: req.headers.get("x-forwarded-for") as string,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );
  // const verifyJson = (await verify.json()) as CloudFlareVerifyResponse;

  // if (!verifyJson.success) {
  //   return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });
  // }

  const mailContents: SendMailOptions = {
    from: "mail@kasperluna.com",
    to: "luna.kasper.f@gmail.com",
    subject: `Portfolio Site Submission from ${body.name}`,
    text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
    html: `<p>Name: ${body.name}</p><p>Email: ${body.email}</p><p>Message: ${body.message}</p>`,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response: SentMessageType = await transporter.sendMail(mailContents);

  if (response.accepted.length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
};