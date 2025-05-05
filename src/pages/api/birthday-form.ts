import type { NextApiRequest, NextApiResponse } from "next";
import type { SentMessageType } from "~/constants";
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
  const body = JSON.parse(req.body as string) as {
    id: string;
    name: string;
    attending: "yes" | "no" | "maybe";
  }[];

  const mailContents: SendMailOptions = {
    from: "mail@kasperluna.com",
    to: "luna.kasper.f@gmail.com",
    subject: `Birthday Form Submission`,
    text: `${body
      .map((attendee) => {
        return `${attendee?.name} - ${attendee?.attending}`;
      })
      .toString()}`,
    html: `${body
      .map((attendee) => {
        return `<p>${attendee?.name} - ${attendee?.attending}</p>`;
      })
      .toString()}`,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response: SentMessageType = await transporter.sendMail(mailContents);

  if (response.accepted.length > 0) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: "Failed to send email" });
  }
}
