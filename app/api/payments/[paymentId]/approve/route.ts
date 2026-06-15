import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, { params }: { params: { paymentId: string } }) {
  const res = await fetch(`https://api.testnet.minepi.com/v2/payments/${params.paymentId}/approve`, {
    method: "POST",
    headers: { Authorization: `Key ${process.env.PI_API_KEY}` },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
