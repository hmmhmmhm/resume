import type { ComponentChildren } from "preact";
import { createContext } from "preact";
import { useRef, useEffect, useState, useContext } from "preact/hooks";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

interface DockProps {
  className?: string;
  children: ComponentChildren;
  magnification?: number;
  distance?: number;
}

interface DockContextValue {
  mousex: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextValue | null>(null);

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export function Dock({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: DockProps) {
  const [mounted, setMounted] = useState(false);
  const mousex = useMotionValue(Infinity);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DockContext.Provider value={{ mousex, magnification, distance }}>
      <motion.div
        onMouseMove={(e: any) => mounted && mousex.set(e.pageX)}
        onMouseLeave={() => mounted && mousex.set(Infinity)}
        className={cn("mx-auto w-max h-full p-2 flex items-end rounded-full border", className)}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

interface DockIconProps {
  className?: string;
  children: ComponentChildren;
}

export function DockIcon({ className, children }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dockContext = useContext(DockContext);

  // If context is not available, render without magnification
  if (!dockContext) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-full w-10",
          className
        )}
      >
        {children}
      </div>
    );
  }

  const { mousex, magnification, distance } = dockContext;

  const distanceCalc = useTransform(mousex, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
