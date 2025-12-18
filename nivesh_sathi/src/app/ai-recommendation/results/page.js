// src/app/ai-recommendation/results/page.js
"use client";

import { useSearchParams, useRouter } from "next/navigation";

const MOCK_FUNDS = [
  {
    id: 1,
    name: "HDFC Top 100 Fund – Direct Growth",
    amc: "HDFC AMC · Large Cap",
    expectedReturn: "+12.2%",
    riskTag: "High Risk",
    match: "98%",
  },
  {
    id: 2,
    name: "SBI Small Cap Fund – Direct Growth",
    amc: "SBI Mutual Fund · Small Cap",
    expectedReturn: "+21.5%",
    riskTag: "Very High Risk",
    match: "97%",
  },
  {
    id: 3,
    name: "Mirae Asset Large Cap Fund – Direct Growth",
    amc: "Mirae Asset AMC · Large Cap",
    expectedReturn: "+14.7%",
    riskTag: "High Risk",
    match: "96%",
  },
  {
    id: 4,
    name: "ICICI Prudential Bluechip Fund – Direct Growth",
    amc: "ICICI Prudential · Large Cap",
    expectedReturn: "+11.8%",
    riskTag: "Moderate Risk",
    match: "95%",
  },
  {
    id: 5,
    name: "Axis Growth Opportunities Fund – Direct Growth",
    amc: "Axis Mutual Fund · Large & Mid Cap",
    expectedReturn: "+15.3%",
    riskTag: "High Risk",
    match: "94%",
  },
];

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amount = searchParams.get("amount");
  const tenure = searchParams.get("tenure");
  const risk = searchParams.get("risk");
  const fundCategory = searchParams.get("fundCategory");
  const amcPreference = searchParams.get("amcPreference");

  const riskTextMap = {
    "1": "conservative",
    "2": "moderate",
    "3": "aggressive",
    "4": "very aggressive",
  };

  const riskText = riskTextMap[risk] || "aggressive";

  const formatAmount = (val) => {
    if (!val) return "";
    const num = Number(val);
    return `₹${(num / 100000).toFixed(1)}L`;
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-[#102a43]">
              Your AI Recommendations
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Based on {riskText} risk profile, {tenure} year tenure,{" "}
              {formatAmount(amount)} investment
              {fundCategory && fundCategory !== "All Categories"
                ? `, ${fundCategory} funds`
                : ""}{" "}
              {amcPreference && amcPreference !== "Any AMC"
                ? `· Preferred AMC: ${amcPreference}`
                : ""}
              .
            </p>
          </div>

          <button
            onClick={() => router.push("/ai-recommendation")}
            className="self-start md:self-auto px-4 py-2 rounded-full border border-[#0bb883] text-[#0bb883] text-xs font-semibold hover:bg-[#0bb883]/5 transition"
          >
            Modify Preferences
          </button>
        </div>

        {/* List of cards */}
        <div className="space-y-4">
          {MOCK_FUNDS.map((fund) => (
            <div
              key={fund.id}
              className="bg-white border border-[#0bb883]/40 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Top section */}
              <div className="p-4 md:p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="px-2 py-1 rounded-full bg-[#e6f8f0] text-[10px] font-semibold text-[#0bb883]">
                    AI Recommended
                  </span>
                  <div>
                    <h2 className="text-sm md:text-base font-semibold text-[#102a43]">
                      {fund.name}
                    </h2>
                    <p className="text-[11px] text-gray-500">{fund.amc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400">Match</p>
                    <p className="text-sm font-semibold text-[#0bb883]">
                      {fund.match}
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle info row */}
              <div className="px-4 md:px-5 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">Expected:</span>
                  <span className="text-sm font-semibold text-[#0bb883]">
                    {fund.expectedReturn}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffe9e4] text-[10px] font-semibold text-[#ff8a4a]">
                    {fund.riskTag}
                  </span>
                </div>
              </div>

              {/* Why this fund + CTA */}
              <div className="px-4 md:px-5 pb-4">
                <div className="mb-3 rounded-xl bg-[#f5f7fb] p-3 flex gap-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-white flex items-center justify-center text-[11px] font-bold text-[#f5b700]">
                    ?
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-600 mb-0.5">
                      Why this fund?
                    </p>
                    <p className="text-[11px] text-gray-500">
                      This fund shows excellent risk-adjusted returns and
                      consistent market outperformance. Ideal for your selected
                      investment horizon and risk profile.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <button className="flex-1 md:flex-none md:px-8 py-2 rounded-full bg-[#0bb883] text-white text-xs font-semibold shadow-md shadow-[#0bb883]/30 hover:bg-[#09a772] transition">
                    View Fund
                  </button>
                  <button className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-sm">
                    ▾
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
