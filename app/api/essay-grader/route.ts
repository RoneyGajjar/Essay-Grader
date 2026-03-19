import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { ESSAY_GRADER_SYSTEM_PROMPT } from '@/lib/prompts';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
                { role: 'system', parts: [{ text: ESSAY_GRADER_SYSTEM_PROMPT }] },
                { role: 'user', parts: [{ text: prompt }] }
            ],
        });
        console.log(response.text);
        return NextResponse.json({ text: response.text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Gemini not running or model not found" }, { status: 500 });
    }
}

