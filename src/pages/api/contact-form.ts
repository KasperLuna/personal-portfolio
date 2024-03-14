import type { NextApiRequest, NextApiResponse } from "next";
import type {
  CloudFlareVerifyResponse,
  ContactFormData,
  SentMessageType,
} from "~/constants";
import nodemailer, { type Transporter, type SendMailOptions } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = JSON.parse(req.body as string) as ContactFormData;

  const verify = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: JSON.stringify({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY as string,
        response: body["cf-turnstile-response"],
        remoteip: req.headers["x-forwarded-for"] as string,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const verifyJson = (await verify.json()) as CloudFlareVerifyResponse;

  if (!verifyJson.success) {
    return res.status(400).json({ error: "Invalid captcha" });
  }

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
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: "Failed to send email" });
  }
}
