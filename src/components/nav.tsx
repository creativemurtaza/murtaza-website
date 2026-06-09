"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/professional", label: "Professional" },
  { href: "/creative", label: "Creative" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors">
          Ghulam Murtaza
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-neutral-100 text-neutral-900 font-medium"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-md p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                pathname === link.href
                  ? "bg-neutral-100 text-neutral-900 font-medium"
                  : "text-neutral-500 hover:text-neutral-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
