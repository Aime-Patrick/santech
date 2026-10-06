import { NextResponse } from "next/server";

const googleTranslateApiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

type TranslateRequest = {
  texts?: unknown;
  target?: unknown;
};

const supportedTargets = new Set(["rw", "fr", "sw", "ar", "zh-CN", "hi", "ur", "bm"]);

export async function POST(request: Request) {
  if (!googleTranslateApiKey) {
    return NextResponse.json({ error: "Google Translation is not configured." }, { status: 503 });
  }

  let body: TranslateRequest;

  try {
    body = (await request.json()) as TranslateRequest;
  } catch {
    return NextResponse.json({ error: "Invalid translation request." }, { status: 400 });
  }

  const texts = Array.isArray(body.texts) ? body.texts.filter((text): text is string => typeof text === "string" && text.trim().length > 0) : [];
  const target = typeof body.target === "string" ? body.target : "";

  if (texts.length === 0 || texts.length > 128 || !supportedTargets.has(target)) {
    return NextResponse.json({ error: "Invalid translation payload." }, { status: 400 });
  }

  const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(googleTranslateApiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: texts, source: "en", target, format: "text" }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Google Translation request failed." }, { status: 502 });
  }

  const result = (await response.json()) as { data?: { translations?: Array<{ translatedText?: string }> } };
  const translations = result.data?.translations?.map(({ translatedText }) => translatedText ?? "") ?? [];

  return NextResponse.json({ translations });
}
