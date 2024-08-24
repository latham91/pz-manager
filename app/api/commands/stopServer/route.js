import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";
import connectDb from "../../../../lib/db";
import Player from "../../../../models/player";

const execPromise = util.promisify(exec);

export async function POST() {
  try {
    await connectDb();

    const tmuxSessionName = process.env.TMUX_SESSION_NAME;
    const stopCommand = `tmux send-keys -t ${tmuxSessionName} 'quit' C-m`;

    await execPromise(stopCommand);

    // Delay before killing tmux session (10 seconds)
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await execPromise(`tmux kill-session -t ${tmuxSessionName}`);

    await Player.deleteMany({});

    return new NextResponse("Server stopped successfully...", { status: 200 });
  } catch (error) {
    console.error("Failed to stop server...", error);
  }
}
