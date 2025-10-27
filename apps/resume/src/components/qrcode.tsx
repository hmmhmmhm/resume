interface QRCodeProps {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  className?: string;
}

export function QRCodeSVG({ value, size = 128, level = "M", className }: QRCodeProps) {
  // Use QR code API service
  const encodedValue = encodeURIComponent(value);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedValue}&ecc=${level}`;

  return (
    <img
      src={qrUrl}
      alt="QR Code"
      width={size}
      height={size}
      className={className}
      loading="lazy"
    />
  );
}
