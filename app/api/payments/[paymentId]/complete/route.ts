import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, { params }: { params: Promise<{ paymentId: string }> }) {
  const { paymentId } = await params;
  const body = await req.json();
  const res = await fetch(`https://api.mainnet.minepi.com/v2/payments/${paymentId}/complete`, {
    method: "POST",
    headers: { Authorization: `Key ${process.env.PI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ txid: body.txid }),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
