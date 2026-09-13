"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SundayDispatchSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="p-6 sm:p-8 bg-[#FAF9F6] border border-ink-200/80 rounded-sm shadow-2xs">
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase font-bold text-rebuild tracking-widest bg-rebuild-light px-2 py-0.5 rounded">
            Free Weekly Dispatches
          </span>
          <span className="text-xs font-mono text-ink-500">· 8,400+ Founders &amp; Builders</span>
        </div>

        <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink">
          The Sunday Autopsy Dispatch
        </h3>

        <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans max-w-lg mx-auto">
          No generic advice. No AI slop. Just one deep forensic post-mortem every Sunday morning detailing 
          exact burn rates, fatal unit economics, and the autonomous micro-SaaS specifications to resurrect them.
        </p>

        {submitted ? (
          <div className="p-4 bg-white border border-rebuild text-rebuild font-mono text-xs font-semibold rounded mt-4">
            ✓ You are subscribed to The Sunday Dispatch. Your first forensic report arrives this weekend.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <Input
              type="email"
              placeholder="Enter your work email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-ink-300 h-10 text-xs text-ink"
            />
            <Button
              type="submit"
              variant="primary"
              className="h-10 text-xs font-semibold px-5 shrink-0 shadow-2xs"
            >
              Subscribe Free
            </Button>
          </form>
        )}

        <div className="text-[11px] font-mono text-ink-400 pt-1">
          Zero spam · Free forever · Unsubscribe anytime with one click
        </div>
      </div>
    </div>
  );
}
