"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, ArrowRight, Lock, KeyRound, Zap } from "lucide-react";

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    await login(email, password);
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <Card className="border-2 border-ink-300 bg-white p-2 sm:p-5 shadow-sm rounded-sm">
        <CardHeader className="text-center pb-6">
          <div className="h-10 w-10 mx-auto mb-2 rounded-xs bg-ink text-white flex items-center justify-center font-display font-bold text-xl">
            II
          </div>
          <CardTitle className="text-2xl font-bold text-ink">Member Sign In</CardTitle>
          <CardDescription className="text-xs font-mono text-ink-500">
            Access the 1,200+ startup autopsy morgue and 5-module autonomous prompt suites
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Quick 1-Click Sovereign Access */}
          <div className="p-3 bg-[#FAF9F6] border border-rebuild/40 rounded-sm space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-ink flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-rebuild" /> Quick Sovereign Verification
              </span>
              <span className="text-rebuild font-semibold text-[11px]">Instant Access</span>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                demoLogin();
                window.location.href = "/dashboard";
              }}
              className="w-full text-xs font-mono font-semibold h-10 border-rebuild text-rebuild hover:bg-rebuild hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Sign In as Lifetime Member (founder@secondrun.io) →
            </Button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <span className="w-full border-t border-ink-200" />
            <span className="bg-white px-3 text-[11px] font-mono text-ink-400 uppercase tracking-wider absolute">
              Or Account Credentials
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-ink-600 block">Work Email</label>
              <Input
                type="email"
                required
                placeholder="founder@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 text-sm"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-ink-600 block">Password</label>
                <Link href="#" className="text-[11px] font-mono text-rebuild hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 text-sm"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={submitted}
              className="w-full h-11 text-xs sm:text-sm font-semibold mt-2 bg-ink text-white hover:bg-ink-800"
            >
              {submitted ? "Authenticating..." : "Sign In to Dashboard →"}
            </Button>
          </form>

          <div className="text-center pt-2 text-xs font-mono text-ink-500">
            Don&apos;t have an All-Access Pass?{" "}
            <Link href="/pricing" className="text-rebuild font-bold hover:underline">
              Get Lifetime Pass ($49)
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
