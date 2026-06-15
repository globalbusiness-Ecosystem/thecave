import { NextRequest, NextResponse } from "next/server";

const PI_API = "https://api.minepi.com/v2";
const PI_KEY = process.env.PI_API_KEY || "";

export async function GET(req: NextRequest, { params }: { params: { paymentId: string } }) {
  const res = await fetch(`${PI_API}/payments/${params.paymentId}`, {
    headers: { Authorization: `Key ${PI_KEY}` },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest, { params }: { params: { paymentId: string } }) {
  const body = await req.json().catch(() => ({}));
  const action = body.action;

  const endpoint = action === "complete"
    ? `${PI_API}/payments/${params.paymentId}/complete`
    : `${PI_API}/payments/${params.paymentId}/approve`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Key ${PI_KEY}`,
      "Content-Type": "application/json",
    },
    body: action === "complete" ? JSON.stringify({ txid: body.txid }) : undefined,
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
