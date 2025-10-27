import Spline from "@splinetool/react-spline";

interface SplineViewerProps {
  scene: string;
}

export default function SplineViewer({ scene }: SplineViewerProps) {
  return <Spline scene={scene} />;
}
