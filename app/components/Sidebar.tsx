"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l7-6 7 6v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"/>
      <path d="M8 19V12h4v7"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5"/>
      <path d="M13.5 13.5 17 17"/>
    </svg>
  );
}

function PenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 3.5a2.12 2.12 0 013 3L6 18H3v-3L14.5 3.5z"/>
    </svg>
  );
}

const NAV = [
  { href: "/",         label: "홈",   Icon: HomeIcon },
  { href: "/discover", label: "탐색", Icon: SearchIcon },
  { href: "/compose",  label: "작성", Icon: PenIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-wordmark">
        <span className="sidebar-dot" aria-hidden="true" />
        Quotify
      </Link>

      <Link href="/compose" className="sidebar-cta">
        <PenIcon />
        명언 쓰기
      </Link>

      <nav className="sidebar-nav" aria-label="주요 메뉴">
        {NAV.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-link${pathname === href ? " sidebar-link--active" : ""}`}
          >
            <Icon />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
