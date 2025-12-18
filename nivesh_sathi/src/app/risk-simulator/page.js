// app/risk-simulator/page.js

import RiskSimulator from "../../components/risk-simulator/RiskSimulator.jsx";
// or, without alias:
/// import RiskSimulator from "../../components/risk-simulator/RiskSimulator.jsx";


export default function RiskSimulatorPage() {
  return (
    <main className="min-h-screen bg-black/5 py-10">
      <section className="max-w-6xl mx-auto px-4 py-10">
        <RiskSimulator />
      </section>
    </main>
  );
}