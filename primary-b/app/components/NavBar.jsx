"use client";

import { useState } from "react";
import NavMenu from "./NavMenu";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-inner section-wrap" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Diare Primary B home">
          <span className="brand-icon" aria-hidden="true">
            D
          </span>
          <span className="brand-name">
            <strong>Diare Primary B</strong>
            <small>Learning together</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <NavMenu
          isOpen={menuOpen}
          onNavigate={() => setMenuOpen(false)}
        />
        <a
          className="nav-contact"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Get in touch <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
