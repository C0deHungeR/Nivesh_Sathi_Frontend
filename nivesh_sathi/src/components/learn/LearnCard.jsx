import Link from "next/link";

export default function LearnCard({ topic }) {
  return (
    <Link href={`/learn/${topic.slug}`}>
      <div
        style={{
          padding: 20,
          border: "1px solid #ccc",
          marginBottom: 12,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        <h2 style={{ fontSize: 20 }}>{topic.title}</h2>
        <p>{topic.description}</p>
      </div>
    </Link>
  );
}
