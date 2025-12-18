// // src/components/ai-recommendation/MainContent.jsx
// "use client";

// import { useState } from "react";

// const fundCategories = [
//   "All Categories",
//   "Large Cap",
//   "Mid Cap",
//   "Small Cap",
//   "Hybrid",
//   "Debt",
// ];

// const amcOptions = [
//   "Any AMC",
//   "HDFC Mutual Fund",
//   "ICICI Prudential",
//   "SBI Mutual Fund",
//   "Axis Mutual Fund",
// ];

// export default function MainContent() {
//   // state for sliders
//   const [amount, setAmount] = useState(100000); // ₹1L
//   const [tenure, setTenure] = useState(5); // years
//   const [risk, setRisk] = useState(3); // 1–4 scale

//   // helper formatters
//   const formatAmountLabel = (val) => {
//     // convert to Lakh-style label like "₹1.0L"
//     const inLakhs = val / 100000;
//     return `₹${inLakhs.toFixed(1)}L`;
//   };

//   const riskLabel = (val) => {
//     switch (Number(val)) {
//       case 1:
//         return "Conservative";
//       case 2:
//         return "Moderate";
//       case 3:
//         return "Aggressive";
//       case 4:
//         return "Very Aggressive";
//       default:
//         return "Aggressive";
//     }
//   };

//   return (
//     <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
//       {/* Header row */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <div className="flex items-center gap-2">
//           <div className="h-9 w-9 rounded-full bg-[#0bb883]/10 flex items-center justify-center">
//             <span className="text-[#0bb883] font-semibold text-lg">₹</span>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold text-[#102a43]">
//               Investment Preferences
//             </h2>
//             <p className="text-xs text-gray-500">
//               Adjust the parameters to match your goals.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Selects */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="flex flex-col gap-1">
//           <label className="text-xs font-medium text-gray-500">
//             Fund Category
//           </label>
//           <select className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0bb883]/40 focus:border-[#0bb883]">
//             {fundCategories.map((cat) => (
//               <option key={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         <div className="flex flex-col gap-1">
//           <label className="text-xs font-medium text-gray-500">
//             AMC Preference (Optional)
//           </label>
//           <select className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0bb883]/40 focus:border-[#0bb883]">
//             {amcOptions.map((amc) => (
//               <option key={amc}>{amc}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Sliders */}
//       <div className="space-y-6 mb-8">
//         {/* Investment Amount */}
//         <div>
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700">
//               Investment Amount
//             </span>
//             <span className="text-sm font-semibold text-[#0bb883]">
//               {formatAmountLabel(amount)}
//             </span>
//           </div>
//           <input
//             type="range"
//             min="10000"
//             max="2000000"
//             step="10000"
//             value={amount}
//             onChange={(e) => setAmount(Number(e.target.value))}
//             className="w-full accent-[#0bb883]"
//           />
//           <div className="flex justify-between text-[11px] text-gray-400 mt-1">
//             <span>₹10,000</span>
//             <span>₹10,00,000</span>
//           </div>
//         </div>

//         {/* Investment Tenure */}
//         <div>
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700">
//               Investment Tenure
//             </span>
//             <span className="text-sm font-semibold text-gray-700">
//               {tenure} {tenure === 1 ? "year" : "years"}
//             </span>
//           </div>
//           <input
//             type="range"
//             min="1"
//             max="10"
//             step="1"
//             value={tenure}
//             onChange={(e) => setTenure(Number(e.target.value))}
//             className="w-full accent-[#0bb883]"
//           />
//           <div className="flex justify-between text-[11px] text-gray-400 mt-1">
//             <span>1 year</span>
//             <span>10 years</span>
//           </div>
//         </div>

