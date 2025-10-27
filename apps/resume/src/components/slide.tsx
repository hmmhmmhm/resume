import type { ReactNode } from "react";
import BlurFade from "@/components/magicui/blur-fade";

interface SlideProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  isDark?: boolean;
}

const BLUR_FADE_DELAY = 0.04;

export function Slide({ title, subtitle, icon, children, isDark = true }: SlideProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-20 py-20 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-5 mb-4 sm:mb-5 md:mb-6">
              {icon && <div className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0">{icon}</div>}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent leading-tight">
                {title}
              </h1>
            </div>
          </BlurFade>
          {subtitle && (
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <p
                className={`text-base sm:text-lg md:text-xl lg:text-3xl ${isDark ? "text-zinc-400" : "text-zinc-500"} font-normal tracking-wide ml-0 sm:ml-12 md:ml-[4.5rem]`}
              >
                {subtitle}
              </p>
            </BlurFade>
          )}
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="text-sm sm:text-base md:text-lg leading-relaxed ml-0 sm:ml-12 md:ml-[4.5rem]">
            {children}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
