import { Tail } from "tail";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const directory = process.env.ZOMBOID_PATH;

    // Validations
    if (!directory) {
      throw new Error("ZOMBOID_PATH is not set");
    }

    const logDirectory = path.join(directory, "Logs");
    const fileName = fs.readdirSync(logDirectory).find((file) => file.includes("_admin.txt"));

    if (!fileName) {
      throw new Error("admin log file does not exist");
    }

    const fullPath = path.join(logDirectory, fileName);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Watch for new lines in admin log file
        const adminLogs = new Tail(fullPath);

        adminLogs.on("line", (line) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "update", content: line })}\n\n`));
        });

        adminLogs.on("error", (error) => {
          controller.error(new Error(`Failed to read log file: ${error.message}`));
        });

        // Handle client disconnect
        req.signal.addEventListener("abort", () => {
          adminLogs.unwatch();
          controller.close();
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
  } catch (error) {
    // Return a 500 status with the error message
    return NextResponse.error(new Error(error.message), { status: 500 });
  }
}
