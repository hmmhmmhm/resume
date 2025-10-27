"use client";

import type { JSX } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Slide } from "./slide";
import { Download } from "lucide-preact";

// iOS-style spinner component
const Spinner = ({ className }: { className?: string }) => (
  <svg
    class={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
import {
  llamiAppProblem,
  llamiAppDesign,
  llamiAppImplementation,
  llamiAppResults,
  llamiRoboticsProblem,
  llamiRoboticsDesign,
  llamiRoboticsImplementation,
  llamiRoboticsResults,
  akaBrowserProblem,
  akaBrowserDesign,
  akaBrowserImplementation,
  akaBrowserResults,
  curiosityProblem,
  curiosityDesign,
  curiosityImplementation,
  curiosityResults,
} from "./portfolio-slides";

const slides = [
  llamiAppProblem,
  llamiAppDesign,
  llamiAppImplementation,
  llamiAppResults,
  llamiRoboticsProblem,
  llamiRoboticsDesign,
  llamiRoboticsImplementation,
  llamiRoboticsResults,
  akaBrowserProblem,
  akaBrowserDesign,
  akaBrowserImplementation,
  akaBrowserResults,
  curiosityProblem,
  curiosityDesign,
  curiosityImplementation,
  curiosityResults,
];

export default function SlideDeck() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check theme from localStorage
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark" || !theme);

    // Listen for theme changes
    const handleThemeChange = () => {
      const theme = localStorage.getItem("theme");
      setIsDark(theme === "dark" || !theme);
    };

    window.addEventListener("storage", handleThemeChange);
    
    return () => {
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);


  const handleDownload = async (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDownloading(true);
    
    try {
      const response = await fetch('/portfolio.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '이하민_포트폴리오.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      // Keep spinner visible for a moment for better UX
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  return (
    <div
      className="bg-white text-zinc-900 dark:text-zinc-100 min-h-screen transition-colors duration-300"
      style={{
        background: isDark
          ? "radial-gradient(ellipse at top, hsl(0deg 0% 13.49%), hsl(210 11.1% 3.53%))"
          : undefined,
      }}
    >
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md border border-border rounded-lg hover:bg-background/90 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isDownloading ? (
          <Spinner className="size-4" />
        ) : (
          <Download className="size-4" />
        )}
        <span className="text-sm font-medium">인쇄용 PDF 다운로드</span>
      </button>

      <div className="pt-16">
        {slides.map((slide, index) => (
          <div key={slide.id}>
            {index > 0 && (
              <div className="flex items-center justify-center py-4 px-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
                <div className="px-4 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
                  {index + 1} 페이지
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
              </div>
            )}
            <Slide
              title={slide.title}
              subtitle={slide.subtitle}
              icon={slide.icon(isDark)}
              isDark={isDark}
            >
              {slide.content(isDark)}
            </Slide>
          </div>
        ))}
      </div>
    </div>
  );
}
