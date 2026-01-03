// src/app/api/genkit/[...slug]/route.ts
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import { NextRequest, NextResponse } from "next/server";

// Force Node runtime
export const runtime = "nodejs";

// Initialize Genkit once
const ai = genkit({
  plugins: [googleAI()],
  model: "googleai/gemini-2.5-flash",
});

// Handle the request manually
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Call Genkit directly
    const response = await ai.call(body); // <- works in all versions

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const GET = POST;
export const OPTIONS = POST;
