import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST() {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";

    // Generate response using GPT-4
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Use GPT-4o for faster results
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    const generatedText = completion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ success: true, questions: generatedText.split('||') });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error with OpenAI API:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
