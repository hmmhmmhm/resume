import type { ComponentChildren } from "preact";
import BlurFade from "./blur-fade";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  delay?: number;
  yOffset?: number;
}

const BlurFadeText = ({ text, className, delay = 0, yOffset = 8 }: BlurFadeTextProps) => {
  return (
    <BlurFade delay={delay} yOffset={yOffset} className={className}>
      {text}
    </BlurFade>
  );
};

export default BlurFadeText;
