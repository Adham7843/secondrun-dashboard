"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal } from "lucide-react";

interface CopyPromptButtonProps {
  promptText: string;
  companyName: string;
  className?: string;
  size?: "default" | "sm" | "lg";
}

export default function CopyPromptButton({
  promptText,
  companyName,
  className,
  size = "default",
}: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      let textToCopy = promptText;
      try {
        if (promptText.trim().startsWith("[") || promptText.trim().startsWith("{")) {
          const parsed = JSON.parse(promptText);
          if (Array.isArray(parsed)) {
            textToCopy = parsed
              .map(
                (p) =>
                  `# ============================================================================\n# ${p.title.toUpperCase()}\n# TARGET TOOL: ${p.targetTool}\n# ============================================================================\n\n${p.content}`
              )
              .join("\n\n\n");
          }
        }
      } catch {
        // use raw promptText
      }
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <Button
      variant={copied ? "default" : "primary"}
      size={size}
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2 text-green-400" />
          Copied to Clipboard!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          Copy Rebuild Spec for Cursor
        </>
      )}
    </Button>
  );
}
