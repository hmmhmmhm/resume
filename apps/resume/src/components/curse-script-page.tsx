import { useState } from "react";
import { Wand2 } from "lucide-react";
import CircularText from "./circular-text";
import CurseScriptCounter from "./curse-script-counter";
import { ScrollVelocity } from "./scroll-velocity";
import LetterGlitch from "./letter-glitch";

interface CurseScriptPageProps {
  lang?: string;
  translations?: any;
}

export default function CurseScriptPage({ lang = "en", translations = {} }: CurseScriptPageProps) {
  const isKorean = lang === "ko";
  const [selectedPM, setSelectedPM] = useState<string>("npm");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [copiedExample, setCopiedExample] = useState<boolean>(false);
  
  // Helper function to get translation with fallback
  const t = (key: string, fallbackKo: string, fallbackEn: string) => {
    return translations[key] || (isKorean ? fallbackKo : fallbackEn);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col-reverse lg:flex-row">
      <div
        className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 pb-24 font-mono relative z-10 overflow-y-auto overflow-x-hidden bg-black text-[#dc143c]"
      >

        {/* Header */}
        <div className="mb-8 lg:mb-12 relative z-20">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 flex items-center gap-3">
            <Wand2 className="w-8 h-8 sm:w-10 sm:h-10" />
            Curse Script
          </h1>
          <p className="text-base sm:text-lg opacity-80">{t('subtitle', '코드를 주문과 같은 난독화된 문법으로 변환', 'Transform code into spell-like obfuscated syntax')}</p>
        </div>

        {/* Introduction */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <p className="text-sm sm:text-base leading-relaxed opacity-90">
            {t('introduction', 'Curse Script는 코드를 주문과 같은 문법으로 변환하는 JavaScript 난독화 도구입니다. 표준 JavaScript를 마법적인 주문과 신비로운 기호를 사용하는 난해한 형식으로 변환하여 코드를 보호하고 재미있게 만듭니다.', 'Curse Script is a JavaScript obfuscation tool that transforms your code into spell-like syntax. It converts standard JavaScript into an esoteric format using magical incantations and mystical symbols, making your code both protected and entertaining.')}
          </p>
        </div>

        {/* Interactive Counter */}
        <CurseScriptCounter isDarkMode={true} translations={translations} lang={lang} />

        {/* Features Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('features', '특징', 'Features')}</h2>
          <div className="space-y-2 text-xs sm:text-sm relative z-20">
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature1', '<strong>다양한 문자 세트</strong>: 룬 문자, 고대 페르시아어, 이모지 또는 사용자 정의 문자', '<strong>Multiple Character Sets</strong>: Runic, Old Persian, Emoji, or custom characters') }} />
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature2', '<strong>완전한 난독화</strong>: JavaScript를 읽을 수 없지만 실행 가능한 코드로 변환', '<strong>Full Obfuscation</strong>: Converts JavaScript into unreadable but executable code') }} />
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature3', '<strong>TypeScript 지원</strong>: 완전한 타입 정의 포함', '<strong>TypeScript Support</strong>: Complete type definitions included') }} />
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature4', '<strong>사용자 정의 문자</strong>: 난독화에 모든 유니코드 문자 사용 가능', '<strong>Custom Characters</strong>: Use any Unicode characters for obfuscation') }} />
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature5', '<strong>실행 가능한 출력</strong>: 생성된 코드는 모든 JavaScript 환경에서 실행됨', '<strong>Executable Output</strong>: Generated code runs in any JavaScript environment') }} />
            </div>
          </div>
        </div>

        {/* Random Encoded Texts */}
        <div className="mb-6 lg:mb-10 relative z-20 overflow-hidden">
          <ScrollVelocity
            texts={["𐎠𐎡𐎢𐎣𐎤𐎥𐎦𐎧𐎨𐎩𐎪𐎫𐎬𐎭𐎮𐎯𐎰𐎱𐎲𐎳𐎴𐎵𐎶𐎷", "𐎠𐎡𐎢𐎣𐎤𐎥𐎦𐎧𐎨𐎩𐎪𐎫𐎬𐎭𐎮𐎯𐎰𐎱𐎲𐎳𐎴𐎵𐎶𐎷"]}
            velocity={30}
            className="gradient-text font-bold text-2xl"
            numCopies={4}
            damping={50}
            stiffness={400}
            velocityMapping={{ input: [0, 1000], output: [0, 1.5] }}
            parallaxClassName=""
          />
        </div>

        {/* Installation */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('installation', '설치', 'Installation')}</h2>
          <div className="flex gap-2 mb-3 relative z-20 flex-wrap">
            {["npm", "pnpm", "yarn"].map((pm) => (
              <button
                key={pm}
                onClick={() => setSelectedPM(pm)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${selectedPM === pm
                  ? "bg-white/10 text-[#dc143c]"
                  : "opacity-50 hover:opacity-70"
                  }`}
              >
                {pm}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between p-3 sm:p-4 rounded text-xs sm:text-sm relative z-20 bg-white/5">
            <code className="break-all overflow-hidden text-ellipsis flex-1 min-w-0">
              {selectedPM === "npm" && "npm install curse-script"}
              {selectedPM === "pnpm" && "pnpm add curse-script"}
              {selectedPM === "yarn" && "yarn add curse-script"}
            </code>
            <button
              onClick={() => {
                const commands = {
                  npm: "npm install curse-script",
                  pnpm: "pnpm add curse-script",
                  yarn: "yarn add curse-script"
                };
                navigator.clipboard.writeText(commands[selectedPM as keyof typeof commands]);
                setCopiedInstall(true);
                setTimeout(() => setCopiedInstall(false), 2000);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/10"
              title={t('copyTitle', '복사', 'Copy')}
            >
              {copiedInstall ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{t('copied', '복사됨!', 'Copied!')}</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{t('copy', '복사', 'Copy')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('usageExample', '사용 예시', 'Usage Example')}</h2>
          <div className="p-3 sm:p-4 rounded text-xs sm:text-sm space-y-3 relative z-20 overflow-x-auto bg-white/5 flex items-start justify-between flex-col sm:flex-row sm:items-center text-white">
            <div className="flex-1 space-y-3">
              <div>
                <code className="block whitespace-nowrap mb-1">
                  <span style={{ color: '#DC143C' }}>import</span>
                  {' { '}
                  <span style={{ color: '#FF6B6B' }}>curse</span>
                  {' } '}
                  <span style={{ color: '#DC143C' }}>from</span>
                  {' '}
                  <span style={{ color: '#FF4444' }}>'curse-script'</span>
                  {';'}
                </code>
              </div>
              <div className="pt-2">
                <div className="opacity-60 mb-1">{t('defaultComment', '// 기본: 룬 문자 사용', '// Default: uses Runic characters')}</div>
                <code className="block whitespace-nowrap">
                  <span style={{ color: '#DC143C' }}>const</span>
                  {' '}
                  <span style={{ color: '#FF8888' }}>cursed</span>
                  {' = '}
                  <span style={{ color: '#FF6B6B' }}>curse</span>
                  {'('}
                  <span style={{ color: '#FF4444' }}>'console.log("Hello")'</span>
                  {');'}
                </code>
              </div>
              <div className="pt-2">
                <div className="opacity-60 mb-1">{t('oldPersianComment', '// 고대 페르시아 문자 사용', '// Use Old Persian characters')}</div>
                <code className="block whitespace-nowrap">
                  <span style={{ color: '#DC143C' }}>const</span>
                  {' '}
                  <span style={{ color: '#FF8888' }}>cursedPersian</span>
                  {' = '}
                  <span style={{ color: '#FF6B6B' }}>curse</span>
                  {'('}
                  <span style={{ color: '#FF4444' }}>'alert(1)'</span>
                  {', { '}
                  <span style={{ color: '#FF8888' }}>characterSet</span>
                  {': '}
                  <span style={{ color: '#FF4444' }}>'oldPersian'</span>
                  {' });'}
                </code>
              </div>
            </div>
            <button
              onClick={() => {
                const codeExample = `import { curse } from 'curse-script';

// Default: uses Runic characters
const cursed = curse('console.log("Hello")');

// Use Old Persian characters
const cursedPersian = curse('alert(1)', { characterSet: 'oldPersian' });`;
                navigator.clipboard.writeText(codeExample);
                setCopiedExample(true);
                setTimeout(() => setCopiedExample(false), 2000);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/10 flex-shrink-0 mt-3 sm:mt-0"
              title={t('copyTitle', '복사', 'Copy')}
            >
              {copiedExample ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{t('copied', '복사됨!', 'Copied!')}</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{t('copy', '복사', 'Copy')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('howItWorks', '작동 원리', 'How It Works')}</h2>
          <div className="space-y-6 text-xs sm:text-sm relative z-20">
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{t('characterSetOptions', '문자 세트 옵션', 'Character Set Options')}</h3>
              <div className="space-y-2 opacity-90">
                <p><strong>{t('runic', '룬 문자', 'Runic')}</strong>: {t('runicDesc', '신비로운 난독화를 위해 고대 룬 문자(ᚠ-ᚷ) 사용', 'Uses ancient Runic characters (ᚠ-ᚷ) for mystical obfuscation')}</p>
                <p><strong>{t('oldPersian', '고대 페르시아', 'Old Persian')}</strong>: {t('oldPersianDesc', '고대 코드 미학을 위해 쐐기 문자(𐎠-𐎷) 사용', 'Employs cuneiform script (𐎠-𐎷) for ancient code aesthetics')}</p>
                <p><strong>{t('emoji', '이모지', 'Emoji')}</strong>: {t('emojiDesc', '재미있는 난독화를 위해 코드를 이모지 시퀀스(😀-😗)로 변환', 'Transforms code into emoji sequences (😀-😗) for playful obfuscation')}</p>
                <p><strong>{t('none', '없음', 'None')}</strong>: {t('noneDesc', '특수 문자 없이 기본 난독화를 위해 라틴 문자(A-X) 사용', 'Uses Latin characters (A-X) for basic obfuscation without special characters')}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{t('customCharacterSets', '사용자 정의 문자 세트', 'Custom Character Sets')}</h3>
              <div className="space-y-2 opacity-90">
                <p>{t('customCharacterSetsDesc1', '최소 24개의 고유한 유니코드 문자로 구성된 배열을 제공할 수 있습니다.', 'You can provide your own array of at least 24 unique Unicode characters.')}</p>
                <p>{t('customCharacterSetsDesc2', '문자는 순서대로 변수 A-X에 매핑되어 완전한 사용자 정의가 가능합니다.', 'The characters will map to variables A-X in order, allowing complete customization.')}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{t('obfuscationProcess', '난독화 과정', 'Obfuscation Process')}</h3>
              <div className="space-y-2 opacity-90">
                <p dangerouslySetInnerHTML={{ __html: t('obfuscationProcessDesc1', '단순히 식별자 이름을 바꾸거나 문자열을 gzip으로 압축하는 기존 난독화 도구와 달리, Curse Script는 모든 조각을 코드 골프 방식으로 압축하여 페이로드에 원본 프로그램의 읽을 수 있는 흔적이 남지 않도록 합니다.', 'Unlike conventional obfuscators that simply rename identifiers or gzip strings, Curse Script code-golfs every fragment so the payload contains no legible traces of the original program.') }} />
                <p dangerouslySetInnerHTML={{ __html: t('obfuscationProcessDesc2', "프렐루드는 <code>A = ''</code>와 같은 최소한의 할당으로 시작한 다음 강제 변환을 남용하여(예: <code>B = !A + A</code>, <code>D = A + { }</code>) <code>\"true\"</code>, <code>\"false\"</code>, <code>\"[object Object]\"</code>와 같은 단어를 직접 입력하지 않고 추출합니다.", "The prelude starts with minimal assignments like <code>A = ''</code> and then abuses coercion (e.g., <code>B = !A + A</code>, <code>D = A + { }</code>) to mine words such as <code>\"true\"</code>, <code>\"false\"</code>, and <code>\"[object Object]\"</code> without ever typing them directly.") }} />
                <p dangerouslySetInnerHTML={{ __html: t('obfuscationProcessDesc3', '수집된 부분 문자열은 재결합되어 중요한 토큰을 합성합니다: <code>E = B[A++]</code>는 문자 "t"를 추출하고, <code>I = D[G+H]</code>는 "constructor"를 드러내며, 이를 <code>J(...)</code> 안에 쌓으면 부작용만으로 <code>Function</code> 생성자에 대한 참조를 생성합니다.', 'Those harvested substrings are recombined to synthesize critical tokens: <code>E = B[A++]</code> plucks the letter "t", <code>I = D[G+H]</code> reveals "constructor", and stacking them inside <code>J(...)</code> produces a reference to the <code>Function</code> constructor entirely through side effects.') }} />
                <p dangerouslySetInnerHTML={{ __html: t('obfuscationProcessDesc4', '각 소스 문자는 이러한 골프 변수를 통해 재표현됩니다—일반적인 글리프는 조회 테이블에서 가져오고, 나머지는 천체 기호의 서로게이트 쌍도 처리하는 유니코드 이스케이프 표현식을 통해 필요에 따라 재구성됩니다.', 'Each source character is re-expressed via these golfed variables—common glyphs come from a lookup table, while the rest are rebuilt on demand through Unicode escape expressions that even handle surrogate pairs for astral symbols.') }} />
                <p dangerouslySetInnerHTML={{ __html: t('obfuscationProcessDesc5', '모든 조각은 <code>J(... )();</code>로 연결되어 합성된 <code>Function</code>을 호출합니다; 최종 패스는 선택적으로 변수 <code>A</code>–<code>X</code>를 룬 문자, 고대 페르시아어, 이모지 또는 사용자 정의 글리프로 다시 매핑하여 스크립트를 실행 가능하게 유지하면서 주문과 같은 모양을 확정합니다.', 'All pieces are concatenated into <code>J(... )();</code>, invoking the synthesized <code>Function</code>; the final pass optionally remaps variables <code>A</code>–<code>X</code> to Runic, Old Persian, emoji, or custom glyphs, cementing the spell-like appearance while keeping the script executable.') }} />
              </div>
            </div>
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
              {t('github', 'GitHub', 'GitHub')}
            </a>
            <a
              href="https://deepwiki.com/hmmhmmhm/node-packages"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              {t('wiki', 'Wiki', 'Wiki')}
            </a>
            <a
              href="https://www.npmjs.com/package/curse-script"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
              </svg>
              {t('npm', 'NPM', 'NPM')}
            </a>
          </div>
          <div className="mt-4 text-xs opacity-60 relative z-20">
            {t('license', 'MIT License © hmmhmmhm', 'MIT License © hmmhmmhm')}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:flex-1 relative h-[250px] sm:h-[300px] lg:h-auto overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
            glitchColors={[
              "#8B0000", "#DC143C", "#FF0000", "#B22222", "#8B0000", "#DC143C"
              // "#ff5c7a",
            ]}
            characters="+𐎠𐎡𐎢𐎣𐎤𐎥𐎦,='𐎧𐎨𐎩𐎪𐎫𐎬𐎭𐎮𐎯𐎰𐎱𐎲𐎳𐎴𐎵𐎶𐎷+"
          />
        </div>
        {/* Mobile: absolute positioned within right panel */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-40 h-40 sm:w-48 sm:h-48 z-20 mix-blend-difference lg:hidden">
          <CircularText
            text="CURSE CODE * CURSE CODE * CURSE CODE * CURSE CODE * "
            onHover="speedUp"
            spinDuration={20}
            className="text-xs sm:text-sm font-mono font-black text-[brown]"
          />
        </div>
      </div>

      {/* Desktop: fixed floating at bottom right */}
      <div className="hidden lg:block fixed bottom-12 right-12 w-56 h-56 z-50 mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <CircularText
            text="CURSE CODE * CURSE CODE * CURSE CODE * CURSE CODE * "
            onHover="speedUp"
            spinDuration={20}
            className="text-base font-mono font-black text-[brown]"
          />
        </div>
      </div>
    </div>
  );
}
