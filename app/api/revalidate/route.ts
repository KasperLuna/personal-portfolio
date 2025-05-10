import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // Revalidate both skills and projects paths
  revalidatePath("/", "page")
  return NextResponse.json({ revalidated: true })
}
