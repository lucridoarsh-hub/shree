import { NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

// Public: look up products by slug (used by the wishlist page).
export async function GET(req) {
  const ids = (new URL(req.url).searchParams.get("ids") || "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 100);
  if (!ids.length) return NextResponse.json([]);
  return NextResponse.json(await getProducts({ ids }), { headers: { "Cache-Control": "no-store" } });
}
