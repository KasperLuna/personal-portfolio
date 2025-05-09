import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  // Handle the birthday form submission logic here
  return NextResponse.json({ success: true, data });
}
