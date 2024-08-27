import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertTimestamp(timestamp) {
  const [date, time] = timestamp.split(" ");
  const [day, month, year] = date.split("-");
  const parsedDate = new Date(`20${year}-${month}-${day}T${time}Z`);

  return parsedDate.toISOString();
}
