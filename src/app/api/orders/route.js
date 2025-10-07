import fs from "fs";
import path from "path";
import csvsync from "csvsync";

const readOrders = () => {
  const filePath = path.join(process.cwd(), "public", "data", "stocks.csv");
  const csv = fs.readFileSync(filePath, "utf8");
  return csvsync.parse(csv, {
    returnObject: true,
    trim: true,
    delimiter: ",",
  });
};


async function GET(request) {
  const url = new URL(request.url);
  const isin = url.searchParams.get("isin");

  const orders = readOrders();
  
  if (!isin) {
    return new Response(JSON.stringify(orders), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const filteredOrders = orders.filter(order => order.ISIN.toUpperCase() === isin.toUpperCase());
  return new Response(JSON.stringify(filteredOrders), {
    headers: { "Content-Type": "application/json" },
  });
}

  export { GET };

