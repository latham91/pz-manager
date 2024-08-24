import Container from "../components/container";
import Console from "../components/console";
import PlayerList from "../components/player-list";

export default function Dashboard() {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-5">
        <PlayerList />
        <Console />
      </div>
    </Container>
  );
}
