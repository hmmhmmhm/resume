import type { JSX, ComponentChildren } from "preact";
import { cn } from "@/lib/utils";

const Avatar = ({ className, ...props }: JSX.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
);

interface AvatarImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const AvatarImage = ({ className, src, alt, ...props }: AvatarImageProps) => (
  <img 
    src={src} 
    alt={alt} 
    width={200} 
    height={200} 
    loading="lazy" 
    decoding="async" 
    className={cn("absolute inset-0 aspect-square h-full w-full object-cover z-10 bg-white dark:bg-zinc-800", className)} 
    {...props} 
  />
);

const AvatarFallback = ({
  className,
  children,
  ...props
}: JSX.HTMLAttributes<HTMLSpanElement> & { children: ComponentChildren }) => (
  <span
    className={cn(
      "absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-muted z-0",
      className
    )}
    {...props}
  >
    {children}
  </span>
);

export { Avatar, AvatarImage, AvatarFallback };
