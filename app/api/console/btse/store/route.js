import { NextResponse } from "next/server";
import connectDb from "../../../../../lib/db";
import BTSE from "../../../../../models/btse";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  await connectDb();

  try {
    const { username, steamId, warning, time, timestamp } = await request.json();

    const player = new BTSE({ username, steamId, warning, time, timestamp });
    await player.save();

    revalidatePath("/", "layout");

    return NextResponse.json({ message: "Player warning added", player }, { status: 201 });
  } catch (error) {
    console.error("Error adding player warning:", error);
    return NextResponse.json({ error: "Failed to add player warning" }, { status: 500 });
  }
}

export async function GET() {
  await connectDb();

  try {
    const warnings = await BTSE.find({}).sort({ timestamp: -1 });

    return NextResponse.json(warnings, { status: 200 });
  } catch (error) {
    console.error("Error fetching warnings:", error);
    return NextResponse.json({ error: "Failed to fetch warnings" }, { status: 500 });
  }
}
