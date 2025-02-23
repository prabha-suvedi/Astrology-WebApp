import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // Use named import
import Zodiac from "@/models/Zodiac";
import { cache } from "react";

// ✅ Cache zodiac sign lookup for faster responses
const getZodiacSign = cache(async (sign) => {
  return await Zodiac.findOne({ sign: sign.toLowerCase() }).lean();
});

export async function GET(req, { params }) {
  try {
    if (!params || !params.sign) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await connectDB(); // Ensure DB connection

    const zodiacSign = await getZodiacSign(params.sign);

    if (!zodiacSign) {
      return NextResponse.json({ error: "Zodiac sign not found" }, { status: 404 });
    }

    return NextResponse.json(zodiacSign);
  } catch (error) {
    console.error("❌ Error fetching zodiac sign:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
