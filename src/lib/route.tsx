import { NextResponse } from "next/server";

const GAS_URL = process.env.GAS_URL!;

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        path: "createKuitansiBarang",
        ...payload
      })
    });

    const text = await res.text();
    return NextResponse.json(JSON.parse(text));

  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.toString() },
      { status: 500 }
    );
  }
}
