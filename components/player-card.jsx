import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function PlayerCard() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 hover:bg-primary-foreground/20 rounded-md cursor-pointer text-left outline-none">
        Dastardly
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Steam Profile</DropdownMenuItem>
        <DropdownMenuItem>Kick</DropdownMenuItem>
        <DropdownMenuItem>Ban</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
