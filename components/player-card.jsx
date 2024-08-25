"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

export default function PlayerCard({ player }) {
  const handleSendCommand = async (command) => {
    let body = "";

    switch (command) {
      case "kick":
        body = `kick "${player.username}"`;
        break;
      case "ban":
        body = `banid ${player.steamId}"`;
    }

    const response = await fetch("/api/commands/sendCommand", {
      method: "POST",
      body: JSON.stringify({ command: body }),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 hover:bg-primary-foreground/20 rounded-md cursor-pointer text-left outline-none">
        <div>{player.username}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`https://steamcommunity.com/profiles/${player.steamId}`} target="__blank">
            Steam Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSendCommand("kick")}>Kick</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSendCommand("ban")}>Ban</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
