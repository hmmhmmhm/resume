import { useState, useMemo } from "react";
import { Shuffle, Link2, Lock, Shield, Ticket } from "lucide-preact";
import CircularText from "./circular-text";
import { ScrollVelocity } from "./scroll-velocity";
import Ballpit from "./ballpit";
import PseudoShuffleCounter from "./pseudo-shuffle-counter";

interface PseudoShufflePageProps {
  lang?: string;
}

export default function PseudoShufflePage({ lang = "ko" }: PseudoShufflePageProps) {
  const isKorean = lang === "ko";
  const [selectedPM, setSelectedPM] = useState<string>("npm");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [copiedExample, setCopiedExample] = useState<boolean>(false);

  // Generate random numbers for scroll velocity
  const randomTexts = useMemo(() => {
    const texts: string[] = [];
    for (let line = 0; line < 2; line++) {
      const numbers: string[] = [];
      for (let i = 0; i < 20; i++) {
        const randomNum = Math.floor(Math.random() * 1000);
        numbers.push(randomNum.toString());
      }
      texts.push(numbers.join(' '));
    }
    return texts;
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Mobile: Ballpit section */}
      <div className="lg:hidden w-full h-[250px] sm:h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black">
          <Ballpit
            count={40}
            gravity={0}
            friction={0.98}
            wallBounce={0.85}
            followCursor={false}
            colors={["#ff3333", "#ff6666", "#ff9999", "#ffcccc", "#ffffff"]}
            ambientColor="#1a1a2e"
            pointColor="#ffcccc"
            lightIntensity={50}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div
          className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 pb-24 font-mono relative z-10 overflow-x-hidden bg-black text-white"
        >

        {/* Header */}
        <div className="mb-8 lg:mb-12 relative z-20">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 flex items-center gap-3">
            <Shuffle className="w-8 h-8 sm:w-10 sm:h-10" />
            Pseudo Shuffle
          </h1>
          <p className="text-base sm:text-lg opacity-80">{isKorean ? "FPE 동형암호화 기반 유사난수 셔플 라이브러리" : "FPE-based Pseudo-Random Shuffle Library"}</p>
        </div>

        {/* Introduction */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <p className="text-sm sm:text-base leading-relaxed opacity-90">
            {isKorean 
              ? "Pseudo Shuffle은 FPE(Format-Preserving Encryption) 동형암호화 알고리즘을 활용하여 매우 큰 범위의 인덱스를 실제로 섞지 않고도 섞인 것처럼 보이게 만드는 TypeScript 라이브러리입니다. DB나 메모리를 사용하지 않고도 유사난수 개념으로 겹치지 않는 셔플된 인덱스를 즉시 계산할 수 있습니다."
              : "Pseudo Shuffle is a TypeScript library that uses FPE (Format-Preserving Encryption) to make indices appear shuffled without actually shuffling them. It instantly calculates non-overlapping shuffled indices using pseudo-random concepts without DB or memory."}
          </p>
        </div>

        {/* Interactive Counter */}
        <PseudoShuffleCounter isDarkMode={true} lang={lang} />

        {/* Installation */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{isKorean ? "설치" : "Installation"}</h2>
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
              {selectedPM === "npm" && "npm install pseudo-shuffle"}
              {selectedPM === "pnpm" && "pnpm add pseudo-shuffle"}
              {selectedPM === "yarn" && "yarn add pseudo-shuffle"}
            </code>
            <button
              onClick={() => {
                const commands = {
                  npm: "npm install pseudo-shuffle",
                  pnpm: "pnpm add pseudo-shuffle",
                  yarn: "yarn add pseudo-shuffle"
                };
                navigator.clipboard.writeText(commands[selectedPM as keyof typeof commands]);
                setCopiedInstall(true);
                setTimeout(() => setCopiedInstall(false), 2000);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/10"
              title={isKorean ? "복사" : "Copy"}
            >
              {copiedInstall ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{isKorean ? "복사됨!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{isKorean ? "복사" : "Copy"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{isKorean ? "특징" : "Features"}</h2>
          <div className="space-y-2 text-xs sm:text-sm relative z-20">
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>{isKorean ? "FPE 암호화" : "FPE Encryption"}</strong>: {isKorean ? "Format-Preserving Encryption으로 안전한 셔플" : "Secure shuffle with Format-Preserving Encryption"}</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>{isKorean ? "메모리 효율" : "Memory Efficient"}</strong>: {isKorean ? "DB나 배열 없이 즉시 계산" : "Instant calculation without DB or arrays"}</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>{isKorean ? "충돌 방지" : "Collision-Free"}</strong>: {isKorean ? "같은 범위 내에서 절대 겹치지 않음" : "Never overlaps within the same range"}</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>{isKorean ? "양방향 변환" : "Bidirectional"}</strong>: {isKorean ? "인코딩/디코딩 모두 지원" : "Supports both encoding and decoding"}</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>{isKorean ? "TypeScript 지원" : "TypeScript Support"}</strong>: {isKorean ? "완전한 타입 정의 제공" : "Complete type definitions provided"}</span>
            </div>
          </div>
        </div>

        {/* Random Texts */}
        <div className="mb-6 lg:mb-10 relative z-20 overflow-hidden pointer-events-none">
          <style>{`
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .gradient-text {
              background: linear-gradient(90deg, 
                #ffaa40 0%, 
                #ff8866 12.5%, 
                #ff66aa 25%, 
                #cc66ff 37.5%, 
                #9c40ff 50%, 
                #cc66ff 62.5%, 
                #ff66aa 75%, 
                #ff8866 87.5%, 
                #ffaa40 100%
              );
              background-size: 400% 100%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradient-shift 8s linear infinite;
            }
          `}</style>
          <ScrollVelocity
            texts={['PSEUDO-SHUFFLE PSEUDO-SHUFFLE PSEUDO-SHUFFLE PSEUDO-SHUFFLE', 'PSEUDO-SHUFFLE PSEUDO-SHUFFLE PSEUDO-SHUFFLE PSEUDO-SHUFFLE']}
            velocity={30}
            className="gradient-text font-bold text-2xl"
            numCopies={4}
            damping={50}
            stiffness={400}
            velocityMapping={{ input: [0, 1000], output: [0, 1.5] }}
            parallaxClassName=""
          />
        </div>

        {/* Use Cases Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{isKorean ? "활용 사례" : "Use Cases"}</h2>
          <div className="space-y-3 text-xs sm:text-sm relative z-20">
            <div className="p-3 sm:p-4 rounded bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2 text-[#ff5c7a] flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                {isKorean ? "단축 URL 생성" : "Short URL Generation"}
              </h3>
              <p className="opacity-90">{isKorean ? "DB 없이 순차적인 ID를 무작위로 보이는 짧은 URL로 변환. 예측 불가능하면서도 충돌 없는 단축 링크 생성" : "Convert sequential IDs to random-looking short URLs without DB. Generate unpredictable yet collision-free short links"}</p>
            </div>
            <div className="p-3 sm:p-4 rounded bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2 text-[#8a5cff] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                {isKorean ? "유저 번호 암호화" : "User ID Encryption"}
              </h3>
              <p className="opacity-90">{isKorean ? "순차적인 유저 ID를 암호화하여 노출. 길이가 변하지 않아 기존 시스템과 호환성 유지" : "Encrypt sequential user IDs for exposure. Maintains compatibility with existing systems as length doesn't change"}</p>
            </div>
            <div className="p-3 sm:p-4 rounded bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2 text-[#00ffd1] flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {isKorean ? "개인정보 보호" : "Privacy Protection"}
              </h3>
              <p className="opacity-90">{isKorean ? "주민번호, 전화번호 등 고정 길이 데이터를 형식 유지하며 암호화. FPE 특성으로 원본 형식 그대로 보호" : "Encrypt fixed-length data like SSN and phone numbers while preserving format. Protects original format with FPE characteristics"}</p>
            </div>
            <div className="p-3 sm:p-4 rounded bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2 text-[#ffd700] flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                {isKorean ? "쿠폰/티켓 번호" : "Coupon/Ticket Numbers"}
              </h3>
              <p className="opacity-90">{isKorean ? "순차 발급되는 쿠폰 번호를 무작위처럼 보이게 변환. 발급 순서 추측 방지 및 보안 강화" : "Convert sequentially issued coupon numbers to appear random. Prevents guessing issuance order and enhances security"}</p>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{isKorean ? "사용 예시" : "Usage Example"}</h2>
          <div className="p-3 sm:p-4 rounded text-xs sm:text-sm space-y-3 relative z-20 overflow-x-auto bg-white/5">
            <div className="flex-1 space-y-3">
              <div>
                <code className="block whitespace-nowrap mb-1">
                  <span style={{ color: '#ff3366' }}>import</span>
                  {' { '}
                  <span style={{ color: '#ff6b9d' }}>encode</span>
                  {', '}
                  <span style={{ color: '#ff6b9d' }}>decode</span>
                  {' } '}
                  <span style={{ color: '#ff3366' }}>from</span>
                  {' '}
                  <span style={{ color: '#ffb3d9' }}>"pseudo-shuffle"</span>
                  {';'}
                </code>
              </div>
              <div className="pt-2">
                <div className="opacity-60 mb-1">{isKorean ? "// 인덱스 인코딩" : "// Encode index"}</div>
                <code className="block whitespace-nowrap">
                  <span style={{ color: '#ff3366' }}>const</span>
                  {' '}
                  <span style={{ color: '#ff99cc' }}>encoded</span>
                  {' = '}
                  <span style={{ color: '#ff6b9d' }}>encode</span>
                  {'({ '}
                  <span style={{ color: '#ff99cc' }}>min</span>
                  {': '}
                  <span style={{ color: '#ffccee' }}>0</span>
                  {', '}
                  <span style={{ color: '#ff99cc' }}>max</span>
                  {': '}
                  <span style={{ color: '#ffccee' }}>100</span>
                  {', '}
                  <span style={{ color: '#ff99cc' }}>index</span>
                  {': '}
                  <span style={{ color: '#ffccee' }}>3</span>
                  {' });'}
                </code>
                <code className="block opacity-60 whitespace-nowrap">// 29</code>
              </div>
              <div className="pt-2">
                <div className="opacity-60 mb-1">{isKorean ? "// 인덱스 디코딩" : "// Decode index"}</div>
                <code className="block whitespace-nowrap">
                  <span style={{ color: '#ff3366' }}>const</span>
                  {' '}
                  <span style={{ color: '#ff99cc' }}>decoded</span>
                  {' = '}
                  <span style={{ color: '#ff6b9d' }}>decode</span>
                  {'({ '}
                  <span style={{ color: '#ff99cc' }}>min</span>
                  {': '}
                  <span style={{ color: '#ffccee' }}>0</span>
                  {', '}
                  <span style={{ color: '#ff99cc' }}>max</span>
                  {': '}
                  <span style={{ color: '#ffccee' }}>100</span>
                  {', '}
                  <span style={{ color: '#ff99cc' }}>index</span>
                  {': '}
                  <span style={{ color: '#ff99cc' }}>encoded</span>
                  {' });'}
                </code>
                <code className="block opacity-60 whitespace-nowrap">// 3</code>
              </div>
            </div>
            <button
              onClick={() => {
                const codeExample = `import { encode, decode } from "pseudo-shuffle";

// 인덱스 인코딩
const encoded = encode({ min: 0, max: 100, index: 3 });
// 29

// 인덱스 디코딩
const decoded = decode({ min: 0, max: 100, index: encoded });
// 3`;
                navigator.clipboard.writeText(codeExample);
                setCopiedExample(true);
                setTimeout(() => setCopiedExample(false), 2000);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/10 flex-shrink-0 mt-3 sm:mt-0"
              title={isKorean ? "복사" : "Copy"}
            >
              {copiedExample ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{isKorean ? "복사됨!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{isKorean ? "복사" : "Copy"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{isKorean ? "작동 원리" : "How It Works"}</h2>
          <div className="space-y-6 text-xs sm:text-sm relative z-20">
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{isKorean ? "Pseudo Shuffle란?" : "What is Pseudo Shuffle?"}</h3>
              <div className="space-y-2 opacity-90">
                {isKorean ? (
                  <>
                    <p>실제로 데이터를 섞지 않고, 유사난수(Pseudo Random) 개념을 활용하여</p>
                    <p>주어진 범위 내에서 인덱스가 섞인 것처럼 보이게 만드는 기술입니다.</p>
                    <p>같은 인덱스는 항상 같은 값으로 변환되며, 충돌이 발생하지 않습니다.</p>
                  </>
                ) : (
                  <>
                    <p>A technique that makes indices appear shuffled within a given range</p>
                    <p>using pseudo-random concepts without actually shuffling the data.</p>
                    <p>The same index always converts to the same value with no collisions.</p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{isKorean ? "FPE 암호화" : "FPE Encryption"}</h3>
              <div className="space-y-2 opacity-90">
                {isKorean ? (
                  <>
                    <p>Format-Preserving Encryption을 사용하여 입력 형식을 유지하면서</p>
                    <p>암호화된 값을 생성합니다. 이를 통해 예측 불가능하면서도</p>
                    <p>결정론적인 셔플 결과를 얻을 수 있습니다.</p>
                  </>
                ) : (
                  <>
                    <p>Uses Format-Preserving Encryption to generate encrypted values</p>
                    <p>while maintaining the input format. This provides unpredictable yet</p>
                    <p>deterministic shuffle results.</p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{isKorean ? "주의사항" : "Precautions"}</h3>
              <div className="space-y-2 opacity-90">
                {isKorean ? (
                  <>
                    <p>⚠️ 진짜 난수가 아닌 유사난수입니다. 암호학적 보안이 필요한 경우 privateKey를 설정하세요.</p>
                    <p>⚠️ min과 max 값의 차이가 최소 4 이상이어야 셔플이 적용됩니다.</p>
                    <p>✅ 이 라이브러리는 node-fe1-fpe 라이브러리를 기반으로 만들어졌습니다.</p>
                  </>
                ) : (
                  <>
                    <p>⚠️ This is pseudo-random, not true random. Set a privateKey for cryptographic security.</p>
                    <p>⚠️ The difference between min and max must be at least 4 for shuffling to work.</p>
                    <p>✅ This library is based on the node-fe1-fpe library.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="pt-8 border-t border-current/10 relative z-20">
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm relative z-20">
            <a
              href="https://github.com/hmmhmmhm/pseudo-shuffle"
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
              href="https://www.npmjs.com/package/pseudo-shuffle"
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

      {/* Desktop: Ballpit as overlay */}
      <div className="hidden lg:block w-full lg:w-1/2 relative lg:h-auto lg:min-h-screen overflow-hidden z-0">
        <div className="absolute inset-0 w-full h-full bg-black pointer-events-none">
          <Ballpit
            count={40}
            gravity={0}
            friction={0.98}
            wallBounce={0.85}
            followCursor={false}
            colors={["#ff3333", "#ff6666", "#ff9999", "#ffcccc", "#ffffff"]}
            ambientColor="#1a1a2e"
            pointColor="#ffcccc"
            lightIntensity={50}
          />
        </div>
      </div>

      {/* Desktop: fixed floating at bottom right */}
      <div className="hidden lg:block fixed bottom-12 right-12 w-56 h-56 z-50 mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <CircularText
            text="PSEUDO-SHUFFLE * PSEUDO-SHUFFLE * "
            onHover="speedUp"
            spinDuration={20}
            className="text-base font-mono font-black text-white"
          />
        </div>
      </div>
      </div>
    </div>
  );
}
