import { systemPrompt } from "@/lib/assistant-knowledge";
import { siteUrl } from "@/lib/clinic";

// AI answers for the clinic assistant, through OpenRouter. Set OPENROUTER_API_KEY in the
// hosting environment; ASSISTANT_MODEL can switch models (default: a free model).
// This file is left out of the design preview build, which has no server.
const MODELS = (process.env.ASSISTANT_MODEL ?? "google/gemma-4-31b-it:free,google/gemma-4-26b-a4b-it:free")
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

type Turn = { role: "user" | "assistant"; content: string };

// A small per-visitor limit so the free quota isn't used up by one person.
const hits = new Map<string, number[]>();
function allowed(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 15) return false;
  hits.set(ip, [...recent, now]);
  return true;
}

export async function POST(req: Request) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return Response.json({ error: "unavailable" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!allowed(ip)) return Response.json({ error: "busy" }, { status: 429 });

  let turns: Turn[];
  try {
    const body = await req.json();
    turns = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: Turn) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string")
      .slice(-10)
      .map((m: Turn) => ({ role: m.role, content: m.content.slice(0, 800) }));
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }
  if (!turns.length || turns[turns.length - 1].role !== "user") {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  try {
    const res = await fetch(process.env.OPENROUTER_URL ?? "https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": "Harleys Women's Clinic assistant",
      },
      body: JSON.stringify({
        model: MODELS[0],
        models: MODELS,
        messages: [{ role: "system", content: systemPrompt }, ...turns],
        max_tokens: 400,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) return Response.json({ error: "busy" }, { status: res.status === 429 ? 429 : 502 });
    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) return Response.json({ error: "busy" }, { status: 502 });
    return Response.json({ reply });
  } catch {
    return Response.json({ error: "busy" }, { status: 502 });
  }
}
