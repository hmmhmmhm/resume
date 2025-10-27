import type { ComponentChildren } from "preact";

interface MarkdownProps {
  children: string;
  className?: string;
}

// 간단한 마크다운 렌더러 (줄바꿈 처리)
export function Markdown({ children, className }: MarkdownProps) {
  return <div className={className}>{children}</div>;
}
