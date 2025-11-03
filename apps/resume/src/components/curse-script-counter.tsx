import { useState, useEffect } from "react";
import { curse } from "curse-script";
import GradientText from "./gradient-text";

type CharacterSet = "runic" | "oldPersian" | "emoji" | "none";

export default function CurseScriptCounter({ isDarkMode }: { isDarkMode: boolean }) {
  const [inputCode, setInputCode] = useState<string>("");
  const [cursedOutput, setCursedOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedCharSet, setSelectedCharSet] = useState<CharacterSet>("oldPersian");

  // Initialize with example code
  useEffect(() => {
    const exampleCode = 'console.log("Hello World")';
    setInputCode(exampleCode);
    const result = curse(exampleCode, { characterSet: "oldPersian" });
    setCursedOutput(result);
  }, []);

  const handleConvert = (value: string) => {
    setInputCode(value);
    if (value.trim() !== "") {
      try {
        const result = curse(value, { characterSet: selectedCharSet });
        setCursedOutput(result);
      } catch (error) {
        setCursedOutput("Error: Invalid JavaScript code");
      }
    } else {
      setCursedOutput("");
    }
  };

  const handleCharSetChange = (charSet: CharacterSet) => {
    setSelectedCharSet(charSet);
    if (inputCode.trim() !== "") {
      try {
        const result = curse(inputCode, { characterSet: charSet });
        setCursedOutput(result);
      } catch (error) {
        setCursedOutput("Error: Invalid JavaScript code");
      }
    }
  };

  const handleCopy = () => {
    if (cursedOutput) {
      navigator.clipboard.writeText(cursedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRandomize = () => {
    const examples = [
      'alert(1)',
      'console.log("hi?")',
      'console.log("Hello World")',
      'alert("test")',
      'console.warn("warning")',
      'Math.random()',
    ];
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    setInputCode(randomExample);
    try {
      const result = curse(randomExample, { characterSet: selectedCharSet });
      setCursedOutput(result);
    } catch (error) {
      setCursedOutput("Error: Invalid JavaScript code");
    }
  };

  return (
    <div className="mb-6 lg:mb-10 relative z-20">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Try It Out</h2>
      <div className="space-y-4">
        {/* Character Set Selection */}
        <div className="space-y-2">
          <label className="block text-xs opacity-50 mb-1.5">
            Character Set
          </label>
          <div className="flex gap-2 flex-wrap">
            {(["runic", "oldPersian", "emoji", "none"] as CharacterSet[]).map((charSet) => (
              <button
                key={charSet}
                onClick={() => handleCharSetChange(charSet)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${selectedCharSet === charSet
                  ? "bg-white/10 text-[#dc143c]"
                  : "opacity-50 hover:opacity-70"
                  }`}
              >
                {charSet === "oldPersian" ? "Old Persian" : charSet.charAt(0).toUpperCase() + charSet.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* JavaScript Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm opacity-70">
              JavaScript Code
            </label>
            <button
              onClick={handleRandomize}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                }`}
              title="Random Example"
            >
              🎲 Random
            </button>
          </div>
          <textarea
            value={inputCode}
            onChange={(e) => handleConvert((e.target as HTMLTextAreaElement).value)}
            placeholder='Enter JavaScript code (e.g., console.log("Hello"))'
            rows={3}
            className={`w-full px-3 py-2 rounded text-xs sm:text-sm font-mono transition-colors resize-none ${isDarkMode
              ? "bg-white/5 text-[#dc143c] placeholder-white/20 focus:bg-white/10"
              : "bg-black/5 text-[#dc143c] placeholder-black/20 focus:bg-black/10"
              } outline-none focus:ring-1 ${isDarkMode ? "focus:ring-[#dc143c]/30" : "focus:ring-[#dc143c]/30"}`}
          />
        </div>

        {/* Cursed Output */}
        {cursedOutput && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm opacity-70">
                Cursed Output
              </label>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                title="Copy"
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className={`px-4 py-4 rounded font-mono text-xs sm:text-sm break-all overflow-x-auto max-h-[400px] overflow-y-auto ${isDarkMode ? "bg-white/10" : "bg-black/10"
              }`}>
              {selectedCharSet === "emoji" ? (
                <div className="font-bold text-white">
                  {cursedOutput}
                </div>
              ) : (
                <GradientText
                  colors={["#8B0000", "#DC143C", "#FF0000", "#B22222", "#8B0000", "#DC143C"]}
                  animationSpeed={6}
                  className="font-bold"
                >
                  {cursedOutput}
                </GradientText>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
