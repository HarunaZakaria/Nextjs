import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div>
      <nav>
        <h1>Help Desk</h1>
        <Link href="/">dashboard</Link>
        <Link href="/tickets">tickets</Link>
      </nav>
    </div>
  );
}
