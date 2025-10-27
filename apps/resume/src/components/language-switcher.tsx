import { useEffect, useState, useRef } from "preact/hooks";
import { Languages as LanguagesIcon, Check as CheckIcon } from "lucide-preact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Languages = ({ className, ...props }: any) => <LanguagesIcon class={className} {...props} />;
const Check = ({ className, ...props }: any) => <CheckIcon class={className} {...props} />;

interface LanguageSwitcherProps {
  currentLang: string;
  translations?: {
    ko: string;
    en: string;
  };
  tooltipText?: string;
}

const languageLabels = {
  ko: "한국어",
  en: "English",
};

export function LanguageSwitcher({ currentLang, translations, tooltipText }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false); // Hide tooltip when dropdown opens
  };

  const handleLanguageChange = (lang: string) => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/").filter(Boolean);
    
    // Replace the language part in the URL
    if (pathParts.length > 0 && (pathParts[0] === "ko" || pathParts[0] === "en")) {
      pathParts[0] = lang;
    } else {
      pathParts.unshift(lang);
    }
    
    const newPath = "/" + pathParts.join("/");
    window.location.href = newPath;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-12" disabled={true}>
        <Languages className="size-4" />
        <span className="sr-only">Switch language</span>
      </Button>
    );
  }

  const currentLangLabel = translations?.[currentLang as keyof typeof translations] || languageLabels[currentLang as keyof typeof languageLabels] || currentLang.toUpperCase();

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={() => !isOpen && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleDropdown} 
        className="size-12 gap-1 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none border-0"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <Languages className="size-4" />
        <span className="text-xs font-medium">{currentLang.toUpperCase()}</span>
      </Button>

      {/* Custom tooltip that hides when dropdown is open */}
      {showTooltip && !isOpen && tooltipText && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded-md bg-popover text-popover-foreground border shadow-md whitespace-nowrap animate-in fade-in-0 zoom-in-95">
          {tooltipText}
        </div>
      )}

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-40 rounded-md border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
          <div className="p-1">
            {Object.entries(languageLabels).map(([lang, label]) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground",
                  currentLang === lang && "bg-accent/50"
                )}
              >
                <span className="flex-1 text-left">
                  {translations?.[lang as keyof typeof translations] || label}
                </span>
                {currentLang === lang && (
                  <Check className="size-4 ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
