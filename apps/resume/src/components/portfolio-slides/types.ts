import type { ReactNode } from "react";

export interface SlideConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: (isDark: boolean) => ReactNode;
  content: (isDark: boolean) => ReactNode;
}
