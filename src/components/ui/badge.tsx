import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 text-xs font-mono font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-ink text-white shadow",
        secondary:
          "border-transparent bg-ink-100 text-ink-800",
        destructive:
          "border-transparent bg-destructive text-white shadow",
        outline: "text-foreground border-ink-300",
        inactive:
          "border-ink-900 bg-ink-900 text-white",
        acquired:
          "border-[#B7791F] bg-[#B7791F] text-white",
        active:
          "border-rebuild bg-rebuild text-white",
        rebuild:
          "border-rebuild text-rebuild bg-rebuild-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
