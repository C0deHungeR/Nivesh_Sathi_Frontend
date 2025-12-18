import { learnTopics } from "../../../lib/learnTopics";

export default function TopicPage({ params }) {
  const topic = learnTopics.find(
    (t) => t.slug === params.topic
  );

  if (!topic) {
    return (
      <div style={{ padding: 40, color: "red" }}>
        Topic not found: {params.topic}
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32 }}>{topic.title}</h1>
      <p style={{ marginTop: 10 }}>{topic.description}</p>
    </div>
  );
}
