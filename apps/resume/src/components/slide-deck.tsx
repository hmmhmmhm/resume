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
  getLlamiAppProblem,
  getLlamiAppDesign,
  getLlamiAppImplementation,
  getLlamiAppResults,
  getLlamiRoboticsProblem,
  getLlamiRoboticsDesign,
  getLlamiRoboticsImplementation,
  getLlamiRoboticsResults,
  getAkaBrowserProblem,
  getAkaBrowserDesign,
  getAkaBrowserImplementation,
  getAkaBrowserResults,
  getCuriosityProblem,
  getCuriosityDesign,
  getCuriosityImplementation,
  getCuriosityResults,
} from "./portfolio-slides";

const getSlides = (slideTranslations?: any) => [
  getLlamiAppProblem(slideTranslations?.llamiApp?.problem),
  getLlamiAppDesign(slideTranslations?.llamiApp?.design),
  getLlamiAppImplementation(slideTranslations?.llamiApp?.implementation),
  getLlamiAppResults(slideTranslations?.llamiApp?.results),
  getLlamiRoboticsProblem(slideTranslations?.llamiRobotics?.problem),
  getLlamiRoboticsDesign(slideTranslations?.llamiRobotics?.design),
  getLlamiRoboticsImplementation(slideTranslations?.llamiRobotics?.implementation),
  getLlamiRoboticsResults(slideTranslations?.llamiRobotics?.results),
  getAkaBrowserProblem(slideTranslations?.akaBrowser?.problem),
  getAkaBrowserDesign(slideTranslations?.akaBrowser?.design),
  getAkaBrowserImplementation(slideTranslations?.akaBrowser?.implementation),
  getAkaBrowserResults(slideTranslations?.akaBrowser?.results),
  getCuriosityProblem(slideTranslations?.curiosity?.problem),
  getCuriosityDesign(slideTranslations?.curiosity?.design),
  getCuriosityImplementation(slideTranslations?.curiosity?.implementation),
  getCuriosityResults(slideTranslations?.curiosity?.results),
];

interface SlideDeckProps {
  translations?: {
    downloadPDF: string;
    downloadFilename: string;
    pageNumber: string;
  };
  slideTranslations?: any;
}

export default function SlideDeck({ translations, slideTranslations }: SlideDeckProps = {}) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const slides = getSlides(slideTranslations);

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
      a.download = translations?.downloadFilename || '이하민_포트폴리오.pdf';
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
        <span className="text-sm font-medium">{translations?.downloadPDF || '인쇄용 PDF 다운로드'}</span>
      </button>

      <div className="pt-16">
        {slides.map((slide, index) => {
          // Get translated title and subtitle if available
          let translatedTitle = slide.title;
          let translatedSubtitle = slide.subtitle;
          
          if (slideTranslations) {
            // Map slide IDs to translation keys
            const slideKeyMap: Record<string, string> = {
              'problem': 'llamiApp.problem',
              'design': 'llamiApp.design',
              'implementation': 'llamiApp.implementation',
              'results': 'llamiApp.results',
              'robot-problem': 'llamiRobotics.problem',
              'robot-design': 'llamiRobotics.design',
              'robot-implementation': 'llamiRobotics.implementation',
              'robot-results': 'llamiRobotics.results',
              'aka-browser-problem': 'akaBrowser.problem',
              'aka-browser-design': 'akaBrowser.design',
              'aka-browser-implementation': 'akaBrowser.implementation',
              'aka-browser-results': 'akaBrowser.results',
              'curiosity-problem': 'curiosity.problem',
              'curiosity-design': 'curiosity.design',
              'curiosity-implementation': 'curiosity.implementation',
              'curiosity-results': 'curiosity.results',
            };
            
            const translationKey = slideKeyMap[slide.id];
            if (translationKey) {
              const keys = translationKey.split('.');
              const slideData = slideTranslations[keys[0]]?.[keys[1]];
              if (slideData) {
                translatedTitle = slideData.title || slide.title;
                translatedSubtitle = slideData.subtitle || slide.subtitle;
              }
            }
          }
          
          return (
            <div key={slide.id}>
              {index > 0 && (
                <div className="flex items-center justify-center py-4 px-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
                  <div className="px-4 text-zinc-500 dark:text-zinc-400 font-mono text-sm">
                    {index + 1} {translations?.pageNumber || '페이지'}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
                </div>
              )}
              <Slide
                title={translatedTitle}
                subtitle={translatedSubtitle}
                icon={slide.icon(isDark)}
                isDark={isDark}
              >
                {slide.content(isDark)}
              </Slide>
            </div>
          );
        })}
      </div>
    </div>
  );
}
