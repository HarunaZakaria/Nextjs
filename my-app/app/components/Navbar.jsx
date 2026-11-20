"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="NHIS home" onClick={closeMenu}>
          <Image
            src="/nhi-logo.png"
            alt="NHIS — National Health Insurance Scheme"
            width={194}
            height={106}
            priority
          />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#membership" onClick={closeMenu}>Membership</a>
          <a href="#services" onClick={closeMenu}>Providers</a>
          <a href="#news" onClick={closeMenu}>News</a>
          <a href="#about" onClick={closeMenu}>About us</a>
          <a className="nav-cta" href="#services" onClick={closeMenu}>
            Claims payment <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
