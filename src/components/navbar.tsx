"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldCheck } from "lucide-react";

// VAULT navbar: member console chrome only. No marketing, no pricing, no archive.
export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink-800 bg-[#18181B]/95 text-ink-100 backdrop-blur">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-sm bg-rebuild text-white flex items-center justify-center font-display font-bold text-sm">
            II
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            SecondRun <span className="text-ink-500 font-mono text-xs uppercase">Member Console</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {user && user.isPaid ? (
            <>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> {user.email}
              </span>
              <button
                onClick={logout}
                className="text-xs font-mono text-ink-400 hover:text-white underline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <span className="text-xs font-mono text-ink-500">Subscriber clearance required</span>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md hover:bg-ink-800 text-ink-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-ink-800 px-4 py-3">
          {user && user.isPaid ? (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="text-xs font-mono text-ink-400 hover:text-white underline"
            >
              Sign Out ({user.email})
            </button>
          ) : (
            <span className="text-xs font-mono text-ink-500">Subscriber clearance required</span>
          )}
        </div>
      )}
    </header>
  );
}