//         {/* Risk Tolerance */}
//         <div>
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700">
//               Risk Tolerance
//             </span>
//             <span className="text-sm font-semibold text-[#ff8a4a]">
//               {riskLabel(risk)}
//             </span>
//           </div>
//           <input
//             type="range"
//             min="1"
//             max="4"
//             step="1"
//             value={risk}
//             onChange={(e) => setRisk(Number(e.target.value))}
//             className="w-full accent-[#0bb883]"
//           />
//           <div className="flex justify-between text-[11px] text-gray-400 mt-1">
//             <span>Conservative</span>
//             <span>Very Aggressive</span>
//           </div>
//         </div>
//       </div>

//       {/* CTA button */}
//       <div className="flex justify-center">
//         <button className="w-full md:w-auto px-10 py-3 rounded-full bg-[#0bb883] text-white text-sm font-semibold shadow-md shadow-[#0bb883]/30 hover:bg-[#09a772] transition">
//           Get AI Recommendations
//         </button>
//       </div>
//     </section>
//   );
// }


// src/components/ai-recommendation/MainContent.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 import router [web:42]

const fundCategories = [
  "All Categories",
  "Large Cap",
  "Mid Cap",
  "Small Cap",
  "Hybrid",
  "Debt",
];

const amcOptions = [
  "Any AMC",
  "HDFC Mutual Fund",
  "ICICI Prudential",
  "SBI Mutual Fund",
  "Axis Mutual Fund",
];

export default function MainContent() {
  const router = useRouter();

  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(5);
  const [risk, setRisk] = useState(3);
  const [fundCategory, setFundCategory] = useState(fundCategories[0]);
  const [amcPreference, setAmcPreference] = useState(amcOptions[0]);

  const formatAmountLabel = (val) => {
    const inLakhs = val / 100000;
    return `₹${inLakhs.toFixed(1)}L`;
  };

  const riskLabel = (val) => {
    switch (Number(val)) {
      case 1:
        return "Conservative";
      case 2:
        return "Moderate";
      case 3:
        return "Aggressive";
      case 4:
        return "Very Aggressive";
      default:
        return "Aggressive";
    }
  };

  const handleSubmit = () => {
    const params = new URLSearchParams({
      amount: String(amount),
      tenure: String(tenure),
      risk: String(risk),
      fundCategory,
      amcPreference,
    });

    router.push(`/ai-recommendation/results?${params.toString()}`); // 👈 go to results page [web:42][web:50]
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-[#0bb883]/10 flex items-center justify-center">
            <span className="text-[#0bb883] font-semibold text-lg">₹</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#102a43]">
              Investment Preferences
            </h2>
            <p className="text-xs text-gray-500">
              Adjust the parameters to match your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Selects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Fund Category
          </label>
          <select
            className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0bb883]/40 focus:border-[#0bb883]"
            value={fundCategory}
            onChange={(e) => setFundCategory(e.target.value)}
          >
            {fundCategories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            AMC Preference (Optional)
          </label>
          <select
            className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0bb883]/40 focus:border-[#0bb883]"
            value={amcPreference}
            onChange={(e) => setAmcPreference(e.target.value)}
          >
            {amcOptions.map((amc) => (
              <option key={amc}>{amc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-6 mb-8">
        {/* Amount */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Investment Amount
            </span>
            <span className="text-sm font-semibold text-[#0bb883]">
              {formatAmountLabel(amount)}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="2000000"
            step="10000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-[#0bb883]"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>₹10,000</span>
            <span>₹10,00,000</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Investment Tenure
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {tenure} {tenure === 1 ? "year" : "years"}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-[#0bb883]"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>1 year</span>
            <span>10 years</span>
          </div>
        </div>

        {/* Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Risk Tolerance
            </span>
            <span className="text-sm font-semibold text-[#ff8a4a]">
              {riskLabel(risk)}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
            className="w-full accent-[#0bb883]"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>Conservative</span>
            <span>Very Aggressive</span>
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="w-full md:w-auto px-10 py-3 rounded-full bg-[#0bb883] text-white text-sm font-semibold shadow-md shadow-[#0bb883]/30 hover:bg-[#09a772] transition"
        >
          Get AI Recommendations
        </button>
      </div>
    </section>
  );
}

