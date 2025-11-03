import { useState } from "react";
import CircularText from "./circular-text";
import CurseScriptCounter from "./curse-script-counter";
import { ScrollVelocity } from "./scroll-velocity";
import LetterGlitch from "./letter-glitch";

export default function CurseScriptPage() {
  const [selectedPM, setSelectedPM] = useState<string>("npm");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);
  const [copiedExample, setCopiedExample] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col-reverse lg:flex-row">
      <div
        className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 font-mono relative z-10 overflow-y-auto overflow-x-hidden bg-black text-[#dc143c]"
      >

        {/* Header */}
        <div className="mb-8 lg:mb-12 relative z-20">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Curse Script</h1>
          <p className="text-base sm:text-lg opacity-80">A JavaScript obfuscator that converts code into cursed spell-like syntax</p>
        </div>

        {/* Introduction */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <p className="text-sm sm:text-base leading-relaxed opacity-90">
            Curse Script transforms your JavaScript code into an arcane, spell-like format using ancient characters.
            Choose from Runic, Old Persian cuneiform, emoji, or custom character sets to obfuscate your code.
          </p>
        </div>

        {/* Interactive Counter */}
        <CurseScriptCounter isDarkMode={true} />

        {/* Features Section */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Features</h2>
          <div className="space-y-2 text-xs sm:text-sm relative z-20">
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>Multiple Character Sets</strong>: Runic, Old Persian, Emoji, or custom characters</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>Full Obfuscation</strong>: Converts JavaScript into unreadable but executable code</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>TypeScript Support</strong>: Complete type definitions included</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>Custom Characters</strong>: Use any Unicode characters for obfuscation</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 opacity-60">→</span>
              <span><strong>Executable Output</strong>: Generated code runs in any JavaScript environment</span>
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
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Install</h2>
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
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Usage Example</h2>
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
                <div className="opacity-60 mb-1">// Default: uses Runic characters</div>
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
                <div className="opacity-60 mb-1">// Use Old Persian characters</div>
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

        {/* How it works */}
        <div className="mb-6 lg:mb-10 relative z-20">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">How It Works</h2>
          <div className="space-y-6 text-xs sm:text-sm relative z-20">
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">Character Set Options</h3>
              <div className="space-y-2 opacity-90">
                <p><strong>Runic</strong>: Uses ancient Runic characters (ᚠ-ᚷ) for mystical obfuscation</p>
                <p><strong>Old Persian</strong>: Employs cuneiform script (𐎠-𐎷) for ancient code aesthetics</p>
                <p><strong>Emoji</strong>: Transforms code into emoji sequences (😀-😗) for playful obfuscation</p>
                <p><strong>None</strong>: Uses Latin characters (A-X) for basic obfuscation without special characters</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">Custom Character Sets</h3>
              <div className="space-y-2 opacity-90">
                <p>You can provide your own array of at least 24 unique Unicode characters.</p>
                <p>The characters will map to variables A-X in order, allowing complete customization.</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2">Obfuscation Process</h3>
              <div className="space-y-2 opacity-90">
                <p>Unlike conventional obfuscators that simply rename identifiers or gzip strings, Curse Script code-golfs every fragment so the payload contains no legible traces of the original program.</p>
                <p>The prelude starts with minimal assignments like <code>A = ''</code> and then abuses coercion (e.g., <code>B = !A + A</code>, <code>D = A + {}</code>) to mine words such as <code>"true"</code>, <code>"false"</code>, and <code>"[object Object]"</code> without ever typing them directly.</p>
                <p>Those harvested substrings are recombined to synthesize critical tokens: <code>E = B[A++]</code> plucks the letter "t", <code>I = D[G+H]</code> reveals "constructor", and stacking them inside <code>J(...)</code> produces a reference to the <code>Function</code> constructor entirely through side effects.</p>
                <p>Each source character is re-expressed via these golfed variables—common glyphs come from a lookup table, while the rest are rebuilt on demand through Unicode escape expressions that even handle surrogate pairs for astral symbols.</p>
                <p>All pieces are concatenated into <code>J(... )();</code>, invoking the synthesized <code>Function</code>; the final pass optionally remaps variables <code>A</code>–<code>X</code> to Runic, Old Persian, emoji, or custom glyphs, cementing the spell-like appearance while keeping the script executable.</p>
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
              GitHub
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
              Wiki
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
              NPM
            </a>
          </div>
          <div className="mt-4 text-xs opacity-60 relative z-20">
            MIT License © hmmhmmhm
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
            characters="𐎠𐎡𐎢𐎣𐎤𐎥𐎦,='𐎧𐎨𐎩𐎪𐎫𐎬𐎭𐎮𐎯𐎰𐎱𐎲𐎳𐎴𐎵𐎶𐎷"
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
