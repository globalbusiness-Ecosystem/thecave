import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { pi_auth_token } = await req.json();
    if (!pi_auth_token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }
    const res = await fetch("https://api.minepi.com/v2/me", {
      headers: { Authorization: `Bearer ${pi_auth_token}` },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Pi auth failed" }, { status: 401 });
    }
    const piUser = await res.json();
    return NextResponse.json({
      id: piUser.uid,
      username: piUser.username,
      credits_balance: 0,
      terms_accepted: true,
      app_id: "thecave",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
