import fs from "fs";
import path from "path";
import csvsync from "csvsync";

async function GET() {
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

 