"use client";

import { useState, useEffect } from "react";
import BTSECard from "./btse-card";

const btseRegex = /^\[(\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\] \[([^\]]+)\] (\d+) \[([^\]]+)\] (.+)$/;

export default function BTSE() {
  const [btseWarnings, setBtseWarnings] = useState([]);

  useEffect(() => {
    // Fetch initial warnings from the database
    const fetchInitialWarnings = async () => {
      try {
        const response = await fetch("/api/console/btse/store");
        const initialWarnings = await response.json();

        setBtseWarnings(initialWarnings);
      } catch (error) {
        console.error("Failed to fetch initial warnings:", error);
      }
    };

    fetchInitialWarnings();

    const eventSource = new EventSource("/api/console/btse");
    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "update") {
        if (data.content.includes("[BTSE]")) {
          const match = data.content.match(btseRegex);
          console.log(match);

          if (!match) {
            return;
          }

          setBtseWarnings((prev) => [
            {
              timestamp: match[1],
              source: match[2],
              steamId: match[3],
              username: match[4],
              warning: match[5],
            },
            ...prev,
          ]);

          // Add player to database
          await fetch("/api/console/btse/store", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ timestamp: match[1], source: match[2], steamId: match[3], username: match[4], warning: match[5] }),
          });
        }
      }
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="bg-secondary rounded-md p-3">
      <h3 className="font-sans font-bold bg-primary-foreground p-2 rounded-md mb-2">BTSE Notifications</h3>
      <div className="p-2 max-h-[350px] overflow-y-auto space-y-3">
        {btseWarnings.length === 0 ? (
          <p className="text-center">No BTSE warnings</p>
        ) : (
          btseWarnings.map((warning, index) => <BTSECard key={index} data={warning} />)
        )}
      </div>
    </div>
  );
}
