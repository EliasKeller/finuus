import fs from "fs";
import path from "path";
import csvsync from "csvsync";

async function GET() {
  const filePath = path.join(process.cwd(), "public", "data", "stocks.csv");
  const csv = fs.readFileSync(filePath, "utf8");

  const rows = csvsync.parse(csv, {
    returnObject: true, 
    trim: true,
    delimiter: ","
  });

  return new Response(JSON.stringify(rows), {
    headers: { "Content-Type": "application/json" },
  });
}

export { GET };

 