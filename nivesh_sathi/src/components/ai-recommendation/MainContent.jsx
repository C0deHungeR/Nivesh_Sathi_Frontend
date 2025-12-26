
"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";


const fundCategories = [
  "All Categories",
  "Large Cap",
  "Mid Cap",
  "Small Cap",
  "Hybrid",
  "Debt",
];


const amcOptions = [
  "Aditya Birla Sun Life Mutual Fund",
  "Axis Mutual Fund",
  "Bandhan Mutual Fund",
  "Bank of India Mutual Fund",
  "Baroda BNP Paribas Mutual Fund",
  "Canara Robeco Mutual Fund",
  "DSP Mutual Fund",
  "Edelweiss Mutual Fund",
  "Franklin Templeton Mutual Fund",
  "HDFC Mutual Fund",
  "HSBC Mutual Fund",
  "ICICI Prudential Mutual Fund",
  "IDBI Mutual Fund",
  "Indiabulls Mutual Fund",
  "Invesco Mutual Fund",
  "ITI Mutual Fund",
  "JM Financial Mutual Fund",
  "Kotak Mahindra Mutual Fund",
  "LT Mutual Fund",
  "LIC Mutual Fund",
  "Mahindra Manulife Mutual Fund",
  "Mirae Asset Mutual Fund",
  "Motilal Oswal Mutual Fund",
  "Navi Mutual Fund",
  "Nippon India Mutual Fund",
  "PGIM India Mutual Fund",
  "Quant Mutual Fund",
  "SBI Mutual Fund",
  "Shriram Mutual Fund",
  "Sundaram Mutual Fund",
  "Union Mutual Fund",
  "UTI Mutual Fund",
  "WhiteOak Capital Mutual Fund"
];


export default function MainContent() {
  const router = useRouter();


  const [mode, setMode] = useState("LUMPSUM");
  const [amount, setAmount] = useState(100000);
  const [sipAmount, setSipAmount] = useState(5000);
  const [tenure, setTenure] = useState(5);
  const [risk, setRisk] = useState(3);


  const [fundCategory, setFundCategory] = useState("All Categories");
  const [amcPreference, setAmcPreference] = useState("Any AMC");


  const formatAmountLabel = (v) => `₹${(v / 100000).toFixed(1)}L`;
  const formatSipLabel = (v) => `₹${v.toLocaleString()}`;


  // helpers to compute thumb position (0–100%)
  const calcPercent = (value, min, max) =>
    ((value - min) / (max - min || 1)) * 100;


  const handleSubmit = async () => {
    try {
      const payload = {
        amc_name:
          amcPreference === "Any AMC" ? "HDFC Mutual Fund" : amcPreference,
        category: fundCategory,
        investment_amount: mode === "LUMPSUM" ? amount : null,
        sip_amount: mode === "SIP" ? sipAmount : null,
        tenure: tenure,
      };


      console.log("SENDING PAYLOAD:", payload);


      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Please login first");
        router.push("/auth/login");
        return;
      }


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );


      if (!res.ok) {
        const text = await res.text();
        console.error("Backend error response:", text);
        return;
      }


      const data = await res.json();
      console.log("AI RESPONSE:", data);


      sessionStorage.setItem(
        "aiResults",
        JSON.stringify(data.recommendations)
      );


      router.push("/ai-recommendation/results");
    } catch (err) {
      console.error("Request failed:", err);
    }
  };


  return (
    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100">
      {/* Top controls */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-500 mb-1">
            Fund Category
          </label>
          <div className="relative">
            <select
              value={fundCategory}
              onChange={(e) => setFundCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
            >
              {fundCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
              ▼
            </span>
          </div>
        </div>


        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-500 mb-1">
            AMC Preference
          </label>
          <div className="relative">
            <select
              value={amcPreference}
              onChange={(e) => setAmcPreference(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
            >
              {amcOptions.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
              ▼
            </span>
          </div>
        </div>
      </div>


      {/* Mode toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Investment Mode
        </p>
        <div className="inline-flex rounded-full bg-slate-100 p-1">
          {["LUMPSUM", "SIP"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                mode === m
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-600"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>


      {/* Lumpsum */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-slate-600">
            Investment Amount
          </label>
          <span className="text-xs font-semibold text-emerald-600">
            {formatAmountLabel(amount)}
          </span>
        </div>


        {/* slider + bubble */}
        <div className="relative mt-4">
          {/* bubble */}
          <div
            className="absolute -top-6 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-[11px] text-white font-medium shadow-sm"
            style={{
              left: `${calcPercent(amount, 10000, 2000000)}%`,
            }}
          >
            {formatAmountLabel(amount)}
          </div>


          <input
            type="range"
            min="10000"
            max="2000000"
            step="10000"
            disabled={mode !== "LUMPSUM"}
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className={`w-full accent-emerald-500 ${
              mode !== "LUMPSUM" ? "opacity-40 cursor-not-allowed" : ""
            }`}
          />
        </div>


        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>₹10k</span>
          <span>₹20L</span>
        </div>
      </div>


      {/* SIP */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-slate-600">
            Monthly SIP
          </label>
          <span className="text-xs font-semibold text-emerald-600">
            {formatSipLabel(sipAmount)}
          </span>
        </div>


        <div className="relative mt-4">
          <div
            className="absolute -top-6 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-[11px] text-white font-medium shadow-sm"
            style={{
              left: `${calcPercent(sipAmount, 500, 50000)}%`,
            }}
          >
            {formatSipLabel(sipAmount)}
          </div>


          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            disabled={mode !== "SIP"}
            value={sipAmount}
            onChange={(e) => setSipAmount(+e.target.value)}
            className={`w-full accent-emerald-500 ${
              mode !== "SIP" ? "opacity-40 cursor-not-allowed" : ""
            }`}
          />
        </div>


        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>₹500</span>
          <span>₹50k</span>
        </div>
      </div>


      {/* Tenure + Risk */}
      <div className="grid md:grid-cols-2 gap-5 mb-7">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-600">
              Tenure (Years)
            </label>
            <span className="text-xs font-semibold text-emerald-600">
              {tenure} years
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={tenure}
            onChange={(e) => setTenure(+e.target.value)}
            className="w-full accent-emerald-500"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>1</span>
            <span>50</span>
          </div>
        </div>


        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-600">
              Risk Appetite
            </label>
            <span className="text-xs font-semibold text-emerald-600">
              {risk === 1 ? "Low" : risk === 2 ? "Moderate" : "High"}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            value={risk}
            onChange={(e) => setRisk(+e.target.value)}
            className="w-full accent-emerald-500"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </div>


      {/* CTA */}
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-500/20 transition"
      >
        Get AI Recommendations
      </button>


      <p className="mt-3 text-[11px] text-center text-slate-400">
        Uses historical performance, risk metrics, and your profile to rank
        suitable mutual funds. This is not investment advice.
      </p>
    </section>
  );
}