import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ServerProvider from "@/context/server-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PZ Manager",
  description: "Created by Aaron (Dastardly)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ServerProvider>
          <Navbar />
          {children}
        </ServerProvider>
      </body>
    </html>
  );
}
