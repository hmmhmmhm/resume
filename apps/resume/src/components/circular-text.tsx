import { useState } from "react";

interface CircularTextProps {
  text: string;
  onHover?: "speedUp" | "reverse" | "stop";
  spinDuration?: number;
  className?: string;
}

export default function CircularText({
  text,
  onHover = "speedUp",
  spinDuration = 20,
  className = "",
}: CircularTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getAnimationDuration = () => {
    if (!isHovered) return `${spinDuration}s`;
    if (onHover === "speedUp") return `${spinDuration / 2}s`;
    if (onHover === "stop") return "0s";
    return `${spinDuration}s`;
  };

  const getAnimationDirection = () => {
    if (isHovered && onHover === "reverse") return "reverse";
    return "normal";
  };

  const characters = text.split("");
  const angleStep = 360 / characters.length;
  const radius = 45; // percentage from center

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: "100%", height: "100%", aspectRatio: "1/1" }}
    >
      <style>{`
        @keyframes circular-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          animation: `circular-spin ${getAnimationDuration()} linear infinite`,
          animationDirection: getAnimationDirection(),
          animationPlayState: onHover === "stop" && isHovered ? "paused" : "running",
        }}
      >
        {characters.map((char, index) => {
          const angle = (index * angleStep * Math.PI) / 180; // Convert to radians
          const x = 50 + radius * Math.cos(angle - Math.PI / 2);
          const y = 50 + radius * Math.sin(angle - Math.PI / 2);
          const rotation = (index * angleStep);
          
          return (
            <span
              key={index}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
