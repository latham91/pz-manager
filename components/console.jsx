"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useServerContext } from "@/context/server-context";

export default function Console() {
  const { sendCommand, serverStatus } = useServerContext();
  const [consoleContent, setConsoleContent] = useState("");
  const [command, setCommand] = useState("");
  const consoleRef = useRef();

  // Listen for server console updates
  useEffect(() => {
    const eventSource = new EventSource("/api/console");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "initial") {
        setConsoleContent(data.content);
      }

      if (data.type === "update") {
        setConsoleContent((prevContent) => prevContent + "\n" + data.content);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Keep the console scrolled to the bottom
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleContent]);

  // Functions
  const handleCommandSubmit = (event) => {
    event.preventDefault();

    if (command.trim() === "") {
      return;
    }

    // Send the command to the server
    sendCommand(command);

    // Clear the input
    setCommand("");
  };

  return (
    <div className="bg-secondary rounded-md h-[600px] text-secondary-foreground p-3 overflow-auto font-mono col-span-3">
      <h3 className="font-sans font-bold bg-primary-foreground p-2 rounded-md mb-2">Server Console</h3>
      <pre ref={consoleRef} className="h-[calc(100%-6rem)] text-sm overflow-auto">
        {consoleContent}
      </pre>
      <form onSubmit={handleCommandSubmit} className="mt-2 flex items-center gap-2">
        <Input placeholder="Enter a command..." value={command} onChange={(event) => setCommand(event.target.value)} disabled={!serverStatus} />
        <Button type="submit" size="sm" disabled={!serverStatus}>
          Send
        </Button>
      </form>
    </div>
  );
}
