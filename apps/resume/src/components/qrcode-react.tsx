import { useEffect, useRef } from "preact/hooks";
import QRCode from "qrcode";

interface QRCodeProps {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  className?: string;
}

export function QRCodeSVG({ value, size = 128, level = "M", className }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 1,
          errorCorrectionLevel: level,
        },
        (error) => {
          if (error) {
            console.error("QR Code generation error:", error);
          }
        }
      );
    }
  }, [value, size, level]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
