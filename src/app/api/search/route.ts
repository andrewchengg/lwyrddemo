import OpenAI from "openai";
import { NextRequest } from "next/server";
import { lawFirms, specialties, getSpecialtiesForFirm } from "@/lib/seed-data";

const client = new OpenAI();

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query || typeof query !== "string" || query.trim().length < 10) {
    return new Response(
      JSON.stringify({
        error: "Please describe your legal situation in more detail.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const firmsContext = lawFirms
    .map((f) => {
      const specs = getSpecialtiesForFirm(f);
      return `- ID: ${f.id} | Name: ${f.name} | Location: ${f.city}, ${f.state} | Size: ${f.firmSize} | Specialties: ${specs.map((s) => s.name).join(", ")} | Description: ${f.description}`;
    })
    .join("\n");

  const specialtiesContext = specialties
    .map((s) => `- ${s.name} (ID: ${s.id}): ${s.description}`)
    .join("\n");

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 1024,
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a legal intake assistant for LWYRD, a platform that matches people with vetted law firms.

Respond in this EXACT format — plain text sections separated by markers. Do NOT use JSON or markdown.

===SUMMARY===
A brief 1-2 sentence summary of what the user needs.

===SPECIALTIES===
Specialty Name 1, Specialty Name 2

===FIRM===
ID: f1
Name: Firm Name
Reason: 1-2 sentence explanation of why this firm is a good match.

===FIRM===
ID: f2
Name: Another Firm
Reason: Explanation here.

===ADVICE===
A brief, helpful note about their situation (1-2 sentences, not legal advice).

Rules:
- Include 1-3 ===FIRM=== blocks, ranked by relevance
- Only recommend firms whose specialties genuinely match
- Keep it concise and professional`,
      },
      {
        role: "user",
        content: `AVAILABLE SPECIALTIES:\n${specialtiesContext}\n\nAVAILABLE FIRMS:\n${firmsContext}\n\nUSER'S SITUATION:\n"${query}"`,
      },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) {
          controller.enqueue(encoder.encode(text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
