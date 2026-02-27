"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resorts/tsaghkadzor", label: "Tsaghkadzor" },
  { href: "/resorts/myler", label: "MyLer" },
  { href: "/instructors", label: "Instructors" },
  { href: "/about", label: "About" },
] as const;

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ice/10 text-ice transition-colors group-hover:bg-ice/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M2 22 16 8" />
                <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
                <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
                <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
                <line x1="20" y1="2" x2="22" y2="4" />
              </svg>
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              Snow<span className="text-ice">Pro</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-snow-300 transition-colors hover:bg-white/5 hover:text-snow"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/instructors"
              className="ml-3 rounded-lg bg-ice px-4 py-2 text-sm font-semibold text-mountain transition-all hover:bg-ice-light hover:shadow-lg hover:shadow-ice/20"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 text-snow-300 hover:bg-white/5 hover:text-snow"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-snow-300 hover:bg-white/5 hover:text-snow"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/instructors"
              onClick={() => setIsOpen(false)}
              className="mt-2 block rounded-lg bg-ice px-4 py-2 text-center text-sm font-semibold text-mountain"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
