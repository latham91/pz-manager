import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST() {
  try {
    const tmuxSessionName = process.env.TMUX_SESSION_NAME;

    // Tmux command to check if a session already exists
    const sessionExists = `tmux has-session -t ${tmuxSessionName}`;

    try {
      await execPromise(sessionExists);
      console.log(`Session ${tmuxSessionName} already exists. Attaching to ${tmuxSessionName}...`);

      // Attatch to the existing session and open session in a new terminal window
      // GNOME Terminal = gnome-terminal
      // KDE Terminal = konsole
      const attachSession = `gnome-terminal -- tmux attach-session -t ${tmuxSessionName}`;
      await execPromise(attachSession);

      return new NextResponse(`Attached to ${tmuxSessionName}...`, { status: 200 });
    } catch (error) {
      // If the session does not exist, create a new session and start the server
      console.log(`Session ${tmuxSessionName} does not exist. Creating new session...`);

      const createSession = `tmux new-session -d -s ${tmuxSessionName}`;
      const startServer = `tmux send-keys -t ${tmuxSessionName} 'sh ${process.env.SERVER_PATH}/start-server.sh' C-m`;

      // Open session in a new terminal window and attach to the session
      const attachSession = `gnome-terminal -- tmux attach-session -t ${tmuxSessionName}`;

      // Execute the commands
      await execPromise(createSession);
      await execPromise(startServer);
      await execPromise(attachSession);

      console.log("Server started successfully...");

      return new NextResponse("Server started successfully...", { status: 200 });
    }
  } catch (error) {
    console.log("Error starting server...", error);
    return new NextResponse("Error starting server...", { status: 500 });
  }
}
