import path from "node:path";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// VAULT: SQLite file lives at <project-root>/prisma/dev.db (committed to this
// repo — the vault owns its data). Absolute path so build, dev, and any Node
// host (Vercel/Railway) resolve it identically regardless of cwd.
function vaultDbUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  return "file:" + path.join(process.cwd(), "prisma", "dev.db");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ datasources: { db: { url: vaultDbUrl() } } });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
