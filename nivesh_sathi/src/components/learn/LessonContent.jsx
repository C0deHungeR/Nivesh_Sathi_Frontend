"use client";

import { useEffect, useState } from "react";

export default function LessonContent({ topic }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/learn/ai?topic=${topic.title}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data.text);
        setLoading(false);
      });
  }, [topic.title]);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>

      {loading ? (
        <p className="text-gray-500">Loading lesson...</p>
      ) : (
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      )}
    </div>
  );
}
