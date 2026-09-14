import React from "react";

/**
 * SecondRun brandmark: a flatline that spikes back to life.
 * Forensic ledger (ink chip) + resurrection (revival pulse), one glyph.
 * 24px grid, currentColor glyph, role="img" + title per icon-quality bar.
 */
export default function Brandmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const box = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }[size];

  return (
    <span
      role="img"
      aria-label="SecondRun logo"
      className={`inline-flex items-center justify-center rounded-sm bg-ink ${box} ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3/5 w-3/5" aria-hidden="true">
        <title>SecondRun — dead startups, revived</title>
        {/* flatline in */}
        <path
          d="M3 14h4l2-2 2 2h2"
          stroke="#FAF9F6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* revival spike + arrow out */}
        <path
          d="M13 14l2.5-6 2.5 9 2-3H21"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
