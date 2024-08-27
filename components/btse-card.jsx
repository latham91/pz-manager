import { SkullIcon } from "lucide-react";
import { convertTimestamp } from "../lib/utils";

export default function BTSECard({ data }) {
  const timestamp = convertTimestamp(data.timestamp);

  return (
    <div className="flex items-center gap-5">
      <div className="h-12 w-12 rounded-md bg-red-500 flex items-center justify-center p-1">
        <SkullIcon className="h-full w-full text-red-200" />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-5">
            {data.username} <span className="text-xs font-normal">(SteamID: {data.steamId})</span>
          </h3>
          <p className="text-xs text-gray-400">
            {new Date(timestamp).toLocaleDateString()} - {new Date(timestamp).toLocaleTimeString()}
          </p>
        </div>
        <p>{data.warning}</p>
      </div>
    </div>
  );
}
