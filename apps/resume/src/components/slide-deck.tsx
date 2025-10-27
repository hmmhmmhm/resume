"use client";

import type { JSX } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Slide } from "./slide";
import { ChevronLeft, ChevronRight, Download } from "lucide-preact";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPageInputMode, setIsPageInputMode] = useState(false);
  const [pageInputValue, setPageInputValue] = useState("");
  const [isDark, setIsDark] = useState(true);

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
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(currentSlide + 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(currentSlide - 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, isTransitioning]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: JSX.TargetedTouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: JSX.TargetedTouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    let offset = currentTouch - touchStart;

    // Clamp offset to prevent over-scrolling
    const maxOffset = 200; // Maximum drag distance
    if (currentSlide === 0 && offset > 0) {
      offset = Math.min(offset * 0.3, maxOffset * 0.3); // Reduce drag at start
    } else if (currentSlide === slides.length - 1 && offset < 0) {
      offset = Math.max(offset * 0.3, -maxOffset * 0.3); // Reduce drag at end
    } else {
      offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
    }

    setDragOffset(offset);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setDragOffset(0);
      setIsDragging(false);
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide();
    } else if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }

    setDragOffset(0);
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onMouseDown = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const onMouseMove = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart) return;
    e.preventDefault();
    let offset = e.clientX - dragStart;

    // Clamp offset to prevent over-scrolling
    const maxOffset = 200; // Maximum drag distance
    if (currentSlide === 0 && offset > 0) {
      offset = Math.min(offset * 0.3, maxOffset * 0.3); // Reduce drag at start
    } else if (currentSlide === slides.length - 1 && offset < 0) {
      offset = Math.max(offset * 0.3, -maxOffset * 0.3); // Reduce drag at end
    } else {
      offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
    }

    setDragOffset(offset);
  };

  const onMouseUp = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = dragStart - e.clientX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide();
    } else if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }

    setIsDragging(false);
    setDragStart(null);
    setDragOffset(0);
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setDragOffset(0);
    }
    setIsDragging(false);
    setDragStart(null);
  };

  const handlePageIndicatorClick = (e: JSX.TargetedMouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsPageInputMode(true);
    setPageInputValue(String(currentSlide + 1));
  };

  const handlePageInputChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setPageInputValue(value);
    }
  };

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(pageInputValue, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= slides.length) {
      setCurrentSlide(pageNumber - 1);
    }
    setIsPageInputMode(false);
    setPageInputValue("");
  };

  const handlePageInputKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePageInputSubmit();
    } else if (e.key === "Escape") {
      setIsPageInputMode(false);
      setPageInputValue("");
    }
  };

  const handlePageInputBlur = () => {
    handlePageInputSubmit();
  };

  useEffect(() => {
    const preventBackNavigation = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      const startX = touch.clientX;

      if (startX < 20 && currentSlide > 0) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", preventBackNavigation, { passive: false });
    return () => document.removeEventListener("touchstart", preventBackNavigation);
  }, [currentSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className={`bg-white text-zinc-900 dark:text-zinc-100 min-h-screen relative overflow-hidden transition-colors duration-300 select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        background: isDark
          ? "radial-gradient(ellipse at top, hsl(0deg 0% 13.49%), hsl(210 11.1% 3.53%))"
          : undefined,
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <a
        href="/portfolio.pdf"
        download="이하민_포트폴리오.pdf"
        className="fixed top-3 sm:top-4 left-3 sm:left-4 z-50 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors shadow-sm"
      >
        <Download className="size-3 sm:size-4" />
        <span className="text-[10px] sm:text-sm font-medium">인쇄용 PDF 다운로드</span>
      </a>
      <div className="fixed top-3 sm:top-4 right-3 sm:right-4 z-50 flex items-center space-x-2 sm:space-x-2.5">
        {isPageInputMode ? (
          <input
            type="text"
            value={pageInputValue}
            onChange={handlePageInputChange}
            onKeyDown={handlePageInputKeyDown}
            onBlur={handlePageInputBlur}
            autoFocus
            className="w-12 sm:w-14 text-center bg-background border border-border rounded px-1 py-0.5 text-zinc-600 dark:text-zinc-400 font-mono text-[10px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            placeholder={`1-${slides.length}`}
          />
        ) : (
          <span
            onClick={handlePageIndicatorClick}
            className="text-zinc-600 dark:text-zinc-400 font-mono text-[10px] sm:text-xs cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors px-1 py-0.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {currentSlide + 1} / {slides.length}
          </span>
        )}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0 || isTransitioning}
          className="rounded-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1 sm:p-0.5"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="size-3 sm:size-3" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1 || isTransitioning}
          className="rounded-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1 sm:p-0.5"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="size-3 sm:size-3" />
        </button>
      </div>

      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-800 z-40">
        <div
          className="h-full bg-black dark:bg-white transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <div
        className="flex"
        style={{
          transform: `translateX(calc(-${currentSlide * 100}vw + ${dragOffset}px))`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} style={{ width: "100vw", flexShrink: 0 }}>
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
