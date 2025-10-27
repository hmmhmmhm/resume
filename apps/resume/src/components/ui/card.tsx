import type { JSX } from "preact";
import { cn } from "@/lib/utils";

const Card = ({ className, ...props }: JSX.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-lg bg-card text-card-foreground", className)} {...props} />
);

const CardHeader = ({ className, ...props }: JSX.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col", className)} {...props} />
);

const CardTitle = ({ className, ...props }: JSX.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);

const CardDescription = ({ className, ...props }: JSX.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

const CardContent = ({ className, ...props }: JSX.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("text-pretty font-sans text-sm text-muted-foreground", className)}
    {...props}
  />
);

const CardFooter = ({ className, ...props }: JSX.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center pt-2", className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
