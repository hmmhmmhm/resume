import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

interface NavbarProps {
  lang?: string;
  translations?: {
    resume: string;
    portfolio: string;
    side: string;
    theme: string;
    language: string;
    ko: string;
    en: string;
  };
}

export default function Navbar({ lang = "ko", translations }: NavbarProps = {}) {
  const isMainNavItem = (href: string) => href === `/${lang}` || href === `/${lang}/portfolio` || href === `/${lang}/side`;
  
  return (
    <div className="print:hidden pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background/80 to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background/80"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 gap-0.5 sm:gap-0 bg-background/95 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background/95 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        <TooltipProvider>
          {DATA.navbar.map((item) => {
            // Update href to use current language
            const localizedHref = item.href.startsWith('http') 
              ? item.href 
              : item.href.replace(/^\/ko/, `/${lang}`);
            
            // Get translated label
            const translatedLabel = translations?.[item.key as keyof typeof translations] || item.label;
            
            const content = (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={localizedHref}
                    aria-label={translatedLabel}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: isMainNavItem(localizedHref) ? "default" : "icon" }),
                      "flex items-center justify-center",
                      isMainNavItem(localizedHref) 
                        ? "h-12 px-2.5 gap-2" 
                        : "size-12 sm:size-12"
                    )}
                    target={localizedHref.startsWith("http") ? "_blank" : undefined}
                    rel={localizedHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <item.icon class="size-4 shrink-0" />
                    {isMainNavItem(localizedHref) && (
                      <span className="text-sm font-medium whitespace-nowrap">{translatedLabel}</span>
                    )}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{translatedLabel}</p>
                </TooltipContent>
              </Tooltip>
            );

            // For main nav items (resume/portfolio), don't use DockIcon to avoid width constraints
            if (isMainNavItem(localizedHref)) {
              return <div key={localizedHref} className="flex items-center">{content}</div>;
            }

            // For other items, use DockIcon for the magnification effect and hide on small screens
            return <DockIcon key={localizedHref} className="hidden sm:flex">{content}</DockIcon>;
          })}
          {/* Language switcher - always visible, placed after main nav items */}
          <div className="flex items-center">
            <LanguageSwitcher 
              currentLang={lang} 
              translations={{
                ko: translations?.ko || "한국어",
                en: translations?.en || "English"
              }}
              tooltipText={translations?.language || "언어"}
            />
          </div>
          {/* Temporarily commented out theme toggle button */}
          {/* <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>{translations?.theme || "테마"}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon> */}
        </TooltipProvider>
      </Dock>
    </div>
  );
}
