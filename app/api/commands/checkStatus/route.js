import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function GET() {
  try {
    const tmuxSessionName = process.env.TMUX_SESSION_NAME;

    // Check if a session already exists
    const sessionExists = `tmux has-session -t ${tmuxSessionName}`;
    await execPromise(sessionExists);

    return new NextResponse(JSON.stringify({ status: true }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ status: false }), { status: 200 });
  }
}
