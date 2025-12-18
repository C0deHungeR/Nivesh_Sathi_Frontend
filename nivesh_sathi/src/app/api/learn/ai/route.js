import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");

  const prompt = `
Explain ${topic} to a beginner in India.
Use simple language.
No financial advice.
Add one real-life example.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return Response.json({
    text: response.choices[0].message.content,
  });
}
