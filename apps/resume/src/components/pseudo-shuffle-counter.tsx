import { useState, useEffect, useRef } from "react";
import { encode, decode } from "pseudo-shuffle";

interface PseudoShuffleCounterProps {
  isDarkMode?: boolean;
  lang?: string;
}

export default function PseudoShuffleCounter({ isDarkMode = true, lang = "ko" }: PseudoShuffleCounterProps) {
  const isKorean = lang === "ko";
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("encode");
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10000000000);
  // Random initial index between min and max
  const [index, setIndex] = useState<number>(() => Math.floor(Math.random() * 10000000001));
  const [privateKey, setPrivateKey] = useState<string>("");
  const [encodedValue, setEncodedValue] = useState<number>(0);
  const [decodedValue, setDecodedValue] = useState<number>(0);

  // Ensure index is within valid range when min or max changes
  useEffect(() => {
    if (index < min) {
      setIndex(min);
    } else if (index > max) {
      setIndex(max);
    }
  }, [min, max]);

  // Sync index when switching tabs
  useEffect(() => {
    if (activeTab === "encode" && decodedValue !== 0) {
      // Switching to encode: use decoded value as new index
      setIndex(decodedValue);
    } else if (activeTab === "decode" && encodedValue !== 0) {
      // Switching to decode: use encoded value as new index
      setIndex(encodedValue);
    }
  }, [activeTab]);

  // Real-time processing
  useEffect(() => {
    const processValue = async () => {
      try {
        if (activeTab === "encode") {
          const encodeResult = encode({
            min,
            max,
            index,
            ...(privateKey && { privateKey })
          });
          const encoded = await Promise.resolve(encodeResult);
          setEncodedValue(encoded);
        } else {
          const decodeResult = decode({
            min,
            max,
            index,
            ...(privateKey && { privateKey })
          });
          const decoded = await Promise.resolve(decodeResult);
          setDecodedValue(decoded);
        }
      } catch (error) {
        console.error("Processing error:", error);
      }
    };

    processValue();
  }, [min, max, index, privateKey, activeTab]);

  // Convert slider position (0-10) to actual value (10^0 to 10^10)
  const sliderToValue = (sliderPos: number): number => {
    if (sliderPos === 0) return 1;
    return Math.pow(10, sliderPos);
  };

  // Convert actual value to slider position (0-10)
  const valueToSlider = (value: number): number => {
    if (value <= 1) return 0;
    return Math.log10(value);
  };

  const bgClass = isDarkMode ? "bg-white/5" : "bg-black/5";
  const borderClass = isDarkMode ? "border-white/10" : "border-black/10";

  return (
    <div className={`mb-6 lg:mb-10 relative z-20 p-4 sm:p-6 rounded-lg ${bgClass} border ${borderClass}`}>
      <style>{`
        .slider-input {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          background: white;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        
        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
        
        .slider-input::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
        }
      `}</style>
      <h3 className="text-base sm:text-lg font-semibold mb-4">{isKorean ? "플레이그라운드" : "Playground"}</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("encode")}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === "encode"
              ? "bg-white/10 text-white"
              : "opacity-50 hover:opacity-70"
          }`}
        >
          {isKorean ? "인코딩" : "Encode"}
        </button>
        <button
          onClick={() => setActiveTab("decode")}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === "decode"
              ? "bg-white/10 text-white"
              : "opacity-50 hover:opacity-70"
          }`}
        >
          {isKorean ? "디코딩" : "Decode"}
        </button>
      </div>

      <div className="space-y-4">
        {/* Index Value */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs sm:text-sm opacity-80">
              {activeTab === "encode" 
                ? (isKorean ? "원본 인덱스 (Index)" : "Original Index")
                : (isKorean ? "인코딩된 값 (Encoded)" : "Encoded Value")}:
            </label>
            <input
              type="number"
              min={min}
              max={max}
              value={index}
              onChange={(e) => {
                const val = Number((e.target as HTMLInputElement).value);
                if (val >= min && val <= max) setIndex(val);
              }}
              className={`w-32 px-2 py-1 rounded text-xs sm:text-sm ${bgClass} border ${borderClass} focus:outline-none focus:border-white/30`}
            />
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={index}
            onChange={(e) => setIndex(Number((e.target as HTMLInputElement).value))}
            className="slider-input"
          />
        </div>

        {/* Min Value */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs sm:text-sm opacity-80">
              {isKorean ? "최소값 (Min)" : "Minimum (Min)"}:
            </label>
            <input
              type="number"
              min="0"
              max={max - 4}
              value={min}
              onChange={(e) => {
                const val = Number((e.target as HTMLInputElement).value);
                if (val >= 0 && val <= max - 4) setMin(val);
              }}
              className={`w-32 px-2 py-1 rounded text-xs sm:text-sm ${bgClass} border ${borderClass} focus:outline-none focus:border-white/30`}
            />
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={valueToSlider(min === 0 ? 1 : min)}
            onChange={(e) => {
              const sliderPos = Number((e.target as HTMLInputElement).value);
              const newValue = sliderPos === 0 ? 0 : sliderToValue(sliderPos);
              if (newValue <= max - 4) {
                setMin(newValue);
              }
            }}
            className="slider-input"
          />
        </div>

        {/* Max Value */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs sm:text-sm opacity-80">
              {isKorean ? "최대값 (Max)" : "Maximum (Max)"}:
            </label>
            <input
              type="number"
              min={min + 4}
              max="10000000000"
              value={max}
              onChange={(e) => {
                const val = Number((e.target as HTMLInputElement).value);
                if (val >= min + 4 && val <= 10000000000) setMax(val);
              }}
              className={`w-32 px-2 py-1 rounded text-xs sm:text-sm ${bgClass} border ${borderClass} focus:outline-none focus:border-white/30`}
            />
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={valueToSlider(max)}
            onChange={(e) => {
              const sliderPos = Number((e.target as HTMLInputElement).value);
              const newValue = sliderToValue(sliderPos);
              if (newValue >= min + 4 && newValue <= 10000000000) {
                setMax(newValue);
              }
            }}
            className="slider-input"
          />
        </div>

        {/* Private Key */}
        <div>
          <label className="block text-xs sm:text-sm mb-2 opacity-80">
            {isKorean ? "비밀키 (Private Key - 선택사항)" : "Private Key (Optional)"}
          </label>
          <input
            type="text"
            value={privateKey}
            onChange={(e) => setPrivateKey((e.target as HTMLInputElement).value)}
            placeholder={isKorean ? "비밀키를 입력하세요" : "Enter private key"}
            className={`w-full px-3 py-2 rounded text-xs sm:text-sm ${bgClass} border ${borderClass} focus:outline-none focus:border-white/30`}
          />
        </div>

        {/* Results */}
        <div className={`mt-6 p-4 rounded ${bgClass} border ${borderClass}`}>
          <div className="space-y-3 text-xs sm:text-sm">
            {activeTab === "encode" ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">{isKorean ? "인코딩된 값:" : "Encoded Value:"}</span>
                  <span className="font-bold text-lg text-[#ff5c7a]">{encodedValue}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-current/10">
                  <p className="text-xs opacity-60">
                    {isKorean 
                      ? `원본 인덱스 ${index}가 ${encodedValue}로 인코딩됩니다.`
                      : `Original index ${index} is encoded to ${encodedValue}.`}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">{isKorean ? "디코딩된 값:" : "Decoded Value:"}</span>
                  <span className="font-bold text-lg text-[#00ffd1]">{decodedValue}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-current/10">
                  <p className="text-xs opacity-60">
                    {isKorean 
                      ? `인코딩된 값 ${index}가 ${decodedValue}로 디코딩됩니다.`
                      : `Encoded value ${index} is decoded to ${decodedValue}.`}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
