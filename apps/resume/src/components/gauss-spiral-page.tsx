import { useState } from "react";
import { getCoordinates, getNFromCoordinates } from "gauss-spiral";
import SpiralViewer from "./spiral-viewer";
import CircularText from "./circular-text";
import FaultyTerminal from "./faulty-terminal";

export default function GaussSpiralPage() {
  const [selectedPM, setSelectedPM] = useState<string>("npm");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [copiedExample, setCopiedExample] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col-reverse lg:flex-row">
      <div
        className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 font-mono relative z-10 overflow-y-auto overflow-x-hidden bg-black text-white"
      >
        {/* Header */}
        <div className="mb-8 lg:mb-12 relative z-20">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 flex items-center gap-3">
            Gauss Spiral
          </h1>
        </div>

        {/* Introduction */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <p className="text-sm sm:text-base leading-relaxed opacity-90">
            나선형으로 회전하며 픽셀을 채우는 효율적인 좌표 시스템의 좌표를 계산합니다. 매우 큰 좌표 경우에도 (x, y) ↔ n을 빠르게 계산합니다
            O(√m) 및, O(log m) 의 효율을 가지며, GIS, 드론, 렌더링 최적화 등 다양한 분야에 활용될 수 있습니다.
          </p>
        </div>

        {/* Interactive Spiral Viewer */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <SpiralViewer getCoordinates={getCoordinates} getNFromCoordinates={getNFromCoordinates} />
        </div>

        {/* Analogy Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">설명</h2>
          <div className="space-y-2 text-xs sm:text-sm opacity-90">
            <p>중심 픽셀 (0, 0)에서 시작하여 바깥쪽으로 확장하면서 점을 그려 원이 빈틈없이 채워지는 것을 상상해보세요. 이 라이브러리는 다음 사항을 계산할 수 있습니다:</p>
            <ul className="list-none space-y-1 ml-4">
              <li>• 점의 좌표 (x, y)가 주어지면, 정확히 몇 번째 턴 n에 배치되었는지</li>
              <li>• 단계 n이 주어지면, 다음에 그릴 정확한 좌표 (x, y)</li>
            </ul>
            <p className="pt-2">픽셀 플로팅, 파티클 시스템, 절차적 아트 또는 중심에서 바깥으로 확장하는 결정론적 나선 채우기가 필요한 모든 시각화에 유용합니다.</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">특징</h2>
          <div className="space-y-2 text-xs sm:text-sm relative z-20">
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>결정론적 매핑</strong>: 모든 격자점에 대해 안정적이고 재현 가능한 순서</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>양방향 변환</strong>: (x, y) → n 및 n → (x, y) 모두 변환 가능</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>기하학 우선</strong>: 간단한 산술과 atan2 정렬, 복잡한 정수론 불필요</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>점진적 렌더링 친화적</strong>: 점진적 렌더링이나 스트리밍 업데이트에 적합</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>링 샘플링</strong>: 효과 및 배칭을 위해 반경 링별로 점을 쉽게 반복</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>의존성 제로</strong>: 순수 TypeScript/JavaScript, 작은 번들 크기</span>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">설치</h2>
          <div className="flex gap-2 mb-3 relative z-20 flex-wrap">
            {["npm", "pnpm", "yarn"].map((pm) => (
              <button
                key={pm}
                onClick={() => setSelectedPM(pm)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${selectedPM === pm
                  ? "bg-white/10 text-white"
                  : "opacity-50 hover:opacity-70"
                  }`}
              >
                {pm}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between p-3 sm:p-4 rounded text-xs sm:text-sm relative z-20 bg-white/5">
            <code className="break-all overflow-hidden text-ellipsis flex-1 min-w-0">
              {selectedPM === "npm" && "npm install gauss-spiral"}
              {selectedPM === "pnpm" && "pnpm add gauss-spiral"}
              {selectedPM === "yarn" && "yarn add gauss-spiral"}
            </code>
            <button
              onClick={() => {
                const commands = {
                  npm: "npm install gauss-spiral",
                  pnpm: "pnpm add gauss-spiral",
                  yarn: "yarn add gauss-spiral"
                };
                navigator.clipboard.writeText(commands[selectedPM as keyof typeof commands]);
                setCopiedInstall(true);
                setTimeout(() => setCopiedInstall(false), 2000);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/10"
              title="복사"
            >
              {copiedInstall ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>복사됨!</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>복사</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">사용 예시</h2>
          <div className="p-3 sm:p-4 rounded text-xs sm:text-sm space-y-3 relative z-20 overflow-x-auto bg-white/5 flex items-start justify-between flex-col sm:flex-row sm:items-center">
            <div className="flex-1 space-y-3">
              <div>
                <code className="block whitespace-nowrap mb-1">
                  <span style={{ color: '#C586C0' }}>import</span>
                  {' { '}
                  <span style={{ color: '#DCDCAA' }}>getNFromCoordinates</span>
                  {', '}
                  <span style={{ color: '#DCDCAA' }}>getCoordinates</span>
                  {' } '}
                  <span style={{ color: '#C586C0' }}>from</span>
                  {' '}
                  <span style={{ color: '#CE9178' }}>'gauss-spiral'</span>
                  {';'}
                </code>
              </div>
              <div className="pt-2">
                <div className="opacity-60 mb-1">// (x, y)에서 n 구하기</div>
                <code className="block whitespace-nowrap">
                  <span style={{ color: '#C586C0' }}>const</span>
                  {' '}
                  <span style={{ color: '#9CDCFE' }}>n</span>
                  {' = '}
                  <span style={{ color: '#DCDCAA' }}>getNFromCoordinates</span>
                  {'('}
                  <span style={{ color: '#B5CEA8' }}>2</span>
                  {', '}
                  <span style={{ color: '#B5CEA8' }}>3</span>
                  {');'}
                </code>
              </div>
              <div className="pt-2">
                <div className="opacity-60 mb-1">// n에서 (x, y) 구하기</div>
                <code className="block whitespace-nowrap">
                  <span style={{ color: '#C586C0' }}>const</span>
                  {' '}
                  <span style={{ color: '#9CDCFE' }}>coords</span>
                  {' = '}
                  <span style={{ color: '#DCDCAA' }}>getCoordinates</span>
                  {'('}
                  <span style={{ color: '#B5CEA8' }}>10</span>
                  {');'}
                </code>
              </div>
            </div>
            <button
              onClick={() => {
                const codeExample = `import { getNFromCoordinates, getCoordinates } from 'gauss-spiral';

// (x, y)에서 n 구하기
const n = getNFromCoordinates(2, 3);

// n에서 (x, y) 구하기
const coords = getCoordinates(10);`;
                navigator.clipboard.writeText(codeExample);
                setCopiedExample(true);
                setTimeout(() => setCopiedExample(false), 2000);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/10 flex-shrink-0 mt-3 sm:mt-0"
              title="복사"
            >
              {copiedExample ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>복사됨!</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>복사</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Practical Examples */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">실용적인 예시</h2>
          <div className="space-y-6 text-xs sm:text-sm relative z-20">
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">시각 효과 / 렌더링</h3>
              <div className="space-y-2 opacity-90">
                <p>점진적 방사형 표시, 나선형 파티클 방출, 후광 확장 효과</p>
                <p>n = 1..N을 반복하고 getCoordinates(n)을 플롯하여 x² + y²가 반경을 초과하면 중지</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">GIS / 지도 타일링</h3>
              <div className="space-y-2 opacity-90">
                <p>중심 타일 (cx, cy) 주변의 타일을 나선 순서로 우선 가져와 체감 반응성을 극대화</p>
                <p>getCoordinates(n)을 (cx, cy)의 오프셋으로 사용</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">게임 / 청크 가시성 및 로딩</h3>
              <div className="space-y-2 opacity-90">
                <p>플레이어 주변의 청크를 원형 우선 방식으로 로드하여 다이아몬드 또는 사각형 모양의 아티팩트 방지</p>
                <p>getCoordinates(n)으로 로딩 순서를 계산하거나 getNFromCoordinates(dx, dy)를 통해 알려진 청크에 우선순위 할당</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">작동 원리</h2>
          <div className="space-y-6 text-xs sm:text-sm relative z-20">
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">문제 정의</h3>
              <div className="space-y-2 opacity-90">
                <p>원점에서 바깥쪽으로 점점 커지는 나선으로 정수 점을 플로팅할 때:</p>
                <ul className="list-none space-y-1 ml-4">
                  <li>• 주어진 (x, y)에 대한 n (방문 인덱스) 결정</li>
                  <li>• 주어진 n에 대한 (x, y) (단계 n에서 방문한 좌표) 결정</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">접근 방식</h3>
              <div className="space-y-2 opacity-90">
                <p>제곱 반경 m = x² + y²로 점을 그룹화합니다 (동심원 "링"). 각 링 내에서 점들은 시계 방향으로 극각 atan2(y, x)로 정렬됩니다.</p>
                <p>전역 인덱스 n은 더 작은 m을 가진 모든 점의 누적 개수와 현재 링 내 위치의 합입니다.</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">알고리즘 개요</h3>
              <div className="space-y-2 opacity-90">
                <p><strong>링</strong>: 각 정수 m ≥ 0에 대해 링은 x² + y² = m의 모든 정수 해를 포함</p>
                <p><strong>링 내 순서</strong>: atan2(y, x) 내림차순(시계방향)으로 해를 정렬</p>
                <p><strong>전역 인덱스</strong>: S(m)을 x² + y² ≤ m인 정수 점의 개수라 하면, x² + y² = m인 (x, y)에 대해 n = S(m-1) + k (k는 링에서의 1기반 위치)</p>
                <p><strong>역변환 (n → (x, y))</strong>: S(m) ≥ n인 최소 m을 이진 탐색하고, k = n - S(m-1)로 설정하여 위와 같이 정렬된 링의 k번째 점 반환</p>
              </div>
            </div>
          </div>
        </div>

        {/* API Documentation */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">API</h2>
          <div className="space-y-4 text-xs sm:text-sm relative z-20">
            <div className="p-4 bg-white/5 rounded">
              <code className="text-sm font-semibold text-[#DCDCAA]">getNFromCoordinates(x: number, y: number): number</code>
              <p className="mt-2 opacity-90">나선 열거에서 (x, y)의 1기반 방문 인덱스 n을 반환합니다.</p>
            </div>
            <div className="p-4 bg-white/5 rounded">
              <code className="text-sm font-semibold text-[#DCDCAA]">getCoordinates(n: number): {'{ x: number; y: number }'}</code>
              <p className="mt-2 opacity-90">단계 n에서 방문한 격자 좌표를 반환합니다. (n은 0보다 커야 함)</p>
            </div>
          </div>
        </div>

        {/* Performance Notes */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">성능 참고사항</h2>
          <div className="space-y-2 text-xs sm:text-sm opacity-90">
            <p>• S(m) 카운팅은 대칭을 사용하여 x당 격자점을 집계하는 O(√m)으로 구현됩니다</p>
            <p>• n → (x, y)는 초기 추측 주변의 m에 대한 이진 탐색을 사용한 다음 해당 m에 대한 링 점만 정렬합니다</p>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="pt-8 border-t border-current/10 relative z-20">
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm relative z-20">
            <a
              href="https://github.com/hmmhmmhm/node-packages"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/gauss-spiral"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
              </svg>
              NPM
            </a>
          </div>
          <div className="mt-4 text-xs opacity-60 relative z-20">
            MIT License © hmmhmmhm
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative h-[250px] sm:h-[300px] lg:h-auto lg:min-h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black">
          <FaultyTerminal
            scale={4}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#ffffff"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
        </div>
        {/* Mobile: absolute positioned within right panel */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-40 h-40 sm:w-48 sm:h-48 z-20 mix-blend-difference lg:hidden">
          <CircularText
            text="GAUSS SPIRAL * 가우스 나선 * GAUSS SPIRAL * 가우스 나선 * "
            onHover="speedUp"
            spinDuration={20}
            className="text-xs sm:text-sm font-mono font-black text-white"
          />
        </div>
      </div>

      {/* Desktop: fixed floating at bottom right */}
      <div className="hidden lg:block fixed bottom-12 right-12 w-56 h-56 z-50 mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <CircularText
            text="GAUSS SPIRAL * 가우스 나선 * GAUSS SPIRAL * 가우스 나선 * "
            onHover="speedUp"
            spinDuration={20}
            className="text-base font-mono font-black text-white"
          />
        </div>
      </div>
    </div>
  );
}
