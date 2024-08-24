"use client";

import { useEffect } from "react";
import { cn } from "../lib/utils";
import Container from "./container";
import { Button } from "./ui/button";

import { useServerContext } from "../context/server-context";

export default function Navbar() {
  const { serverStatus, checkServerStatus, startServer, stopServer } = useServerContext();

  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000); // Check every 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [checkServerStatus]);

  return (
    <header>
      <Container>
        <nav className="flex items-center justify-between">
          <div className="text-3xl font-extrabold">PZ Manager</div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className={cn("h-3 w-3 rounded-full", serverStatus ? "bg-green-500" : "bg-red-500")} />
              <p className="font-semibold text-xs uppercase">Server {serverStatus ? "running" : "stopped"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="green" disabled={serverStatus} onClick={startServer}>
                Start
              </Button>
              <Button variant="red" disabled={!serverStatus} onClick={stopServer}>
                Stop
              </Button>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
