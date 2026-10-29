import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

import NavBar from "./components/Navbar";

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dojo Desk | Ticketing Dashboard",
  description: "A polished support dashboard for managing product tickets and updates.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
