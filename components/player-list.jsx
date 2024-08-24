import PlayerCard from "./player-card";

export default function PlayerList() {
  return (
    <div className="bg-secondary rounded-md p-3">
      <h3 className="font-sans font-bold bg-primary-foreground p-2 rounded-md mb-2">Player List</h3>
      <div className="grid grid-cols-2 gap-2 text-sm max-h-[520px] overflow-y-auto">
        <PlayerCard />
      </div>
    </div>
  );
}
