import fs from "fs";
import path from "path";
import csvsync from "csvsync";
import { mapCsvOrdersData } from "../../../../utils/utils";

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

 