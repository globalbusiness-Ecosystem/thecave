import { NextRequest, NextResponse } from "next/server";

const PI_API = "https://api.testnet.minepi.com/v2";
const PI_KEY = process.env.PI_API_KEY || "";

export async function POST(req: NextRequest, { params }: { params: { paymentId: string } }) {
  const body = await req.json().catch(() => ({}));
  const { action, txid } = body;

  const endpoint = action === "complete"
    ? `${PI_API}/payments/${params.paymentId}/complete`
    : `${PI_API}/payments/${params.paymentId}/approve`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Key ${PI_KEY}`,
      "Content-Type": "application/json",
    },
    body: txid ? JSON.stringify({ txid }) : undefined,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
