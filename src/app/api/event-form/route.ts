import type { SentMessageType } from "~/constants";
import nodemailer, { type Transporter, type SendMailOptions } from "nodemailer";
import { NextResponse } from "next/server";

const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export const POST = async (req: Request) => {
  try {
    let attendees: Array<{ name: string; attending: string }> = [];
    const body: unknown = await req.json();
    if (Array.isArray(body)) {
      attendees = body.filter(
        (a: unknown): a is { name: string; attending: string } => {
          if (typeof a !== "object" || a === null) return false;
          const obj = a as Record<string, unknown>;
          return (
            typeof obj.name === "string" && typeof obj.attending === "string"
          );
        },
      );
    }
    if (!Array.isArray(attendees) || attendees.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No attendees provided.",
        },
        { status: 400 },
      );
    }

    // Build RSVP email content
    const attendeeList = attendees
      .map((a, i) => `#${i + 1}: ${a.name} — ${a.attending}`)
      .join("\n");
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self (site owner)
      subject: `New RSVP Submission`,
      text: `You have a new RSVP submission!\n\nAttendees:\n${attendeeList}`,
    };

    const data = (await transporter.sendMail(mailOptions)) as SentMessageType;

    // handle negative response
    if (data.rejected.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send RSVP.",
          error: data.rejected,
        },
        { status: 500 },
      );
    }
    // handle positive response
    return NextResponse.json(
      {
        success: true,
        message: "RSVP sent successfully.",
        data: data,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send RSVP.",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
