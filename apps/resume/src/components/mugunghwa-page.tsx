import { useState, useMemo } from "react";
// import { Dithering } from "@paper-design/shaders-react";
import CircularText from "./circular-text";
import MugunghwaCounter from "./mugunghwa-counter";
import ColorBends from "./color-bends";
import { ScrollVelocity } from "./scroll-velocity";
import { encode } from "mugunghwa";
import { QRCodeSVG } from "./qrcode-react";

interface MugunghwaResumeProps {
  lang?: string;
  translations?: any;
}

export default function MugunghwaResume({ lang = "ko", translations = {} }: MugunghwaResumeProps) {
  const [selectedPM, setSelectedPM] = useState<string>("npm");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [copiedExample, setCopiedExample] = useState<boolean>(false);
  
  const isKorean = lang === "ko";
  
  // Helper function to get translation with fallback
  const t = (key: string, fallbackKo: string, fallbackEn: string) => {
    return translations[key] || (isKorean ? fallbackKo : fallbackEn);
  };

  // Generate random mugunghwa encoded texts
  const randomTexts = useMemo(() => {
    const texts: string[] = [];
    // Generate 2 lines, each with 10 different codes
    for (let line = 0; line < 2; line++) {
      const lineCodes: string[] = [];
      for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 1000000000000);
        const encoded = encode(randomNumber);
        if (encoded) {
          lineCodes.push(encoded.replace(/-/g, ' '));
        }
      }
      texts.push(lineCodes.join(' '));
    }
    return texts;
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col-reverse lg:flex-row">
      <div
        className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 pb-24 font-mono relative z-10 overflow-y-auto overflow-x-hidden bg-black text-white"
      >

        {/* Header */}
        <div className="mb-8 lg:mb-12 relative z-20">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t('title', '🌺 무궁화', '🌺 Mugunghwa')}</h1>
          <p className="text-base sm:text-lg opacity-80">{t('subtitle', '한글 기반 72진법 인코딩 라이브러리', 'Korean Base-72 Encoding Library')}</p>
        </div>

        {/* Introduction */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <p className="text-sm sm:text-base leading-relaxed opacity-90">
            {t('introduction', '무궁화는 10진수 숫자를 한글로 인코딩/디코딩하는 TypeScript 라이브러리입니다. 한글의 특성을 활용하여 숫자를 간결하고 읽기 쉬운 한글 문자열로 변환합니다.', 'Mugunghwa is a TypeScript library that encodes/decodes decimal numbers to Korean characters. It leverages Korean language characteristics to convert numbers into concise and readable Korean strings.')}
          </p>
        </div>

        {/* Interactive Counter */}
        <MugunghwaCounter isDarkMode={true} translations={translations} lang={lang} />

        {/* Features Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('features', '특징', 'Features')}</h2>
          <div className="space-y-2 text-xs sm:text-sm relative z-20">
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature1', '<strong>72진법 기반</strong>: 한글 조합을 활용한 효율적인 숫자 인코딩', '<strong>Base-72 System</strong>: Efficient number encoding using Korean combinations') }} />
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature2', '<strong>비속어 필터링</strong>: 부적절한 단어 조합을 자동으로 배제', '<strong>Profanity Filtering</strong>: Automatically excludes inappropriate word combinations') }} />
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature3', '<strong>양방향 변환</strong>: 숫자 ↔ 한글 문자열 상호 변환 지원', '<strong>Bidirectional Conversion</strong>: Supports number ↔ Korean string conversion') }} />
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature4', '<strong>오타 보정</strong>: 유사한 글자의 오타를 자동으로 수정', '<strong>Typo Correction</strong>: Automatically corrects typos in similar characters') }} />
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span dangerouslySetInnerHTML={{ __html: t('feature5', '<strong>TypeScript 지원</strong>: 완전한 타입 정의 제공', '<strong>TypeScript Support</strong>: Complete type definitions provided') }} />
            </div>
          </div>
        </div>

        {/* Random Encoded Texts */}
        <div className="mb-6 lg:mb-10 relative z-20 overflow-hidden">
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
            texts={randomTexts}
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
              {selectedPM === "npm" && "npm install mugunghwa"}
              {selectedPM === "pnpm" && "pnpm add mugunghwa"}
              {selectedPM === "yarn" && "yarn add mugunghwa"}
            </code>
            <button
              onClick={() => {
                const commands = {
                  npm: "npm install mugunghwa",
                  pnpm: "pnpm add mugunghwa",
                  yarn: "yarn add mugunghwa"
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
          <div className="p-3 sm:p-4 rounded text-xs sm:text-sm space-y-3 relative z-20 overflow-x-auto bg-white/5 flex items-start justify-between flex-col sm:flex-row sm:items-center">
            <div className="flex-1 space-y-3">
              <div>
                <code className="block whitespace-nowrap mb-1">
                  <span style={{ color: '#C586C0' }}>import</span>
                  {' { '}
                  <span style={{ color: '#DCDCAA' }}>encode</span>
                  {', '}
                  <span style={{ color: '#DCDCAA' }}>decode</span>
                  {' } '}
                  <span style={{ color: '#C586C0' }}>from</span>
                  {' '}
                  <span style={{ color: '#CE9178' }}>"mugunghwa"</span>
                  {';'}
                </code>
              </div>
              <div className="pt-2">
                <div className="opacity-60 mb-1">{t('usageComment1', '// 숫자를 한글로 인코딩', '// Encode number to Korean')}</div>
                <code className="block whitespace-nowrap">
                  <span style={{ color: '#C586C0' }}>const</span>
                  {' '}
                  <span style={{ color: '#9CDCFE' }}>encoded</span>
                  {' = '}
                  <span style={{ color: '#DCDCAA' }}>encode</span>
                  {'('}
                  <span style={{ color: '#B5CEA8' }}>3790050939</span>
                  {');'}
                </code>
                <code className="block opacity-60 whitespace-nowrap">// "내실-내초-온율"</code>
              </div>
              <div className="pt-2">
                <div className="opacity-60 mb-1">{t('usageComment2', '// 한글을 숫자로 디코딩', '// Decode Korean to number')}</div>
                <code className="block whitespace-nowrap">
                  <span style={{ color: '#C586C0' }}>const</span>
                  {' '}
                  <span style={{ color: '#9CDCFE' }}>decoded</span>
                  {' = '}
                  <span style={{ color: '#DCDCAA' }}>decode</span>
                  {'('}
                  <span style={{ color: '#9CDCFE' }}>encoded</span>
                  {');'}
                </code>
                <code className="block opacity-60 whitespace-nowrap">// 3790050939</code>
              </div>
            </div>
            <button
              onClick={() => {
                const codeExample = isKorean ? `import { encode, decode } from "mugunghwa";

// 숫자를 한글로 인코딩
const encoded = encode(3790050939);
// "내실-내초-온율"

// 한글을 숫자로 디코딩
const decoded = decode(encoded);
// 3790050939` : `import { encode, decode } from "mugunghwa";

// Encode number to Korean
const encoded = encode(3790050939);
// "내실-내초-온율"

// Decode Korean to number
const decoded = decode(encoded);
// 3790050939`;
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
              <h3 className="text-sm sm:text-base font-semibold mb-2">{t('whatIsMugunghwa', '무궁화 코드란?', 'What is Mugunghwa Code?')}</h3>
              <div className="space-y-2 opacity-90">
                <p>{t('whatIsMugunghwaDesc1', '무궁화코드는 한글로 숫자를 표현하는 코드체계입니다.', 'Mugunghwa Code is a coding system that represents numbers in Korean.')}</p>
                <p>{t('whatIsMugunghwaDesc2', '숫자만의 적은 길이로 더 수를 표현할 수 있게 해줍니다.', 'It allows you to represent more numbers with shorter lengths than digits alone.')}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{t('principle', '무궁화 코드 원리', 'Mugunghwa Code Principle')}</h3>
              <div className="space-y-2 opacity-90">
                <p>{t('principleDesc1', '무궁화코드는 10개 숫자로 10진법을 이루는 것 처럼', 'Just as 10 digits form base-10,')}</p>
                <p>{t('principleDesc2', '84개의 한글글자로 72진법을 구성하고 있습니다.', '84 Korean characters form base-72 in Mugunghwa Code.')}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{t('koreanCharacters', '84개 한글글자', '84 Korean Characters')}</h3>
              <div className="space-y-2 opacity-90">
                <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
                  <table className="min-w-full border-collapse text-center text-[aqua] font-black">
                    <tbody>
                      <tr>
                        <td className="p-1 sm:p-2">나</td>
                        <td className="p-1 sm:p-2">난</td>
                        <td className="p-1 sm:p-2">내</td>
                        <td className="p-1 sm:p-2">다</td>
                        <td className="p-1 sm:p-2">단</td>
                        <td className="p-1 sm:p-2">담</td>
                        <td className="p-1 sm:p-2">도</td>
                        <td className="p-1 sm:p-2">라</td>
                        <td className="p-1 sm:p-2">래</td>
                        <td className="p-1 sm:p-2">류</td>
                        <td className="p-1 sm:p-2">리</td>
                        <td className="p-1 sm:p-2">모</td>
                      </tr>
                      <tr>
                        <td className="p-1 sm:p-2">무</td>
                        <td className="p-1 sm:p-2">미</td>
                        <td className="p-1 sm:p-2">민</td>
                        <td className="p-1 sm:p-2">사</td>
                        <td className="p-1 sm:p-2">산</td>
                        <td className="p-1 sm:p-2">상</td>
                        <td className="p-1 sm:p-2">새</td>
                        <td className="p-1 sm:p-2">생</td>
                        <td className="p-1 sm:p-2">서</td>
                        <td className="p-1 sm:p-2">선</td>
                        <td className="p-1 sm:p-2">설</td>
                        <td className="p-1 sm:p-2">섬</td>
                      </tr>
                      <tr>
                        <td className="p-1 sm:p-2">성</td>
                        <td className="p-1 sm:p-2">소</td>
                        <td className="p-1 sm:p-2">솔</td>
                        <td className="p-1 sm:p-2">솜</td>
                        <td className="p-1 sm:p-2">송</td>
                        <td className="p-1 sm:p-2">수</td>
                        <td className="p-1 sm:p-2">시</td>
                        <td className="p-1 sm:p-2">신</td>
                        <td className="p-1 sm:p-2">실</td>
                        <td className="p-1 sm:p-2">심</td>
                        <td className="p-1 sm:p-2">아</td>
                        <td className="p-1 sm:p-2">안</td>
                      </tr>
                      <tr>
                        <td className="p-1 sm:p-2">애</td>
                        <td className="p-1 sm:p-2">양</td>
                        <td className="p-1 sm:p-2">여</td>
                        <td className="p-1 sm:p-2">연</td>
                        <td className="p-1 sm:p-2">예</td>
                        <td className="p-1 sm:p-2">오</td>
                        <td className="p-1 sm:p-2">온</td>
                        <td className="p-1 sm:p-2">요</td>
                        <td className="p-1 sm:p-2">우</td>
                        <td className="p-1 sm:p-2">월</td>
                        <td className="p-1 sm:p-2">유</td>
                        <td className="p-1 sm:p-2">윤</td>
                      </tr>
                      <tr>
                        <td className="p-1 sm:p-2">율</td>
                        <td className="p-1 sm:p-2">은</td>
                        <td className="p-1 sm:p-2">이</td>
                        <td className="p-1 sm:p-2">일</td>
                        <td className="p-1 sm:p-2">임</td>
                        <td className="p-1 sm:p-2">정</td>
                        <td className="p-1 sm:p-2">차</td>
                        <td className="p-1 sm:p-2">창</td>
                        <td className="p-1 sm:p-2">채</td>
                        <td className="p-1 sm:p-2">천</td>
                        <td className="p-1 sm:p-2">첨</td>
                        <td className="p-1 sm:p-2">청</td>
                      </tr>
                      <tr>
                        <td className="p-1 sm:p-2">초</td>
                        <td className="p-1 sm:p-2">총</td>
                        <td className="p-1 sm:p-2">표</td>
                        <td className="p-1 sm:p-2">하</td>
                        <td className="p-1 sm:p-2">한</td>
                        <td className="p-1 sm:p-2">해</td>
                        <td className="p-1 sm:p-2">향</td>
                        <td className="p-1 sm:p-2">현</td>
                        <td className="p-1 sm:p-2">혼</td>
                        <td className="p-1 sm:p-2">홍</td>
                        <td className="p-1 sm:p-2">화</td>
                        <td className="p-1 sm:p-2">효</td>
                      </tr>
                      <tr>
                        <td className="p-1 sm:p-2">남</td>
                        <td className="p-1 sm:p-2">눈</td>
                        <td className="p-1 sm:p-2">달</td>
                        <td className="p-1 sm:p-2">당</td>
                        <td className="p-1 sm:p-2">봄</td>
                        <td className="p-1 sm:p-2">비</td>
                        <td className="p-1 sm:p-2">슬</td>
                        <td className="p-1 sm:p-2">열</td>
                        <td className="p-1 sm:p-2">영</td>
                        <td className="p-1 sm:p-2">자</td>
                        <td className="p-1 sm:p-2">태</td>
                        <td className="p-1 sm:p-2">혜</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{t('encodingMethod', '무궁화 코드의 인코딩 방식', 'Mugunghwa Code Encoding Method')}</h3>
              <div className="space-y-2 opacity-90">
                <p>{t('encodingMethodDesc1', '10진법을 72진법으로 변환할 때, 2글자씩 묶어서 5184진법으로 끊은 후,', 'When converting base-10 to base-72, group 2 characters into base-5184,')}</p>
                <p>{t('encodingMethodDesc2', '마지막에 글자가 하나 남으면 해당 글자만 72진법으로 하향 표기합니다.', 'and if one character remains at the end, represent it in base-72.')}</p>
              </div>
              <div className="pt-2 space-y-1">
                <p>{t('encodingMethodDetail1', '84진법 2글자 조합: 84² = 7,056개', 'Base-84 2-char combinations: 84² = 7,056')}</p>
                <p>{t('encodingMethodDetail2', '72진법 2글자 조합: 72² = 5,184개', 'Base-72 2-char combinations: 72² = 5,184')}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">{t('profanityFiltering', '비속어 필터링 전략', 'Profanity Filtering Strategy')}</h3>
              <div className="space-y-2 opacity-90">
                <p>{t('profanityFilteringDesc1', '무궁화코드는 84진법 중 검사 조합에서 1872개의 조합을 배제하는', 'Mugunghwa Code excludes 1,872 combinations from base-84')}</p>
                <p>{t('profanityFilteringDesc2', '과정을 통해서 발생가능한 비속어나 발음하기 어려운 단어 노출을 방지합니다.', 'to prevent exposure to profanity or hard-to-pronounce words.')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Publication Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('relatedPaper', '관련 논문', 'Related Paper')}</h2>
          <div className="block p-6 border border-current/10 rounded-lg @container">
            <div className="flex flex-col @md:flex-row gap-6 mb-4">
              <div className="flex-shrink-0 mx-auto @md:mx-0">
                <img
                  src="/image/mugunghwa.webp"
                  alt={t('paperTitle', '음절 블록 체계를 이용한 한글에서의 72진법 표현 체계', 'Base-72 Representation System in Korean Using Syllable Block Structure')}
                  width={300}
                  height={420}
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg object-cover max-w-[200px] @md:max-w-none"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{t('paperTitle', '음절 블록 체계를 이용한 한글에서의 72진법 표현 체계', 'Base-72 Representation System in Korean Using Syllable Block Structure')}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm mb-4 opacity-80">
                  <span>{t('author', '저자: 이하민', 'Author: Hamin Lee')}</span>
                  <span>{t('publisher', '출판사: 한국통신학회', 'Publisher: Korean Institute of Communications')}</span>
                  <span>{t('publishDate', '출간일: 2019년', 'Published: 2019')}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {t('paperDescription', '영어와 숫자를 혼합한 32진법 Base 32를 모방해 순수 한글로 72진법 인코드 체계 개발. 3미터 오차의 GPS 좌표를 한글 다섯자리로 압축하는 알고리즘 제안. 이 논문을 토대로 JavaScript 기반 오픈소스 구현체 \'무궁화 코드\' 개발 및 GitHub 공개.', 'Developed a base-72 encoding system using pure Korean, inspired by base-32 that mixes letters and numbers. Proposed an algorithm to compress GPS coordinates with 3-meter accuracy into five Korean characters. Based on this paper, developed and published the JavaScript-based open-source implementation \'Mugunghwa Code\' on GitHub.')}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE09277763"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors border border-current/10"
              >
                <div className="flex-shrink-0">
                  <QRCodeSVG value="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE09277763" size={48} level="M" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium mb-1">
                    {t('paper', 'Paper', 'Paper')}
                  </div>
                  <div className="text-xs font-bold break-all">
                    https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE09277763
                  </div>
                </div>
              </a>
              <a
                href="https://github.com/hmmhmmhm/node-packages/tree/main/packages/mugunghwa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors border border-current/10"
              >
                <div className="flex-shrink-0">
                  <QRCodeSVG value="https://github.com/hmmhmmhm/node-packages/tree/main/packages/mugunghwa" size={48} level="M" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium mb-1">
                    {t('github', 'GitHub', 'GitHub')}
                  </div>
                  <div className="text-xs font-bold break-all">
                    https://github.com/hmmhmmhm/node-packages/tree/main/packages/mugunghwa
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <div className="p-6 border border-current/10 rounded-lg bg-white/5">
            <h3 className="text-base sm:text-lg font-semibold mb-3">{t('downloadSection', '무궁화 코드 전체 조합 다운로드', 'Download All Mugunghwa Code Combinations')}</h3>
            <p className="text-xs sm:text-sm opacity-90 mb-4 leading-relaxed">
              {t('downloadDescription', '비속어가 필터링된 5,184개의 무궁화 코드 조합을 다운로드할 수 있습니다. 이름 작명, 코드 생성 등 다양한 용도로 활용하실 수 있습니다.', 'Download 5,184 profanity-filtered Mugunghwa Code combinations. Can be used for various purposes such as naming, code generation, etc.')}
            </p>
            <a
              href="/ko/mugunghwa/84_filtered.txt"
              download="mugunghwa_84_filtered.txt"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-sm font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('downloadButton', '84_filtered.txt 다운로드', 'Download 84_filtered.txt')}
            </a>
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
              href="https://www.npmjs.com/package/mugunghwa"
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

      <div className="w-full lg:w-1/2 relative h-[250px] sm:h-[300px] lg:h-auto lg:min-h-screen overflow-hidden">
        {/* <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
          colorFront="hsl(320, 100%, 70%)"
          shape="simplex"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        /> */}
        <div className="absolute inset-0 w-full h-full bg-black">
          <ColorBends
            style={{ height: "100%", width: "100%" }}
            colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
            rotation={30}
            mouseInfluence={0.8}
            parallax={0.6}
            noise={0.08}
          />
        </div>
        {/* Mobile: absolute positioned within right panel */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-40 h-40 sm:w-48 sm:h-48 z-20 mix-blend-difference lg:hidden">
          <CircularText
            text="MUGUNGHWA * 무궁화 * MUGUNGHWA * 무궁화 * "
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
            text="MUGUNGHWA * 무궁화 * MUGUNGHWA * 무궁화 * "
            onHover="speedUp"
            spinDuration={20}
            className="text-base font-mono font-black text-white"
          />
        </div>
      </div>
    </div>
  );
}

