import Container from "../components/container";
import Console from "../components/console";
import PlayerList from "../components/player-list";
import BTSE from "../components/btse";
import AdminLogs from "../components/admin-logs";

export default function Dashboard() {
  return (
    <Container className="space-y-5">
      <div className="grid grid-cols-4 gap-5">
        <PlayerList />
        <Console />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <BTSE />
        <AdminLogs />
      </div>
    </Container>
  );
}
