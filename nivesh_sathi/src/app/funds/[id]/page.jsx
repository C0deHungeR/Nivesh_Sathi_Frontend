// src/app/funds/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// small SVG line+area chart for 1Y/3Y/5Y returns
function PerformanceChart({ fund }) {
  if (!fund) return null;

 const data = [
  { label: "5Y", value: Number(fund.returns_5yr) || 0 },
  { label: "3Y", value: Number(fund.returns_3yr) || 0 },
  { label: "1Y", value: Number(fund.returns_1yr) || 0 },
];

  const width = 800;
  const height = 220;
  const paddingX = 40;
  const paddingY = 20;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const xScale = (i) =>
    paddingX + (i / (data.length - 1 || 1)) * (width - paddingX * 2);
  const yScale = (v) =>
    height -
    paddingY -
    ((v - min) / (max - min || 1)) * (height - paddingY * 2);

  const pathD = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.value)}`)
    .join(" ");

  const areaD =
    pathD +
    ` L ${xScale(data.length - 1)} ${height - paddingY}` +
    ` L ${xScale(0)} ${height - paddingY} Z`;

  return (
    <div className="mt-4 rounded-3xl bg-emerald-50/60 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-800">
        Performance Returns
      </h3>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-60"
        aria-hidden="true"
      >
        <path d={areaD} className="fill-emerald-200/60" />
        <path d={pathD} className="stroke-emerald-600 stroke-[3]" fill="none" />

        {data.map((d, i) => (
          <g key={d.label}>
            <circle
              cx={xScale(i)}
              cy={yScale(d.value)}
              r="4"
              className="fill-emerald-600"
            />
            <text
              x={xScale(i)}
              y={height - 4}
              textAnchor="middle"
              className="fill-slate-400 text-[10px]"
            >
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function FundDetailsPage() {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFund() {
      try {
        const res = await fetch("/api/funds");
        const data = await res.json();
        const allFunds = Array.isArray(data.funds) ? data.funds : [];
        const found = allFunds.find((f) => f.id === id);
        setFund(found || null);
      } catch (e) {
        console.error("Failed to load fund", e);
        setFund(null);
      } finally {
        setLoading(false);
      }
    }
    loadFund();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="h-10 w-48 rounded-full bg-slate-200 animate-pulse" />
        </div>
      </main>
    );
  }

  if (!fund) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-sm text-slate-600">
            Fund not found. Please go back and choose another fund.
          </p>
        </div>
      </main>
    );
  }

  // simple descriptive analysis
  const returns = [
    Number(fund.returns_1yr) || 0,
    Number(fund.returns_3yr) || 0,
    Number(fund.returns_5yr) || 0,
  ];
  const avgReturn =
    returns.reduce((sum, v) => sum + v, 0) / (returns.length || 1);
  const bestHorizon = ["1 Year", "3 Years", "5 Years"][
    returns.indexOf(Math.max(...returns))
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Title */}
        <header className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              {fund.scheme_name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {fund.amc_name} • {fund.category} • {fund.risk_level}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase text-slate-400">Fund Size</p>
            <p className="text-lg font-semibold text-slate-900">
              {fund.fund_size_cr} Cr
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Left: performance + chart */}
          <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Performance Returns
            </h2>

            <div className="mb-4 grid grid-cols-3 gap-3">
              <ReturnTile label="1 Year" value={fund.returns_1yr} />
              <ReturnTile label="3 Years" value={fund.returns_3yr} />
              <ReturnTile label="5 Years" value={fund.returns_5yr} />
            </div>

            <PerformanceChart fund={fund} />
          </section>

          {/* Right: details + descriptive text */}
          <section className="space-y-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Fund Details
              </h3>
              <DetailRow label="AMC" value={fund.amc_name} />
              <DetailRow label="Category" value={fund.category} />
              <DetailRow label="Sub Category" value={fund.sub_category} />
              <DetailRow label="Age (years)" value={fund.fund_age_yr} />
              <DetailRow label="Fund Manager" value={fund.fund_manager} />
              <DetailRow
                label="Expense Ratio"
                value={`${fund.expense_ratio}%`}
              />
              <DetailRow label="Sharpe" value={fund.sharpe} />
              <DetailRow label="Alpha" value={fund.alpha} />
              <DetailRow label="Beta" value={fund.beta} />
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                AI Fund Analysis
              </h3>
              <p className="text-xs text-slate-600">
                Over 1, 3 and 5 years, this fund delivered an average return of{" "}
                <span className="font-semibold text-emerald-600">
                  {avgReturn.toFixed(1)}%
                </span>
                , with the strongest performance over{" "}
                <span className="font-semibold text-slate-900">
                  {bestHorizon}
                </span>
                . Higher Sharpe ({fund.sharpe}) and Alpha ({fund.alpha}) values
                indicate better risk‑adjusted performance compared to peers,
                making it suitable for investors who can tolerate{" "}
                {fund.risk_level?.toLowerCase()} risk.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


function ReturnTile({ label, value }) {
  const display =
    value === null || value === undefined || value === ""
      ? "—"
      : value.toString().includes("%")
      ? value
      : `${value}%`;

  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-emerald-600">
        {display}
      </p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <p className="flex justify-between text-xs text-slate-600">
      <span>{label}</span>
      <span className="font-semibold text-slate-900">
        {value || "—"}
      </span>
    </p>
  );
}
