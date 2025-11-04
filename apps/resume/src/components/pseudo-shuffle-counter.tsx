import { useState, useEffect, useRef } from "react";
import { encode, decode } from "pseudo-shuffle";

interface PseudoShuffleCounterProps {
  isDarkMode?: boolean;
}

export default function PseudoShuffleCounter({ isDarkMode = true }: PseudoShuffleCounterProps) {
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("encode");
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10000000000);
  // Random initial index between min and max
  const [index, setIndex] = useState<number>(() => Math.floor(Math.random() * 10000000001));
  const [privateKey, setPrivateKey] = useState<string>("");
  const [encodedValue, setEncodedValue] = useState<number>(0);
  const [decodedValue, setDecodedValue] = useState<number>(0);
  
  // Debounced values for heavy computation
  const [debouncedMin, setDebouncedMin] = useState<number>(min);
  const [debouncedMax, setDebouncedMax] = useState<number>(max);
  const [debouncedIndex, setDebouncedIndex] = useState<number>(index);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce min, max, and index changes
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedMin(min);
      setDebouncedMax(max);
      setDebouncedIndex(index);
    }, 150); // 150ms debounce delay
    
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [min, max, index]);

  // Ensure index is within valid range when min or max changes
  useEffect(() => {
    if (index < min) {
      setIndex(min);
    } else if (index > max) {
      setIndex(max);
    }
  }, [min, max, index]);

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

  useEffect(() => {
    const processValue = async () => {
      try {
        if (activeTab === "encode") {
          // Encode mode: encode the index
          const encodeResult = encode({
            min: debouncedMin,
            max: debouncedMax,
            index: debouncedIndex,
            ...(privateKey && { privateKey })
          });
          const encoded = await Promise.resolve(encodeResult);
          setEncodedValue(encoded);
        } else {
          // Decode mode: decode the index
          const decodeResult = decode({
            min: debouncedMin,
            max: debouncedMax,
            index: debouncedIndex,
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
  }, [debouncedMin, debouncedMax, debouncedIndex, privateKey, activeTab]);

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
      <h3 className="text-base sm:text-lg font-semibold mb-4">플레이그라운드</h3>

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
          인코딩
        </button>
        <button
          onClick={() => setActiveTab("decode")}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === "decode"
              ? "bg-white/10 text-white"
              : "opacity-50 hover:opacity-70"
          }`}
        >
          디코딩
        </button>
      </div>

      <div className="space-y-4">
        {/* Index Value */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs sm:text-sm opacity-80">
              {activeTab === "encode" ? "원본 인덱스 (Index)" : "인코딩된 값 (Encoded)"}:
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
              최소값 (Min):
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
            max={max - 4}
            value={min}
            onChange={(e) => setMin(Number((e.target as HTMLInputElement).value))}
            className="slider-input"
          />
        </div>

        {/* Max Value */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs sm:text-sm opacity-80">
              최대값 (Max):
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
            min={min + 4}
            max="10000000000"
            value={max}
            onChange={(e) => setMax(Number((e.target as HTMLInputElement).value))}
            className="slider-input"
          />
        </div>

        {/* Private Key */}
        <div>
          <label className="block text-xs sm:text-sm mb-2 opacity-80">
            비밀키 (Private Key - 선택사항)
          </label>
          <input
            type="text"
            value={privateKey}
            onChange={(e) => setPrivateKey((e.target as HTMLInputElement).value)}
            placeholder="비밀키를 입력하세요"
            className={`w-full px-3 py-2 rounded text-xs sm:text-sm ${bgClass} border ${borderClass} focus:outline-none focus:border-white/30`}
          />
        </div>

        {/* Results */}
        <div className={`mt-6 p-4 rounded ${bgClass} border ${borderClass}`}>
          <div className="space-y-3 text-xs sm:text-sm">
            {activeTab === "encode" ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">인코딩된 값:</span>
                  <span className="font-bold text-lg text-[#ff5c7a]">{encodedValue}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-current/10">
                  <p className="text-xs opacity-60">
                    원본 인덱스 {index}가 {encodedValue}로 인코딩됩니다.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">디코딩된 값:</span>
                  <span className="font-bold text-lg text-[#00ffd1]">{decodedValue}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-current/10">
                  <p className="text-xs opacity-60">
                    인코딩된 값 {index}가 {decodedValue}로 디코딩됩니다.
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
