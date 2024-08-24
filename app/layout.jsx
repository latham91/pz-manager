import { Inter } from "next/font/google";
import "./globals.css";
import ServerProvider from "../context/server-context";
import Navbar from "../components/navbar";

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
