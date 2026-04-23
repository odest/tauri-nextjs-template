import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-(--comp-h-9) w-full min-w-0 rounded-md border bg-transparent px-3 py-1 [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)] shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-(--comp-h-7) file:border-0 file:bg-transparent file:[font-size:var(--comp-text-sm)] file:[line-height:var(--comp-lh-sm)] file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
