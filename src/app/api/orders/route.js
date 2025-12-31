import fs from "fs";
import path from "path";
import csvsync from "csvsync";
import { mapCsvOrdersData } from "../../../../utils/utils";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const readOrders = () => {
  const filePath = path.join(process.cwd(), "public", "data", "stocks.csv");
  const csv = fs.readFileSync(filePath, "utf8");

  const orders = csvsync.parse(csv, {
    returnObject: true, 
    trim: true,
    delimiter: ","
  });
  
  const mappedOrders = mapCsvOrdersData(orders);

  return mappedOrders;
}

async function GET(request) {
  const { isAuthenticated, userId } = await auth();
  console.log("userid check", userId)

  if (!userId || !isAuthenticated) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (process.env.ALLOWED_ADMIN_USER_ID && userId !== process.env.ALLOWED_ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }



  try {
    const url = new URL(request.url);
    const isin = url.searchParams.get("isin");

    const orders = readOrders();

    if (!isin) {
      return new Response(JSON.stringify(orders), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const filteredOrders = orders.filter(order => order.isin.toUpperCase() === isin.toUpperCase());

    return new Response(JSON.stringify(filteredOrders), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { GET };

 