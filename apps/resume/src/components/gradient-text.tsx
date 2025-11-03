import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 8,
  showBorder = false
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '300% 100%',
    animation: `gradient ${animationSpeed}s linear infinite`
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none"
          style={gradientStyle}
        >
          <div
            className="absolute inset-0 bg-black z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-cover"
        style={{
          ...gradientStyle,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          fontWeight: 700
        }}
      >
        {children}
      </div>
    </div>
  );
}