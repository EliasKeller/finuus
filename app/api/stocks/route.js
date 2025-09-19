import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

async function GET() {
  const filePath = path.join(process.cwd(), "public/data/stocks.csv");
  const csv = fs.readFileSync(filePath, "utf8");
  const rows = parse(csv, { columns: true, skip_empty_lines: true });
  return new Response(JSON.stringify(rows), { headers: { "Content-Type": "application/json" } });
}


export { GET };