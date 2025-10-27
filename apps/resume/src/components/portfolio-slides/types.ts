export interface SlideConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: (isDark: boolean) => any;
  content: (isDark: boolean) => any;
}
