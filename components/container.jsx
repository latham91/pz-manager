import { cn } from "../lib/utils";

export default function Container({ children, className }) {
  return <div className={cn("max-w-7xl mx-auto p-4", className)}>{children}</div>;
}
