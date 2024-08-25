import { Tail } from "tail";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  const directory = process.env.ZOMBOID_PATH;
  const fileName = "server-console.txt";
  const fullPath = path.join(directory, fileName);

  // Validations
  if (!directory) {
    return NextResponse.error(new Error("ZOMBOID_PATH is not set"));
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.error(new Error("server-console.txt does not exist"));
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send the initial server-console.txt content
      const initialConsole = fs.readFileSync(fullPath, "utf-8");
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "initial", content: initialConsole })}\n\n`));

      // Watch for new lines in server-console.txt
      const serverConsole = new Tail(fullPath);

      serverConsole.on("line", async (line) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "update", content: line })}\n\n`));
      });

      // Handle client disconnect
      req.signal.addEventListener("abort", () => {
        serverConsole.unwatch();
      });
    },
  });

  // Send back the stream
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
