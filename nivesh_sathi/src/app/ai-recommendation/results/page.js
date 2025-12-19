"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("aiResults");
    if (!stored) return;

    try {
      if (stored === "undefined" || stored === "null" || stored.trim() === "") {
        return;
      }
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setResults(parsed);
      }
    } catch (e) {
      console.error("Failed to parse aiResults from sessionStorage:", e, stored);
    }
  }, []);

  if (!results.length) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="px-6 py-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
          <p className="text-sm text-slate-500 mb-2">
            No recommendations found yet.
          </p>
          <p className="text-xs text-slate-400">
            Go back and enter your investment details to generate AI-powered fund
            suggestions.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-emerald-600 mb-1">
            AI Insights
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            AI Recommended Funds
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Top matches based on your AMC, category, investment amount, and tenure.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-700">
            Ranked by risk-adjusted return score
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {results.map((f, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Accent bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />

            <div className="p-5 pt-6">
              {/* Title + badge */}
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-base md:text-lg text-slate-900">
                  {f.scheme_name}
                </h2>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                  Risk: {f.risk}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 text-xs md:text-sm mt-5">
                <div className="space-y-1">
                  <p className="text-slate-400">Expected (1Y)</p>
                  <p className="text-sm font-semibold text-emerald-600">
                    {f.expected}%
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Based on model forecast
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-400">Best Case</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {f.best_case}%
                  </p>
                  <p className="text-[11px] text-slate-400">
                    90th percentile scenario
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-400">Worst Case</p>
                  <p className="text-sm font-semibold text-rose-500">
                    {f.worst_case}%
                  </p>
                  <p className="text-[11px] text-slate-400">
                    10th percentile scenario
                  </p>
                </div>
              </div>

              {/* Footer line */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <p className="text-[11px] text-slate-400">
                  Past performance:{" "}
                  <span className="font-medium text-slate-600">
                    {f.past_1yr ?? "-"}% (1Y)
                  </span>
                </p>
                <span className="text-[11px] text-slate-400">
                  Ranked #{i + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
