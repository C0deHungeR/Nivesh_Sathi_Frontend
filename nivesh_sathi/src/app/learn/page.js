import { learnTopics } from "../../lib/learnTopics";
import LearnCard from "../../components/learn/LearnCard";

export default function LearnPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>
        Learning Hub
      </h1>

      <div style={{ marginTop: 30 }}>
        {learnTopics.map((topic) => (
          <LearnCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}
