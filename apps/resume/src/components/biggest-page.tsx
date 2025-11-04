import { useState, useEffect, useMemo } from "react";
import GalaxyEffect from "./galaxy-effect";
import CircularText from "./circular-text";
import * as biggest from "biggest";

export default function BiggestPage() {
  // 탭 데이터
  const tabs = [
    { id: "add", label: "큰수 덧셈", operator: "+", example: "258435724652396573465785972395784578958967346782346137856284628964723865893478348174612396116278462856892367823471346128+34769357265716348967693647236571349813673456782945789647819656395724651736481248368736592637862374678457934657246873562" },
    { id: "subtract", label: "큰수 뺄셈", operator: "-", example: "357245637923963276728365986578367862896734584973456364286423969385745764716482649167463578191738481264789478164792371673-21345932471247835676739273618634964756375634678267637567346319813741796712479237284978358264867281692367816482837282222" },
    { id: "multiply", label: "큰수 곱셈", operator: "×", example: "24534857238472634712471561972836134629756284623467364189267123947134621768794782165764574385346723647364726581637963723582648237×187647123427469816783671264836134712936478368127421587268736721671948163836483275647856373847364783642672672722" },
    { id: "divide", label: "큰수 나눗셈", operator: "÷", example: "856234857361236735678957162894745726734967836783958425746172367367368967529567249573457368342849162946726734617348247161÷24583495678467183573496387628462384637487365846537958245284639467236587956376573333373333" }
  ];

  const [selectedTab, setSelectedTab] = useState<string>("multiply");
  const [display, setDisplay] = useState<string>(tabs[2].example);
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [selectedPM, setSelectedPM] = useState<string>("npm");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [copiedExample, setCopiedExample] = useState<boolean>(false);
  const [selectedExampleTab, setSelectedExampleTab] = useState<string>("basic");

  // GalaxyEffect 메모이제이션 (리렌더 방지)
  const galaxyEffect = useMemo(() => (
    <GalaxyEffect
      mouseRepulsion={true}
      mouseInteraction={true}
      density={1.5}
      glowIntensity={0.6}
      hueShift={30}
      saturation={0.9}
    />
  ), []);

  // 탭 변경 시 예제 로드
  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setExpression("");
      setDisplay(tab.example);
      setResult("");
    }
  };

  // 숫자/연산자 입력
  const handleInput = (value: string) => {
    if (display === "0" || result) {
      setDisplay(value);
      setExpression("");
      setResult("");
    } else {
      setDisplay(display + value);
    }
  };

  // AC (All Clear)
  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setResult("");
  };

  // 백스페이스
  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  // 계산 실행
  const handleCalculate = () => {
    try {
      // 계산 전에 현재 display를 expression에 저장
      setExpression(display);

      // 표시용 연산자를 실제 연산자로 변환
      let expr = display.replace(/×/g, "*").replace(/÷/g, "/");

      // 간단한 계산식 파싱 (숫자 연산자 숫자 형태)
      const addMatch = expr.match(/^(.+)\+(.+)$/);
      const subMatch = expr.match(/^(.+)-(.+)$/);
      const mulMatch = expr.match(/^(.+)\*(.+)$/);
      const divMatch = expr.match(/^(.+)\/(.+)$/);

      let res = "";

      if (addMatch) {
        res = biggest.add(addMatch[1].trim(), addMatch[2].trim());
      } else if (subMatch) {
        res = biggest.subtract(subMatch[1].trim(), subMatch[2].trim());
      } else if (mulMatch) {
        res = biggest.multiply(mulMatch[1].trim(), mulMatch[2].trim());
      } else if (divMatch) {
        res = biggest.divide(divMatch[1].trim(), divMatch[2].trim(), 20);
      } else {
        res = "잘못된 계산식";
      }

      setResult(res);
      setDisplay(res);
    } catch (error) {
      setResult(`오류: ${error instanceof Error ? error.message : "계산 실패"}`);
    }
  };

  // textarea 높이 자동 조절
  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [display]);

  // 키보드 입력 처리
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // textarea에 포커스가 있으면 키보드 이벤트를 무시
      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
        return;
      }

      const key = e.key;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        handleInput(key);
      } else if (key === '+') {
        e.preventDefault();
        handleInput('+');
      } else if (key === '-') {
        e.preventDefault();
        handleInput('-');
      } else if (key === '*') {
        e.preventDefault();
        handleInput('×');
      } else if (key === '/') {
        e.preventDefault();
        handleInput('÷');
      } else if (key === '.') {
        e.preventDefault();
        handleInput('.');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [display, expression, result]);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Mobile: GalaxyEffect section */}
      <div className="lg:hidden w-full h-[250px] sm:h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black">
          {galaxyEffect}
        </div>
        {/* Mobile: CircularText within GalaxyEffect section */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-40 h-40 sm:w-48 sm:h-48 z-20 mix-blend-difference">
          <CircularText
            text="BIGGEST * BIGGEST * BIGGEST * "
            onHover="speedUp"
            spinDuration={20}
            className="text-base font-mono font-black text-white"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 font-mono relative z-10 overflow-x-hidden relative">
          <section className="mb-6 lg:mb-10 space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">프로젝트</p>
            <h1 className="text-3xl sm:text-4xl font-bold">Biggest</h1>
            <p className="text-base sm:text-lg text-white/80">
              2kb의 가벼운 크기로 무한 정밀도의 큰 정수와 큰 소수를 안전하게 계산할 수 있는 라이브러리입니다.
            </p>
          </section>

          <section className="mb-6 lg:mb-10 space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">설치</h2>
            <div className="flex gap-2 mb-3 flex-wrap">
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
            <div className="flex items-center justify-between p-3 sm:p-4 rounded text-xs sm:text-sm bg-white/5">
              <code className="break-all overflow-hidden text-ellipsis flex-1 min-w-0 font-mono">
                {selectedPM === "npm" && "npm install biggest"}
                {selectedPM === "pnpm" && "pnpm add biggest"}
                {selectedPM === "yarn" && "yarn add biggest"}
              </code>
              <button
                onClick={() => {
                  const commands = {
                    npm: "npm install biggest",
                    pnpm: "pnpm add biggest",
                    yarn: "yarn add biggest"
                  };
                  navigator.clipboard.writeText(commands[selectedPM as keyof typeof commands]);
                  setCopiedInstall(true);
                  setTimeout(() => setCopiedInstall(false), 2000);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors hover:bg-white/10 flex-shrink-0 ml-2"
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
          </section>

          <section className="mb-12 space-y-4">
            <div>
              {/* 탭 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${selectedTab === tab.id
                      ? "bg-white/20 text-white shadow-lg"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 애플 스타일 계산기 */}
              <div className="max-w-md mx-auto bg-black rounded-[2.5rem] p-6 shadow-2xl">
                {/* 디스플레이 */}
                <div className="mb-6 min-h-[40px] flex flex-col justify-end px-2">
                  <div className="text-right">
                    {expression && (
                      <div className="text-sm text-white/40 font-light mb-2 break-words">
                        {expression}
                      </div>
                    )}
                    <textarea
                      key={display}
                      defaultValue={display}
                      onBlur={(e) => {
                        setDisplay((e.target as HTMLTextAreaElement).value);
                        setExpression("");
                        setResult("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const value = (e.target as HTMLTextAreaElement).value;
                          setDisplay(value);
                          handleCalculate();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedText = e.clipboardData?.getData('text');
                        if (pastedText) {
                          (e.target as HTMLTextAreaElement).value = pastedText;
                          setDisplay(pastedText);
                          setExpression("");
                          setResult("");
                        }
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                      style={{
                        height: 'auto',
                        minHeight: '66px'
                      }}
                      className="w-full text-[22px] font-light text-white tracking-tight break-words leading-tight bg-transparent border-none outline-none text-right resize-none overflow-hidden"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* 버튼 그리드 */}
                <div className="grid grid-cols-4 gap-3">
                  {/* 첫 번째 줄 */}
                  <button onClick={handleBackspace} className="bg-[#a5a5a5] hover:opacity-80 text-black rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    ⌫
                  </button>
                  <button onClick={handleClear} className="bg-[#a5a5a5] hover:opacity-80 text-black rounded-full aspect-square flex items-center justify-center text-2xl font-light transition-all active:scale-95 select-none">
                    AC
                  </button>
                  <button onClick={() => handleInput("%")} className="bg-[#a5a5a5] hover:opacity-80 text-black rounded-full aspect-square flex items-center justify-center text-2xl font-light transition-all active:scale-95 select-none">
                    %
                  </button>
                  <button onClick={() => handleInput("÷")} className="bg-[#ff9f0a] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    ÷
                  </button>

                  {/* 두 번째 줄 */}
                  <button onClick={() => handleInput("7")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    7
                  </button>
                  <button onClick={() => handleInput("8")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    8
                  </button>
                  <button onClick={() => handleInput("9")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    9
                  </button>
                  <button onClick={() => handleInput("×")} className="bg-[#ff9f0a] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    ×
                  </button>

                  {/* 세 번째 줄 */}
                  <button onClick={() => handleInput("4")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    4
                  </button>
                  <button onClick={() => handleInput("5")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    5
                  </button>
                  <button onClick={() => handleInput("6")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    6
                  </button>
                  <button onClick={() => handleInput("-")} className="bg-[#ff9f0a] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    −
                  </button>

                  {/* 네 번째 줄 */}
                  <button onClick={() => handleInput("1")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    1
                  </button>
                  <button onClick={() => handleInput("2")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    2
                  </button>
                  <button onClick={() => handleInput("3")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    3
                  </button>
                  <button onClick={() => handleInput("+")} className="bg-[#ff9f0a] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    +
                  </button>

                  {/* 다섯 번째 줄 */}
                  <button onClick={() => handleInput("+/-")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-2xl font-light transition-all active:scale-95 select-none">
                    +/−
                  </button>
                  <button onClick={() => handleInput("0")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    0
                  </button>
                  <button onClick={() => handleInput(".")} className="bg-[#333333] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    .
                  </button>
                  <button onClick={handleCalculate} className="bg-[#ff9f0a] hover:opacity-80 text-white rounded-full aspect-square flex items-center justify-center text-3xl font-light transition-all active:scale-95 select-none">
                    =
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-6 lg:mb-10 space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">주요 기능</h2>
            <div className="space-y-2 text-xs sm:text-sm">
              {[
                { title: "기본 연산", desc: "덧셈, 뺄셈, 곱셈, 나눗셈" },
                { title: "비교 연산", desc: "크기 비교, 최소/최대값 찾기" },
                { title: "반올림", desc: "floor, ceil, round 등" },
                { title: "거듭제곱", desc: "제곱근, n제곱근 계산" },
                { title: "모듈러 연산", desc: "mod, gcd, lcm 계산" },
                { title: "조합론", desc: "팩토리얼, 조합, 순열 계산" }
              ].map((item) => (
                <div key={item.title} className="flex items-start">
                  <span className="mr-3 opacity-60">→</span>
                  <span><strong>{item.title}</strong>: {item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6 lg:mb-10 space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">왜 Biggest를 사용해야 하나요?</h2>
            <div className="space-y-2 text-xs sm:text-sm">
              {[
                { title: "무한 정밀도", desc: "JavaScript의 숫자 제한을 넘어 임의의 크기의 정수와 소수를 처리" },
                { title: "가벼운 크기", desc: "단 2kb의 크기로 의존성 없이 순수 문자열 기반 구현" },
                { title: "완벽한 정확성", desc: "부동소수점 오류 없이 금융, 과학 계산 등에 안전하게 사용" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="mr-3 opacity-60">→</span>
                  <span><strong>{item.title}</strong>: {item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6 lg:mb-10 space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">사용 예시</h2>

            {/* 예시 탭 */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {[
                { id: "basic", label: "기본 연산" },
                { id: "advanced", label: "고급 연산" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedExampleTab(tab.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${selectedExampleTab === tab.id
                    ? "bg-white/10 text-white"
                    : "opacity-50 hover:opacity-70"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 기본 연산 예시 */}
            {selectedExampleTab === "basic" && (
              <div className="p-3 sm:p-4 rounded text-xs sm:text-sm space-y-3 overflow-x-auto bg-white/5">
                <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <code className="block mb-1">
                        <span style={{ color: '#C586C0' }}>import</span>
                        {' { add, subtract, multiply, divide } '}
                        <span style={{ color: '#C586C0' }}>from</span>
                        {' '}
                        <span style={{ color: '#CE9178' }}>"biggest"</span>
                        {';'}
                      </code>
                    </div>
                    <div className="pt-2">
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>add</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"10000000000000000000000"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"0.00000000005"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '10000000000000000000000.00000000005'</code>
                    </div>
                    <div className="pt-2">
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>subtract</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"-9999999999999999999999.9"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"0.1"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '-10000000000000000000000'</code>
                    </div>
                    <div className="pt-2">
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>multiply</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"123456789123456789"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"0.000000001"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '123456789.123456789'</code>
                    </div>
                    <div className="pt-2">
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>divide</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"1000000000000000000000"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"0.1"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '10000000000000000000000'</code>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const codeExample = `import { add, subtract, multiply, divide } from "biggest";

console.log(add("10000000000000000000000", "0.00000000005"));
// '10000000000000000000000.00000000005'

console.log(subtract("-9999999999999999999999.9", "0.1"));
// '-10000000000000000000000'

console.log(multiply("123456789123456789", "0.000000001"));
// '123456789.123456789'

console.log(divide("1000000000000000000000", "0.1"));
// '10000000000000000000000'`;
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
            )}

            {/* 고급 연산 예시 */}
            {selectedExampleTab === "advanced" && (
              <div className="p-3 sm:p-4 rounded text-xs sm:text-sm space-y-3 overflow-x-auto bg-white/5">
                <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <code className="block mb-1">
                        <span style={{ color: '#C586C0' }}>import</span>
                        {' { compare, min, max, floor, ceil, round, pow, sqrt, nthRoot, mod, gcd, lcm, factorial } '}
                        <span style={{ color: '#C586C0' }}>from</span>
                        {' '}
                        <span style={{ color: '#CE9178' }}>"biggest"</span>
                        {';'}
                      </code>
                    </div>
                    <div className="pt-2">
                      <code className="block opacity-60">// 비교 연산</code>
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>compare</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"123.456"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"123.457"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// -1 (less than)</code>
                    </div>
                    <div className="pt-2">
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>max</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"5.67"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"5.68"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"5.69"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '5.69'</code>
                    </div>
                    <div className="pt-2">
                      <code className="block opacity-60">// 반올림 연산</code>
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>round</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"5.5"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '6'</code>
                    </div>
                    <div className="pt-2">
                      <code className="block opacity-60">// 거듭제곱 연산</code>
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>pow</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"2"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"100"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '1267650600228229401496703205376'</code>
                    </div>
                    <div className="pt-2">
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>sqrt</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"2"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '1.41421356237309504880'</code>
                    </div>
                    <div className="pt-2">
                      <code className="block opacity-60">// 모듈러 연산</code>
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>gcd</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"48"</span>
                        {', '}
                        <span style={{ color: '#CE9178' }}>"18"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '6'</code>
                    </div>
                    <div className="pt-2">
                      <code className="block opacity-60">// 조합론</code>
                      <code className="block">
                        <span style={{ color: '#9CDCFE' }}>console</span>
                        {'.'}
                        <span style={{ color: '#DCDCAA' }}>log</span>
                        {'('}
                        <span style={{ color: '#DCDCAA' }}>factorial</span>
                        {'('}
                        <span style={{ color: '#CE9178' }}>"10"</span>
                        {'));'}
                      </code>
                      <code className="block opacity-60">// '3628800'</code>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const codeExample = `import { compare, min, max, floor, ceil, round, pow, sqrt, nthRoot, mod, gcd, lcm, factorial } from "biggest";

// 비교 연산
console.log(compare("123.456", "123.457")); // -1 (less than)
console.log(max("5.67", "5.68", "5.69")); // '5.69'

// 반올림 연산
console.log(round("5.5")); // '6'

// 거듭제곱 연산
console.log(pow("2", "100")); // '1267650600228229401496703205376'
console.log(sqrt("2")); // '1.41421356237309504880'

// 모듈러 연산
console.log(gcd("48", "18")); // '6'

// 조합론
console.log(factorial("10")); // '3628800'`;
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
            )}
          </section>

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
                href="https://www.npmjs.com/package/biggest"
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

        {/* Desktop: GalaxyEffect */}
        <div className="hidden lg:block w-full lg:w-1/2 relative lg:min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            {galaxyEffect}
          </div>
        </div>
      </div>

      {/* Desktop: fixed floating CircularText at bottom right */}
      <div className="hidden lg:block fixed bottom-12 right-12 w-56 h-56 z-50 mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <CircularText
            text="BIGGEST * BIGGEST * BIGGEST * "
            onHover="speedUp"
            spinDuration={20}
            className="text-base font-mono font-black text-white"
          />
        </div>
      </div>
    </div>
  );
}
