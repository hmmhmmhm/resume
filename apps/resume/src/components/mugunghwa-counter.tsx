import { useState, useEffect, useCallback, useRef } from "react";
import { encode, decode } from "mugunghwa";
import GradientText from "./gradient-text";

type TabType = "encode" | "decode";

export default function MugunghwaCounter({ isDarkMode }: { isDarkMode: boolean }) {
  const minValue = 10000;
  const maxValue = 9999999999;

  const [activeTab, setActiveTab] = useState<TabType>("encode");
  const [inputNumber, setInputNumber] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number>(minValue);
  const [encoded, setEncoded] = useState<string>("");
  const [inputCode, setInputCode] = useState<string>("");
  const [decoded, setDecoded] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const decodeInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 랜덤 숫자 생성 (10,000 이상)
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    const numStr = randomNum.toString();
    setInputNumber(numStr);
    setSliderValue(randomNum);
    const result = encode(randomNum);
    setEncoded(result || "");
    
    // 복호화 탭에도 기본값 설정
    const randomNumForDecode = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    const randomCode = encode(randomNumForDecode);
    if (randomCode) {
      setInputCode(randomCode);
      setDecoded(randomNumForDecode.toString());
    }
  }, []);

  const handleConvert = (value: string) => {
    setInputNumber(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && value !== "") {
      const clampedNum = Math.max(minValue, Math.min(maxValue, num));
      setSliderValue(clampedNum);
      const result = encode(num);
      setEncoded(result || "");
    } else {
      setEncoded("");
    }
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setInputNumber(value.toString());
    const result = encode(value);
    setEncoded(result || "");
  };

  const handleDecodeConvert = useCallback((value: string) => {
    setInputCode(value);
    if (value.trim() !== "") {
      const result = decode(value);
      if (result !== null) {
        setDecoded(result.toString());
      } else {
        setDecoded("");
      }
    } else {
      setDecoded("");
    }
  }, []);

  const handleCopy = () => {
    const textToCopy = activeTab === "encode" ? encoded : decoded;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRandomize = () => {
    if (activeTab === "encode") {
      const randomNum = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
      const numStr = randomNum.toString();
      setInputNumber(numStr);
      setSliderValue(randomNum);
      const result = encode(randomNum);
      setEncoded(result || "");
    } else {
      // decode 탭에서는 랜덤 숫자를 인코딩한 코드를 입력란에 넣기
      const randomNum = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
      const randomCode = encode(randomNum);
      if (randomCode) {
        setInputCode(randomCode);
        setDecoded(randomNum.toString());
      }
    }
  };

  return (
    <div className="mb-6 lg:mb-10 relative z-20">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">체험</h2>
      <div className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("encode")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "encode"
              ? isDarkMode
                ? "bg-white/10 text-white"
                : "bg-black/10 text-black"
              : "opacity-50 hover:opacity-70"
              }`}
          >
            암호화
          </button>
          <button
            onClick={() => setActiveTab("decode")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === "decode"
              ? isDarkMode
                ? "bg-white/10 text-white"
                : "bg-black/10 text-black"
              : "opacity-50 hover:opacity-70"
              }`}
          >
            복호화
          </button>
        </div>

        {/* Encode Tab Content */}
        {activeTab === "encode" && (
          <>
            {/* 변환된 무궁화 코드 - 크게 강조 */}
            {encoded && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm opacity-70">
                    무궁화 코드
                  </label>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                      }`}
                    title="복사"
                  >
                    {copied ? (
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
                <div className={`px-6 py-8 font-mono text-3xl sm:text-4xl lg:text-5xl font-bold break-all text-center ${isDarkMode ? "bg-white/10" : "bg-black/10"
                  }`}>
                  <GradientText
                    colors={['#ff5c7a', '#8a5cff', '#00ffd1', '#ff5c7a']}
                    animationSpeed={6}
                    className="font-black"
                  >
                    {encoded}
                  </GradientText>
                </div>
              </div>
            )}

            {/* 숫자 입력 - 작게 표시 */}
            <div className="pt-2 space-y-3">
              <label className="block text-xs opacity-50 mb-1.5">
                코드로 변환될 숫자
              </label>

              {/* 슬라이더 */}
              <div className="space-y-2">
                <style>{`
                  input[type="range"].mugunghwa-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    cursor: pointer;
                    height: 16px;
                  }
                  
                  input[type="range"].mugunghwa-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    border: none;
                    margin-top: -4px;
                  }
                  
                  input[type="range"].mugunghwa-slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    border: none;
                  }
                  
                  input[type="range"].mugunghwa-slider::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 8px;
                    border-radius: 4px;
                  }
                  
                  input[type="range"].mugunghwa-slider::-moz-range-track {
                    width: 100%;
                    height: 8px;
                    border-radius: 4px;
                  }
                `}</style>
                <input
                  type="range"
                  min={minValue}
                  max={maxValue}
                  value={sliderValue}
                  onChange={(e) => handleSliderChange(parseInt((e.target as HTMLInputElement).value, 10))}
                  className="w-full h-2 rounded-lg cursor-pointer mugunghwa-slider"
                  style={{
                    background: `linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) ${((sliderValue - minValue) / (maxValue - minValue)) * 100}%, rgba(255,255,255,0.1) ${((sliderValue - minValue) / (maxValue - minValue)) * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>

              {/* 입력란과 랜덤 버튼 */}
              <div className="flex gap-2">
                <input
                  type="number"
                  value={inputNumber}
                  onChange={(e) => handleConvert((e.target as HTMLInputElement).value)}
                  placeholder="숫자를 입력하세요"
                  className={`flex-1 px-3 py-2 rounded text-xs sm:text-sm font-mono transition-colors ${isDarkMode
                    ? "bg-white/5 text-white/70 placeholder-white/20 focus:bg-white/10"
                    : "bg-black/5 text-black/70 placeholder-black/20 focus:bg-black/10"
                    } outline-none focus:ring-1 ${isDarkMode ? "focus:ring-white/10" : "focus:ring-black/10"}`}
                />
                <button
                  onClick={handleRandomize}
                  className={`px-4 py-2 rounded text-base sm:text-lg transition-colors ${isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                    }`}
                  title="랜덤 숫자 생성"
                >
                  🎲
                </button>
              </div>
            </div>
          </>
        )}

        {/* Decode Tab Content */}
        {activeTab === "decode" && (
          <>
            {/* 디코딩된 숫자 - 크게 강조 */}
            <div className="space-y-3" style={{ visibility: decoded ? 'visible' : 'hidden', height: decoded ? 'auto' : '0' }}>
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm opacity-70">
                  디코딩된 숫자
                </label>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                    }`}
                  title="복사"
                  disabled={!decoded}
                >
                  {copied ? (
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
              <div className={`px-6 py-8 rounded-lg font-mono text-3xl sm:text-4xl lg:text-5xl font-bold break-all text-center ${isDarkMode ? "bg-white/10" : "bg-black/10"
                }`}>
                <GradientText
                  colors={['#ff5c7a', '#8a5cff', '#00ffd1', '#ff5c7a']}
                  animationSpeed={6}
                  className="font-black"
                >
                  {decoded || "\u00A0"}
                </GradientText>
              </div>
            </div>

            {/* 무궁화 코드 입력 */}
            <div className="pt-2 space-y-3">
              <label className="block text-xs opacity-50 mb-1.5">
                숫자로 변환될 무궁화 코드
              </label>

              {/* 입력란과 랜덤 버튼 */}
              <div className="flex gap-2">
                <input
                  key="decode-input"
                  ref={decodeInputRef}
                  type="text"
                  value={inputCode}
                  onChange={(e) => handleDecodeConvert((e.target as HTMLInputElement).value)}
                  placeholder="무궁화 코드를 입력하세요"
                  autoComplete="off"
                  className={`flex-1 px-3 py-2 rounded text-xs sm:text-sm font-mono transition-colors ${isDarkMode
                    ? "bg-white/5 text-white/70 placeholder-white/20 focus:bg-white/10"
                    : "bg-black/5 text-black/70 placeholder-black/20 focus:bg-black/10"
                    } outline-none focus:ring-1 ${isDarkMode ? "focus:ring-white/10" : "focus:ring-black/10"}`}
                />
                <button
                  onClick={handleRandomize}
                  className={`px-4 py-2 rounded text-base sm:text-lg transition-colors ${isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                    }`}
                  title="랜덤 코드 생성"
                >
                  🎲
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
