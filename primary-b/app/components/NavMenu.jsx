"use client";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#learning", label: "Learning" },
  { href: "#school-life", label: "School life" },
];

export default function NavMenu({ isOpen, onNavigate }) {
  return (
    <ul
      className={`nav-links${isOpen ? " nav-links--open" : ""}`}
      id="primary-navigation"
    >
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} onClick={onNavigate}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
