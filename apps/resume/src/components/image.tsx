interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  draggable?: boolean;
}

export default function Image({ src, alt, fill, width, height, className, draggable }: ImageProps) {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className || ""}`}
        draggable={draggable}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable={draggable}
    />
  );
}
