import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req) {
  try {
    const { command } = await req.json();

    if (!command) {
      return new NextResponse("Command is required", { status: 400 });
    }

    const tmuxSessionName = process.env.TMUX_SESSION_NAME;

    // Send the command to the tmux session
    const sendCommand = `tmux send-keys -t ${tmuxSessionName} '${command}' C-m`;

    await execPromise(sendCommand);

    return new NextResponse("Command sent successfully", { status: 200 });
  } catch (error) {
    console.error(`Failed to send command: ${error.message}`);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
