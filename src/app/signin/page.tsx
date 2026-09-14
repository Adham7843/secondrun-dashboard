"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

// Member re-entry: purchase email → magic link. No passwords exist.
export default function SignInPage() {
  const params = useSearchParams();
  const error = params.get("error");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    await fetch("/api/auth/request-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setBusy(false);
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ink text-white font-mono text-xs uppercase tracking-wider font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-rebuild" />
          <span>Member Sign In</span>
        </div>
        <h1 className="font-display font-bold text-3xl text-ink">
          Enter your purchase email
        </h1>
        <p className="text-sm text-ink-600">
          We&apos;ll send a one-click access link. No passwords, ever.
        </p>
      </div>

      <Card className="border-ink-300 bg-white p-6">
        <CardContent className="space-y-4 p-0">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono rounded">
              That link expired or was already used — request a fresh one below.
            </div>
          )}
          {sent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded leading-relaxed">
              Check your inbox — if that email owns the vault, an access link is
              on its way (valid 15 minutes).
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <Input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-sm bg-white"
              />
              <Button
                type="submit"
                disabled={busy}
                className="w-full h-11 text-sm font-semibold bg-rebuild hover:bg-rebuild/90 text-white"
              >
                {busy ? "Sending..." : "Send access link →"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
