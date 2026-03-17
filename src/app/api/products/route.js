import fs from "fs";
import path from "path";
import csvsync from "csvsync";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const { isAuthenticated, userId } = await auth();

  if (!userId || !isAuthenticated) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (process.env.ALLOWED_ADMIN_USER_ID && userId !== process.env.ALLOWED_ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), "public", "data", "stocks.csv");
  const csv = fs.readFileSync(filePath, "utf8");

  const orders = csvsync.parse(csv, {
    returnObject: true, 
    trim: true,
    delimiter: ","
  });
  const products = Object.groupBy(orders, ({ISIN}) => ISIN);


  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

 