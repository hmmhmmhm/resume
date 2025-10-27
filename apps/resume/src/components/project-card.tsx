import type { ComponentChildren } from "preact";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "@/components/qrcode-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: ComponentChildren;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <a href={href || "#"} className={cn("block cursor-pointer", className)}>
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <img
            src={image}
            alt={title}
            width={724}
            height={496}
            loading="lazy"
            decoding="async"
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </a>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-black dark:text-white dark:prose-invert">
            {description}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-col gap-3 w-full">
            {links?.map((link, idx) => (
              <a
                href={link?.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors border print:border-gray-300"
              >
                <div className="flex-shrink-0">
                  <QRCodeSVG value={link.href} size={48} level="M" className="print:block" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-black dark:text-white mb-1">
                    {link.type}
                  </div>
                  <div className="text-xs text-black dark:text-white font-bold break-all text-balance">
                    {link.href.length > 40 ? `${link.href.substring(0, 40)}...` : link.href}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
