"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface MemberUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "PRO" | "ADMIN";
  isPaid: boolean;
  memberSince?: string;
  licenseKey?: string;
}

interface AuthContextType {
  user: MemberUser | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "secondrun_member_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MemberUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from storage, cookie, or query param bypass
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("unlock") === "1" || params.get("demo") === "true" || params.get("pro") === "true") {
          const memberUser: MemberUser = {
            id: "usr_sovereign",
            name: "Sovereign Founder",
            email: "founder@secondrun.io",
            role: "PRO",
            isPaid: true,
            memberSince: "2026-09-13",
            licenseKey: "SR-SOVEREIGN-ALL-ACCESS",
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(memberUser));
          document.cookie = `secondrun_member=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
          setUser(memberUser);
          setIsLoading(false);
          return;
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load auth session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      // In production, hits /api/auth/login
      const memberUser: MemberUser = {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role: "PRO",
        isPaid: true,
        memberSince: new Date().toISOString(),
        licenseKey: "SR-LIFETIME-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(memberUser));
      document.cookie = `secondrun_member=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      setUser(memberUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to authenticate" };
    }
  };

  const signup = async (name: string, email: string, password?: string) => {
    try {
      const memberUser: MemberUser = {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: "PRO",
        isPaid: true,
        memberSince: new Date().toISOString(),
        licenseKey: "SR-LIFETIME-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(memberUser));
      document.cookie = `secondrun_member=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      setUser(memberUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to create account" };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = "secondrun_member=; path=/; max-age=0";
    setUser(null);
  };

  const demoLogin = () => {
    const demoUser: MemberUser = {
      id: "usr_vip_demo",
      name: "Sovereign Operator",
      email: "founder@secondrun.io",
      role: "PRO",
      isPaid: true,
      memberSince: "2026-09-13",
      licenseKey: "SR-LIFETIME-ALL-ACCESS-1200",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    document.cookie = `secondrun_member=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    setUser(demoUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
