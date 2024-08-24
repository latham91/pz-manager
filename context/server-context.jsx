"use client";

import { createContext, useState, useContext, useCallback } from "react";

const ServerContext = createContext();

export default function ServerProvider({ children }) {
  // State
  const [serverStatus, setServerStatus] = useState(false);

  //////////////////////////////////////////////

  const startServer = async () => {
    try {
      const response = await fetch("/api/commands/startServer", {
        method: "POST",
      });

      if (response.ok) {
        setServerStatus(true);
        return;
      }

      console.error("Error starting server...", response.text());
      setServerStatus(false);
    } catch (error) {
      console.error("Failed to start server...", error);
      setServerStatus(false);
    }
  };

  const stopServer = async () => {
    try {
      const response = await fetch("/api/commands/stopServer", {
        method: "POST",
      });

      if (response.ok) {
        setServerStatus(false);
        return;
      }

      console.error("Failed to stop the server...", response.text());
    } catch (error) {
      console.error("Failed to stop the server...", error);
    }
  };

  const checkServerStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/commands/checkStatus");
      const data = await response.json();
      setServerStatus(data.status);
    } catch (error) {
      console.error("Failed to check server status:", error);
      setServerStatus(false);
    }
  }, []);

  //////////////////////////////////////////////

  return (
    <ServerContext.Provider value={{ serverStatus, checkServerStatus, setServerStatus, startServer, stopServer }}>{children}</ServerContext.Provider>
  );
}

// Context hook
export function useServerContext() {
  const context = useContext(ServerContext);

  if (context === undefined) {
    throw new Error("useServerContext must be used within a ServerProvider");
  }

  return context;
}
