import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export function GET() {
  // Revalidate both skills and projects paths
  revalidatePath("/", "page")
  return NextResponse.json({ revalidated: true })
}
