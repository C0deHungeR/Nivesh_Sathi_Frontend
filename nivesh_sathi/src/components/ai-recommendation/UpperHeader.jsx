// src/components/ai-recommendation/UpperHeader.jsx

export default function UpperHeader() {
  return (
    <section className="mb-8 text-center">
      <span className="inline-block rounded-full bg-[#e6f8f0] px-4 py-1 text-sm font-semibold text-[#0bb883] mb-4">
        AI-powered Recommendations
      </span>

      <h1 className="text-3xl md:text-4xl font-semibold text-[#102a43] mb-3">
        Get Personalized Fund Picks
      </h1>

      <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
        Tell us about your investment goals and let our AI find the best mutual
        funds for you.
      </p>
    </section>
  );
}
