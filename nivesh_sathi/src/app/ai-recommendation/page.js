// src/app/ai-recommendation/page.js
import UpperHeader from "../../components/ai-recommendation/UpperHeader";
import MainContent from "../../components/ai-recommendation/MainContent";

export default function AIPoweredRecommendationPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <UpperHeader />
        <MainContent />
      </div>
    </main>
  );
}
