import { useEffect, useState } from "preact/hooks";
import { Moon as MoonIcon, Sun as SunIcon } from "lucide-preact";
import { Button } from "@/components/ui/button";

const Moon = ({ className, ...props }: any) => <MoonIcon class={className} {...props} />;
const Sun = ({ className, ...props }: any) => <SunIcon class={className} {...props} />;

export function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const isDark =
      savedTheme === "dark" || (!savedTheme && document.documentElement.classList.contains("dark"));
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-12" disabled={true}>
        <Sun className="size-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="size-12">
      {theme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
