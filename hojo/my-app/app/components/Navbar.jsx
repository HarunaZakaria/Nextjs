import Link from "next/link";
import Image from "next/image";
import Logo from "./dojo-logo.png";

export default function Navbar() {
  return (
    <header className="topbar">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Go to dashboard">
          <Image
            src={Logo}
            width={52}
            height={52}
            alt="Dojo logo"
            quality={100}
            priority
          />
          <span>Dojo Desk</span>
        </Link>

        <div className="nav-links">
          <Link href="/">Dashboard</Link>
          <Link href="/tickets">Tickets</Link>
          <Link href="/tickets/create">Create</Link>
        </div>
      </nav>
    </header>
  );
}
