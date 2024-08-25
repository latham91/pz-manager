import { NextResponse } from "next/server";
import connectDb from "../../../../lib/db";
import Player from "../../../../models/player";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  await connectDb();

  try {
    const { steamId, username } = await request.json();

    let player = await Player.findOne({ steamId });

    if (!player) {
      player = new Player({ steamId, username });
      await player.save();

      revalidatePath("/", "layout");
      return NextResponse.json({ message: "Player added", player }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Player already exists" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error adding player:", error);
    return NextResponse.json({ error: "Failed to add player" }, { status: 500 });
  }
}

export async function DELETE(request) {
  await connectDb();

  try {
    const { steamId } = await request.json();

    const player = await Player.findOneAndDelete({ steamId });

    if (player) {
      revalidatePath("/", "layout");
      return NextResponse.json({ message: "Player removed" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Player not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error removing player:", error);
    return NextResponse.json({ error: "Failed to remove player" }, { status: 500 });
  }
}
