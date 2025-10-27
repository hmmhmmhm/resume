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
  <img src={src} alt={alt} className={cn("aspect-square h-full w-full", className)} {...props} />
);

const AvatarFallback = ({
  className,
  children,
  ...props
}: JSX.HTMLAttributes<HTMLSpanElement> & { children: ComponentChildren }) => (
  <span
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  >
    {children}
  </span>
);

export { Avatar, AvatarImage, AvatarFallback };
