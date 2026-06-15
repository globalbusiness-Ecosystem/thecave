import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: [
      {
        id: "69b4c1ca15be8dce49fb05d6",
        name: "Premium Listing",
        description: "Maximum visibility to buyers worldwide",
        price_in_pi: 1.0,
        total_quantity: 999,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "6a2fddaa03891d2659fd4178",
        name: "Featured Auction",
        description: "Featured placement for your auction",
        price_in_pi: 2.0,
        total_quantity: 999,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "6a2fe07641829566d06b4c63",
        name: "Top Seller Badge",
        description: "Top seller badge on your profile",
        price_in_pi: 3.0,
        total_quantity: 999,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
  });
}
