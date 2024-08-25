import PlayerCard from "./player-card";
import connectDb from "../lib/db";
import Player from "../models/player";

async function getOnlinePlayers() {
  await connectDb();
  const data = await Player.find().select("username steamId").lean();
  return data;
}

export default async function PlayerList() {
  const data = await getOnlinePlayers();

  const players = data.map((player) => {
    return {
      username: player.username,
      steamId: player.steamId,
    };
  });

  return (
    <div className="bg-secondary rounded-md p-3">
      <h3 className="font-sans font-bold bg-primary-foreground p-2 rounded-md mb-2">Player List</h3>
      <div className="grid grid-cols-2 gap-2 text-sm max-h-[520px] overflow-y-auto">
        {players.map((player) => (
          <PlayerCard key={player.steamId} player={player} />
        ))}
      </div>
    </div>
  );
}
