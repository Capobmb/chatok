import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  message: z.string(),
});

const okResponses = [
  "OK.",
  "OK!",
  "OK...",
  "OK?",
  "OK! 👍",
  "OK 👌",
  "OK 🤖",
  "OK 🎯",
  "OK 🚀",
  "OK 💯",
];

// 人工的な遅延を追加する関数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    requestSchema.parse(body); // necesssary for validation
    
    // ランダムな遅延（1-2秒）を追加
    await delay(1000 + Math.random() * 1000);
    
    // ランダムにOKのバリエーションを選択
    const randomResponse = okResponses[Math.floor(Math.random() * okResponses.length)];
    
    return NextResponse.json({ message: randomResponse }, { status: 200 });
  } catch (error) {
    console.error("Error parsing body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
