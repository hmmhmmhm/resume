"use client";
import { useState } from "react";
import GridCanvas from "./grid-canvas";

const getLayerColor = (layer: number) => {
  // 흰색 기반 (불투명도로 구분)
  const opacity = Math.min(0.3 + layer * 0.07, 1.0); // 초기값 0.3에서 1.0까지 증가
  return `rgba(255, 255, 255, ${opacity})`;
};

export interface SpiralViewerProps {
  getCoordinates?: (n: number) => { x: number; y: number };
  getNFromCoordinates?: (x: number, y: number) => number;
  translations?: any;
}

export default function SpiralViewer({
  getCoordinates,
  getNFromCoordinates,
  translations,
}: SpiralViewerProps) {
  const t = translations || {};
  const [currentCoordinate, setCurrentCoordinate] = useState(90);
  const [coordinatesHistory, setCoordinatesHistory] = useState<number[]>(
    Array.from({ length: 90 }, (_, i) => i + 1)
  );
  const [highlightedCoordinate, setHighlightedCoordinate] = useState<
    number | null
  >(null);
  const [gridRange, setGridRange] = useState(7);

  // Playground states
  const [nInput, setNInput] = useState<string>("10");
  const [xInput, setXInput] = useState<string>("2");
  const [yInput, setYInput] = useState<string>("3");

  // Grid Range에 따른 최대 좌표값 계산
  const calculateMaxCoordinate = (range: number) => {
    // 각 range에 맞는 적절한 최대값 계산
    return Math.round(range * 2 * range * 1.225);
  };

  const maxCoordinate = calculateMaxCoordinate(gridRange);

  const handleCoordinateChange = (n: number) => {
    setCurrentCoordinate(n);
    setCoordinatesHistory(Array.from({ length: n }, (_, i) => i + 1));
  };

  const handleGridRangeChange = (value: number) => {
    setGridRange(value);
    // Grid Range가 변경될 때 현재 좌표가 새로운 최대값을 초과하면 조정
    const newMaxCoordinate = calculateMaxCoordinate(value);
    if (currentCoordinate > newMaxCoordinate) {
      handleCoordinateChange(newMaxCoordinate);
    }
  };

  const getCoordinateColor = (n: number) => {
    const baseColor = getLayerColor(Math.ceil((Math.sqrt(n) - 1) / 2));
    if (highlightedCoordinate === n) {
      return "rgba(0, 255, 0, 0.8)"; // 하이라이트된 좌표는 녹색으로 표시
    }
    return baseColor;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col">
        {/* Canvas - Always on top */}
        <div className="w-full bg-black rounded-lg shadow-lg overflow-hidden mb-4 aspect-square">
          <GridCanvas
            gridRange={gridRange}
            highlightCoordinates={coordinatesHistory.map((n) => ({
              coord: getCoordinates ? getCoordinates(n) : { x: 0, y: 0 },
              color: getCoordinateColor(n),
            }))}
          />
        </div>

        {/* Description - Always on bottom */}
        <div className="w-full flex flex-col">
          <div className="mb-4 text-white">
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              {t.spiralViewerTitle || "나선 좌표 시각화"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-4">
              {t.spiralViewerDesc || "이 시각화는 (0,0)에서 시작하여 시계 방향으로 바깥쪽으로 확장되는 독특한 나선 좌표 시스템을 보여줍니다. 슬라이더를 움직여 1부터 좌표를 생성하고, 원점 주위에 동심원 레이어를 형성하는 모습을 관찰하세요."}
            </p>
            <div className="mb-4">
              <label className="block text-xs sm:text-sm font-medium mb-2">
                {t.gridRange || "그리드 범위"} (-{gridRange} ~ {gridRange})
              </label>
              <div className="relative">
                <input
                  type="range"
                  min={7}
                  max={20}
                  value={gridRange}
                  onChange={(e) =>
                    handleGridRangeChange(Number((e.target as HTMLInputElement).value))
                  }
                  className="w-full h-2 sm:h-3 mb-2 bg-black rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-300 focus:outline-none border border-white/20"
                  style={{
                    WebkitAppearance: "none",
                    appearance: "none",
                  }}
                />
                <div className="flex justify-between text-xs text-white/70">
                  <span>7</span>
                  <span>20</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs sm:text-sm font-medium mb-2 text-white">
              {t.coordinateRange || "좌표 범위"} (1 ~ {maxCoordinate})
            </label>
            <input
              type="range"
              min={1}
              max={maxCoordinate}
              value={currentCoordinate}
              onChange={(e) => handleCoordinateChange(Number((e.target as HTMLInputElement).value))}
              className="w-full h-2 sm:h-3 mb-2 bg-black rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-300 focus:outline-none border border-white/20"
              style={{
                WebkitAppearance: "none",
                appearance: "none",
              }}
            />
            <div className="relative w-full h-6">
              <div className="absolute left-0 -top-1 w-full flex justify-between px-1">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 bg-white/50"></div>
                  <span className="text-xs text-white/70">1</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 bg-white/50"></div>
                  <span className="text-xs text-white/70">
                    {Math.floor(maxCoordinate * 0.25)}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 bg-white/50"></div>
                  <span className="text-xs text-white/70">
                    {Math.floor(maxCoordinate * 0.5)}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 bg-white/50"></div>
                  <span className="text-xs text-white/70">
                    {Math.floor(maxCoordinate * 0.75)}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-2 bg-white/50"></div>
                  <span className="text-xs text-white/70">{maxCoordinate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 sm:mt-10">
            <h2 className="text-lg sm:text-xl font-bold">
              {t.spiralTransformTitle || "나선 좌표 변환"}
            </h2>
          </div>

          {/* Playground: n → (x, y) */}
          <div className="mt-6 p-3 bg-white/5 rounded border border-white/10">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="text-white/80 whitespace-nowrap">n → (x, y):</span>
              <input
                type="number"
                value={nInput}
                onChange={(e) => setNInput((e.target as HTMLInputElement).value)}
                className="w-20 px-2 py-1 bg-black border border-white/20 rounded text-white text-xs focus:outline-none focus:border-white/40"
                placeholder="10"
              />
              <span className="text-white/60">→</span>
              <span className="font-mono text-white">
                {(() => {
                  const n = parseInt(nInput);
                  if (isNaN(n) || n <= 0) return "—";
                  if (!getCoordinates) return "—";
                  try {
                    const coords = getCoordinates(n);
                    return `(${coords.x}, ${coords.y})`;
                  } catch (error) {
                    return t.error || "오류";
                  }
                })()}
              </span>
            </div>
          </div>

          {/* Playground: (x, y) → n */}
          <div className="mt-2 p-3 bg-white/5 rounded border border-white/10">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="text-white/80 whitespace-nowrap">(x, y) → n:</span>
              <input
                type="number"
                value={xInput}
                onChange={(e) => setXInput((e.target as HTMLInputElement).value)}
                className="w-16 px-2 py-1 bg-black border border-white/20 rounded text-white text-xs focus:outline-none focus:border-white/40"
                placeholder="2"
              />
              <span className="text-white/60">,</span>
              <input
                type="number"
                value={yInput}
                onChange={(e) => setYInput((e.target as HTMLInputElement).value)}
                className="w-16 px-2 py-1 bg-black border border-white/20 rounded text-white text-xs focus:outline-none focus:border-white/40"
                placeholder="3"
              />
              <span className="text-white/60">→</span>
              <span className="font-mono text-white">
                {(() => {
                  const x = parseInt(xInput);
                  const y = parseInt(yInput);
                  if (isNaN(x) || isNaN(y)) return "—";
                  if (!getNFromCoordinates) return "—";
                  try {
                    const n = getNFromCoordinates(x, y);
                    return `${n}`;
                  } catch (error) {
                    return t.error || "오류";
                  }
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}