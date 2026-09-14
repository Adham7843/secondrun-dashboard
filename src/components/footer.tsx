import Link from "next/link";

// VAULT footer: legal only. No marketing links — the public archive lives on the FRONTENDs.
export default function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-[#141416] text-ink-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-mono">
          © {new Date().getFullYear()} SecondRun Intelligence · Member Console
        </p>
        <div className="flex items-center gap-4 text-xs font-mono">
          <Link href="/terms" className="hover:text-white">
            Terms &amp; No-Refund Policy
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
