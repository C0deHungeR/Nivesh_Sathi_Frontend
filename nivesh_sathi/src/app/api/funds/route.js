// src/app/api/funds/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), "data", "funds.csv"); // MF_India_AI.csv renamed
    const file = fs.readFileSync(csvPath, "utf8");

    const parsed = Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
    });

    const records = parsed.data.map((row, index) => ({
      id: row.scheme_name || `fund-${index}`,
      scheme_name: row.scheme_name,
      min_sip: row.min_sip,
      min_lumpsum: row.min_lumpsum,
      expense_ratio: row.expense_ratio,
      fund_size_cr: row.fund_size_cr,
      fund_age_yr: row.fund_age_yr,
      fund_manager: row.fund_manager,
      sortino: row.sortino,
      alpha: row.alpha,
      sd: row.sd,
      beta: row.beta,
      sharpe: row.sharpe,
      risk_level: row.risk_level,
      amc_name: row.amc_name,
      rating: row.rating,
      category: row.category,
      sub_category: row.sub_category,
      returns_1yr: row.returns_1yr,
      returns_3yr: row.returns_3yr,
      returns_5yr: row.returns_5yr,
    }));

    return NextResponse.json({ funds: records });
  } catch (error) {
    console.error("Error reading CSV", error);
    return NextResponse.json(
      { error: "Failed to load data" },
      { status: 500 }
    );
  }
}
