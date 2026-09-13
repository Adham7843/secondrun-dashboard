"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lock, ShieldCheck, CheckCircle2, ArrowRight, Zap, Sparkles, KeyRound } from "lucide-react";

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { user, isLoading, login, signup, logout, demoLogin } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (isLoading) {
    return (
      <div className="py-24 text-center space-y-3 font-mono text-xs text-ink-500">
        <div className="w-6 h-6 border-2 border-rebuild border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Verifying Subscriber Security Clearance...</p>
      </div>
    );
  }

  // If user is authenticated and is a paid member, unlock everything!
  if (user && user.isPaid) {
    return (
      <div className="space-y-6">
        {/* Persistent Member Session Bar */}
        <div className="bg-[#18181B] text-ink-100 px-4 py-2.5 rounded-sm border border-ink-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono shadow-2xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1 text-rebuild font-bold">
              <ShieldCheck className="w-4 h-4" />
              LIFETIME MEMBER PASS ACTIVE
            </span>
            <span className="text-ink-500">·</span>
            <span className="text-ink-300 font-semibold">{user.email}</span>
            <span className="text-ink-500">·</span>
            <span className="text-ink-400 text-[11px] bg-ink-900 border border-ink-800 px-2 py-0.5 rounded">
              License: {user.licenseKey || "SR-ALL-ACCESS"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-[11px] flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 1,200+ Startups Unlocked
            </span>
            <button
              onClick={logout}
              className="text-ink-400 hover:text-white underline text-xs font-mono ml-2 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* The Full Unlocked Dashboard */}
        {children}
      </div>
    );
  }

  // If NOT logged in / unpaid, show the Member Clearance Authentication Gate
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setErrorMsg("");
    const res = await login(email, password);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || "Login failed");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setIsSubmitting(true);
    setErrorMsg("");
    const res = await signup(name, email, password);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 space-y-6">
      {/* Top Value Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ink text-white font-mono text-xs uppercase tracking-wider font-semibold">
          <Lock className="w-3.5 h-3.5 text-rebuild" />
          <span>Subscriber Clearance Required</span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink">
          The 1,200+ Startup Vault &amp; Prompt Suites
        </h1>
        <p className="text-sm sm:text-base text-ink-600 max-w-lg mx-auto leading-relaxed">
          Sign in to your paid account below to unlock the complete searchable archive,
          5-module autonomous code blueprints, and the social distribution engine.
        </p>
      </div>

      {/* Main Authentication Card */}
      <Card className="border-2 border-ink-300 bg-white p-2 sm:p-6 shadow-md rounded-sm">
        <CardHeader className="pb-4 pt-2">
          {/* Tabs: Sign In vs Sign Up */}
          <div className="flex border-b border-ink-200 gap-6 font-mono text-xs font-semibold">
            <button
              onClick={() => {
                setTab("signin");
                setErrorMsg("");
              }}
              className={`pb-2 transition-colors border-b-2 ${
                tab === "signin"
                  ? "border-ink text-ink"
                  : "border-transparent text-ink-400 hover:text-ink"
              }`}
            >
              Member Sign In
            </button>
            <button
              onClick={() => {
                setTab("signup");
                setErrorMsg("");
              }}
              className={`pb-2 transition-colors border-b-2 ${
                tab === "signup"
                  ? "border-ink text-ink"
                  : "border-transparent text-ink-400 hover:text-ink"
              }`}
            >
              Activate Pass / Create Account
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono rounded">
              {errorMsg}
            </div>
          )}

          {/* 1-CLICK VIP DEMO / INSTANT TESTING BUTTON */}
          <div className="p-3.5 bg-[#FAF9F6] border border-rebuild/40 rounded-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-ink uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-rebuild" /> Quick Sovereign Verification
              </span>
              <span className="text-rebuild font-semibold text-[11px]">Instant Access</span>
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              Testing the member command console? Click below to instantly authenticate as a verified All-Access subscriber.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={demoLogin}
              className="w-full text-xs font-mono font-semibold h-10 border-rebuild text-rebuild hover:bg-rebuild hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Sign In as Lifetime Member (founder@secondrun.io) →
            </Button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <span className="w-full border-t border-ink-200" />
            <span className="bg-white px-3 text-[11px] font-mono text-ink-400 uppercase tracking-wider absolute">
              Or Use Your Account Credentials
            </span>
          </div>

          {/* FORM: Sign In */}
          {tab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-ink-700 block uppercase">
                  Account Email
                </label>
                <Input
                  type="email"
                  required
                  placeholder="founder@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 text-sm bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono text-ink-700 block uppercase">
                    Password
                  </label>
                  <span className="text-[11px] font-mono text-ink-400">
                    Use your purchase password
                  </span>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 text-sm bg-white"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full h-11 text-sm font-semibold bg-ink text-white hover:bg-ink-800"
              >
                {isSubmitting ? "Authenticating..." : "Unlock Subscriber Console →"}
              </Button>
            </form>
          )}

          {/* FORM: Sign Up / Pass Activation */}
          {tab === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-ink-700 block uppercase">
                  Your Full Name
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Rob Hunter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 text-sm bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-ink-700 block uppercase">
                  Billing Email (Matching Payment)
                </label>
                <Input
                  type="email"
                  required
                  placeholder="founder@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 text-sm bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-ink-700 block uppercase">
                  Create Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 text-sm bg-white"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full h-11 text-sm font-semibold bg-rebuild hover:bg-rebuild/90 text-white"
              >
                {isSubmitting ? "Activating Pass..." : "Activate Lifetime Membership ($49) →"}
              </Button>
            </form>
          )}

          {/* Don't have a pass link */}
          <div className="pt-4 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span className="text-ink-500">Don&apos;t have an All-Access Pass yet?</span>
            <Link
              href="/pricing"
              className="text-rebuild font-bold hover:underline inline-flex items-center gap-1"
            >
              Purchase Lifetime Access ($49 one-time) →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
