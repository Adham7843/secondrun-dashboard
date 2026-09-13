"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Terminal, Search, Menu, X, Skull } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink-200 bg-[#FAF9F6]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FAF9F6]/80">
      {/* Top edition strip */}
      <div className="border-b border-ink-200/60 bg-ink-100/50 px-4 py-1 text-center text-[11px] font-mono tracking-widest text-ink-600 uppercase flex items-center justify-between max-w-7xl mx-auto">
        <span>Vol. 1 · The Startup Morgue File</span>
        <span>1,200+ Autopsies Filed · 42 YC Batches</span>
        <span className="text-rebuild font-semibold">Lifetime Pass: $49</span>
      </div>

      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-sm bg-ink text-white flex items-center justify-center font-display font-bold text-lg group-hover:bg-rebuild transition-colors">
            II
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl leading-none tracking-tight text-ink">
              SecondRun
            </span>
            <span className="text-[10px] font-mono tracking-wider text-ink-500 uppercase">
              Startup Autopsies
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-700">
          <Link href="/" className="hover:text-ink transition-colors">
            Public Archive
          </Link>
          <Link href="/dashboard" className="hover:text-rebuild font-semibold transition-colors flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-rebuild" />
            Subscriber Desk
            <span className="text-[9px] font-mono uppercase bg-rebuild text-white px-1.5 py-0.2 rounded">PRO</span>
          </Link>
          <Link href="/pricing" className="hover:text-ink transition-colors">
            Pricing
          </Link>
        </nav>

        {/* CTA & Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user && user.isPaid ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="text-xs font-mono border-rebuild text-rebuild font-semibold">
                  Console ({user.name.split(" ")[0]}) →
                </Button>
              </Link>
              <button
                onClick={logout}
                className="text-xs font-mono text-ink-500 hover:text-ink underline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-xs font-mono bg-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="primary" size="sm" className="text-xs font-semibold bg-rebuild hover:bg-rebuild/90 text-white">
                  All-Access Pass ($49)
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md hover:bg-ink-100 text-ink-800"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-ink-200 bg-[#FAF9F6] px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-rebuild"
          >
            Public Archive
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-rebuild flex items-center justify-between"
          >
            <span>Subscriber Desk</span>
            <span className="text-[9px] font-mono uppercase bg-rebuild text-white px-1.5 py-0.5 rounded font-bold">PRO</span>
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-rebuild"
          >
            All-Access Pass ($49)
          </Link>
          <div className="pt-3 border-t border-ink-200 flex flex-col gap-2 font-mono">
            {user && user.isPaid ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full text-xs font-semibold bg-rebuild text-white">
                    Command Console ({user.name}) →
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="py-2 text-center text-xs text-ink-500 hover:text-ink underline"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full text-xs bg-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full text-xs bg-rebuild text-white">
                    All-Access Pass ($49)
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
