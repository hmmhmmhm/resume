import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { cn } from "@/lib/utils";

interface TooltipProviderProps {
  children: ComponentChildren;
  delayDuration?: number;
}

const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <>{children}</>;
};

interface TooltipProps {
  children: ComponentChildren;
}

const Tooltip = ({ children }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
    </div>
  );
};

interface TooltipTriggerProps {
  asChild?: boolean;
  children: ComponentChildren;
  className?: string;
}

const TooltipTrigger = ({ children, asChild, className }: TooltipTriggerProps) => {
  return <div className={className}>{children}</div>;
};

interface TooltipContentProps {
  children: ComponentChildren;
  className?: string;
}

const TooltipContent = ({ className, children }: TooltipContentProps) => {
  return (
    <div
      className={cn(
        "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
