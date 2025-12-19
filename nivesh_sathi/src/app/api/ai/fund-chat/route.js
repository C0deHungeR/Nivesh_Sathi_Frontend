// // src/app/api/[your-route]/route.js
// import { NextResponse } from "next/server";


// if (!GROQ_API_KEY) {
//   console.warn("⚠️ GROQ_API_KEY is not set. Set process.env.GROQ_API_KEY");
// }

// export async function POST(req) {
//   // Validation first
//   if (!GROQ_API_KEY) {
//     return NextResponse.json(
//       { error: "AI service misconfigured - missing API key" }, 
//       { status: 500 }
//     );
//   }

//   try {
//     const { fund, question } = await req.json();

//     if (!fund || typeof question !== "string" || !question.trim()) {
//       return NextResponse.json(
//         { error: "Missing fund data or question" }, 
//         { status: 400 }
//       );
//     }

//     if (question.length > 2000) {
//       return NextResponse.json(
//         { error: "Question too long" }, 
//         { status: 400 }
//       );
//     }

//     const prompt = `
// You are a financial assistant.
// Answer ONLY using the information below.
// If the question is unrelated, say:
// "I can only answer questions about this fund."

// Fund Details:
// Name: ${fund.scheme_name}
// AMC: ${fund.amc_name}
// Category: ${fund.category}
// Risk Level: ${fund.risk_level}
// 1Y Return: ${fund.returns_1yr}%
// 3Y Return: ${fund.returns_3yr}%
// 5Y Return: ${fund.returns_5yr}%
// Expense Ratio: ${fund.expense_ratio}
// Sharpe Ratio: ${fund.sharpe}
// Alpha: ${fund.alpha}

// User Question:
// ${question}
//     `;

//     // Single Groq request using OpenAI-compatible API
//     const url = `https://api.groq.com/openai/v1/chat/completions`;
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${GROQ_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: GROQ_MODEL,
//         messages: [
//           {
//             role: "system",
//             content: "You are a financial assistant. Answer ONLY using the information provided. If unrelated, say: 'I can only answer questions about this fund.'",
//           },
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         temperature: 0.7,
//         max_tokens: 1024,
//       }),
//     };

//     const res = await fetch(url, options);
//     const raw = await res.json();
    
//     console.log("✅ GROQ Response received");

//     // Extract answer (same logic)
//     function extractAnswer(raw) {
//       if (!raw) return null;
//       try {
//         if (Array.isArray(raw?.choices) && raw.choices.length) {
//           const content = raw.choices[0]?.message?.content;
//           if (typeof content === "string" && content.trim()) return content.trim();
//         }
//         if (typeof raw?.text === "string" && raw.text.trim()) return raw.text.trim();
//         if (typeof raw?.data?.text === "string" && raw.data.text.trim()) return raw.data.text.trim();
//         if (Array.isArray(raw?.outputs) && raw.outputs.length && typeof raw.outputs[0]?.text === 'string') return raw.outputs[0].text.trim();
//         if (typeof raw === 'string' && raw.trim()) return raw.trim();
//       } catch (e) {
//         // ignore
//       }
//       return null;
//     }

//     const answer = extractAnswer(raw);
//     if (!answer) {
//       console.error("❌ No usable answer in GROQ response");
//       return NextResponse.json(
//         { error: "AI service failed to generate response" }, 
//         { status: 502 }
//       );
//     }

//     return NextResponse.json({ answer });

//   } catch (err) {
//     console.error("❌ GROQ Error:", err);
//     return NextResponse.json(
//       { error: "AI service failed" },
//       { status: 500 }
//     );
//   }
// }
