import { NextRequest, NextResponse } from "next/server";

const PI_API = "https://api.testnet.minepi.com/v2";
const PI_KEY = process.env.PI_API_KEY || "";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  const { paymentId } = await params;
  const res = await fetch(`${PI_API}/payments/${paymentId}`, {
    headers: { Authorization: `Key ${PI_KEY}` },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  const { paymentId } = await params;
  const body = await req.json().catch(() => ({}));
  const { action, txid } = body;

  const url = new URL(req.url);
  const urlAction = url.searchParams.get("action");
  const finalAction = action || urlAction;

  const isComplete = finalAction === "complete" || !!txid;

  const endpoint = isComplete
    ? `${PI_API}/payments/${paymentId}/complete`
    : `${PI_API}/payments/${paymentId}/approve`;

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
