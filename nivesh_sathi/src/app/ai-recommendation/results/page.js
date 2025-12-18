"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AIResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fundCategory = searchParams.get("fundCategory");
    const amcPreference = searchParams.get("amcPreference");
    const amount = searchParams.get("amount");
    const tenure = searchParams.get("tenure");

    // Guard
    if (!fundCategory || !amount || !tenure) {
      router.replace("/ai-recommendation");
      return;
    }

    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/api/ai/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fundCategory,
            amcPreference,
            amount: Number(amount),
            tenure: Number(tenure),
          }),
        });

        if (!res.ok) throw new Error("AI service failed");

        const data = await res.json();

        // backend returns ONE object → wrap as array
        setResults([data]);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch AI recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Analyzing with AI…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-[#102a43]">
          AI Recommended Funds
        </h1>

        <div className="grid gap-6">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-sm border"
            >
              <h2 className="text-lg font-semibold mb-4">
                {item.scheme_name}
              </h2>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Past 1Y Return</span>
                <span>{item.past_returns_1yr}%</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Projected 1Y Return</span>
                <span>{item.future_returns_1yr}%</span>
              </div>

              <div className="flex justify-between text-sm mt-3">
                <span className="text-gray-600">Risk</span>
                <span
                  className={`font-semibold ${
                    item.risk_level === "LOW"
                      ? "text-green-600"
                      : item.risk_level === "MID" ||
                        item.risk_level === "Medium"
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {item.risk_level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
