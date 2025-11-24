import fs from "fs";
import path from "path";
import csvsync from "csvsync";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

async function GET() {
  const { userId } = auth();
  console.log("userid check", userId)

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (process.env.ALLOWED_ADMIN_USER_ID && userId !== process.env.ALLOWED_ADMIN_USER_ID) {
    return new NextResponse("Forbidden", { status: 403 });
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

export { GET };

 