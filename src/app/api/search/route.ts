import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { lawFirms, specialties, getSpecialtiesForFirm } from "@/lib/seed-data";

const client = new OpenAI();

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query || typeof query !== "string" || query.trim().length < 10) {
    return NextResponse.json(
      { error: "Please describe your legal situation in more detail." },
      { status: 400 },
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

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 1024,
    messages: [
      {
        role: "system",
        content:
          "You are a legal intake assistant for LWYRD, a platform that matches people with vetted law firms. Respond in JSON format only, no markdown code fences.",
      },
      {
        role: "user",
        content: `A user has described their legal situation. Analyze it and recommend the best matching firms from our directory.

AVAILABLE SPECIALTIES:
${specialtiesContext}

AVAILABLE FIRMS:
${firmsContext}

USER'S SITUATION:
"${query}"

Respond in JSON format only, no markdown:
{
  "summary": "A brief 1-2 sentence summary of what the user needs",
  "identified_specialties": ["specialty name 1", "specialty name 2"],
  "recommended_firms": [
    {
      "firm_id": "f1",
      "firm_name": "Firm Name",
      "match_reason": "1-2 sentence explanation of why this firm is a good match"
    }
  ],
  "advice": "A brief, helpful note about their situation (1-2 sentences, not legal advice)"
}

Recommend 1-3 firms maximum, ranked by relevance. Only recommend firms whose specialties genuinely match the user's needs.`,
      },
    ],
  });

  const text = completion.choices[0]?.message?.content || "";

  try {
    const parsed = JSON.parse(text);

    // Enrich with full firm data
    const enrichedFirms = (parsed.recommended_firms || []).map(
      (rec: { firm_id: string; firm_name: string; match_reason: string }) => {
        const firm = lawFirms.find((f) => f.id === rec.firm_id);
        if (!firm) return rec;
        const specs = getSpecialtiesForFirm(firm);
        return {
          ...rec,
          slug: firm.slug,
          city: firm.city,
          state: firm.state,
          firmSize: firm.firmSize,
          specialties: specs.map((s) => s.name),
        };
      },
    );

    return NextResponse.json({
      ...parsed,
      recommended_firms: enrichedFirms,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response. Please try again." },
      { status: 500 },
    );
  }
}
