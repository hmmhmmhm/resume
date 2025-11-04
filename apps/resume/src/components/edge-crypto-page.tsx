import { useState } from "react";
import { Lock as LockIcon, PenTool as PenToolIcon, KeyRound as KeyRoundIcon, Wrench as WrenchIcon, Shield as ShieldIcon, Hash as HashIcon, Key as KeyIcon, Globe as GlobeIcon, Package as PackageIcon, Code as CodeIcon, Zap as ZapIcon, CheckCircle as CheckCircleIcon, Award as AwardIcon } from "lucide-preact";
import CircularText from "./circular-text";
import LetterGlitch from "./letter-glitch";
import EdgeCryptoPlayground from "./edge-crypto-playground";

const Lock = ({ className, ...props }: any) => <LockIcon class={className} {...props} />;
const PenTool = ({ className, ...props }: any) => <PenToolIcon class={className} {...props} />;
const KeyRound = ({ className, ...props }: any) => <KeyRoundIcon class={className} {...props} />;
const Wrench = ({ className, ...props }: any) => <WrenchIcon class={className} {...props} />;
const Shield = ({ className, ...props }: any) => <ShieldIcon class={className} {...props} />;
const Hash = ({ className, ...props }: any) => <HashIcon class={className} {...props} />;
const Key = ({ className, ...props }: any) => <KeyIcon class={className} {...props} />;
const Globe = ({ className, ...props }: any) => <GlobeIcon class={className} {...props} />;
const Package = ({ className, ...props }: any) => <PackageIcon class={className} {...props} />;
const Code = ({ className, ...props }: any) => <CodeIcon class={className} {...props} />;
const Zap = ({ className, ...props }: any) => <ZapIcon class={className} {...props} />;
const CheckCircle = ({ className, ...props }: any) => <CheckCircleIcon class={className} {...props} />;
const Award = ({ className, ...props }: any) => <AwardIcon class={className} {...props} />;

const featureList = [
  {
    icon: Globe,
    title: "Universal runtime support",
    description: "Works seamlessly in Node.js 20+, modern browsers, Cloudflare Workers, Deno, and Bun."
  },
  {
    icon: Package,
    title: "Zero dependencies",
    description: "Relies entirely on the native SubtleCrypto API—no heavyweight crypto packages required."
  },
  {
    icon: Code,
    title: "TypeScript-first",
    description: "Ships complete type definitions with JSDoc so editors surface hints for every helper."
  },
  {
    icon: Zap,
    title: "Simple API surface",
    description: "From AES encryption to RSA signing, every helper is designed with clear, promise-based ergonomics."
  },
  {
    icon: CheckCircle,
    title: "Well tested",
    description: "Battle-hardened through 55+ unit tests covering encryption, signing, hashing, and serialization."
  },
  {
    icon: Award,
    title: "Production-grade RSA",
    description: "Includes RSA-OAEP encryption and RSA-PSS / RSASSA-PKCS1-v1_5 signing in one toolkit."
  }
];

const apiHighlights = [
  {
    icon: Lock,
    title: "Encryption",
    description: "AES-GCM by default, AES-CBC optional, helper objects for serialising ciphertext in one string.",
    points: [
      "encrypt / decrypt mirror each other with shared option objects",
      "encryptToString / decryptFromString collapse payloads into a single base64 string",
      "Custom key length (128 / 192 / 256) and IV support for advanced workflows"
    ]
  },
  {
    icon: PenTool,
    title: "Signing",
    description: "HMAC helpers for symmetric signing plus ergonomic wrappers for verification.",
    points: [
      "sign and verify return base64 signatures you can store anywhere",
      "Swap hashing algorithms between SHA-256, SHA-384, or SHA-512",
      "generateKey creates secure random secrets in one call"
    ]
  },
  {
    icon: KeyRound,
    title: "RSA toolkit",
    description: "End-to-end RSA flows covering key generation, encryption, signing, and import/export.",
    points: [
      "generateRSAKeyPair and generateRSASigningKeyPair with configurable modulus length",
      "encryptRSA / decryptRSA implement RSA-OAEP with SHA-256",
      "signRSA / verifyRSA handle RSA-PSS and RSASSA-PKCS1-v1_5"
    ]
  },
  {
    icon: Wrench,
    title: "Utility helpers",
    description: "Pragmatic conversions so you can move between ArrayBuffers, strings, and base64 effortlessly.",
    points: [
      "stringToUint8Array & uint8ArrayToString for encoding boundaries",
      "arrayBufferToBase64 & base64ToArrayBuffer for network transport",
      "generateSalt & generateIV ensure cryptographically secure randomness"
    ]
  }
];

const platformSupport = [
  "Node.js 20+",
  "Modern browsers (Chrome, Firefox, Safari, Edge)",
  "Cloudflare Workers",
  "Deno",
  "Bun"
];

const securityNotes = [
  "Derives keys with PBKDF2 using 100,000 iterations",
  "Generates cryptographically secure IVs and salts for each operation",
  "AES-GCM delivers authenticated encryption out of the box",
  "All operations defer to the native SubtleCrypto primitives"
];

const usageExamples = [
  {
    id: "support",
    icon: Shield,
    label: "Check environment support",
    description: "Detect whether SubtleCrypto is ready before kicking off expensive tasks.",
    code: `import { isSupported } from 'edge-crypto';

if (isSupported()) {
  console.log('SubtleCrypto is available!');
  // Proceed with crypto operations
} else {
  console.error('SubtleCrypto is not supported in this environment');
  // Fallback or error handling
}`
  },
  {
    id: "encrypt",
    icon: Lock,
    label: "Encrypt & decrypt",
    description: "AES helpers keep secrets portable with minimal configuration.",
    code: `import { encryptToString, decryptFromString } from 'edge-crypto';

const encrypted = await encryptToString('my-secret-data', 'my-password');
const decrypted = await decryptFromString(encrypted, 'my-password');

const encryptedCustom = await encryptToString('my-secret-data', 'my-password', {
  algorithm: 'AES-GCM',
  keyLength: 256,
});`
  },
  {
    id: "sign",
    icon: PenTool,
    label: "Sign & verify",
    description: "HMAC wrappers give you secure signatures with pluggable hashing algorithms.",
    code: `import { generateKey, sign, verify } from 'edge-crypto';

const secretKey = generateKey();
const signature = await sign('my-message', secretKey, { hash: 'SHA-512' });
const isValid = await verify('my-message', signature, secretKey, { hash: 'SHA-512' });`
  },
  {
    id: "hash",
    icon: Hash,
    label: "Hash data",
    description: "Generate SHA digests without pulling more dependencies into your bundle.",
    code: `import { hash } from 'edge-crypto';

const hash256 = await hash('my-data');
const hash384 = await hash('my-data', 'SHA-384');
const hash512 = await hash('my-data', 'SHA-512');`
  },
  {
    id: "rsa",
    icon: Key,
    label: "RSA encryption & signing",
    description: "Generate keys, encrypt secrets, and verify signatures with RSA-OAEP and RSA-PSS.",
    code: `import {
  generateRSAKeyPair,
  encryptRSA,
  decryptRSA,
  signRSA,
  verifyRSA,
} from 'edge-crypto';

const keyPair = await generateRSAKeyPair({ modulusLength: 2048 });
const ciphertext = await encryptRSA('secret data', keyPair.publicKey);
const plaintext = await decryptRSA(ciphertext, keyPair.privateKey);
const signature = await signRSA('my message', keyPair.privateKey);
const valid = await verifyRSA('my message', signature, keyPair.publicKey);`
  }
];

const installCommands: Record<"npm" | "pnpm" | "yarn", string> = {
  npm: "npm install edge-crypto",
  pnpm: "pnpm add edge-crypto",
  yarn: "yarn add edge-crypto"
};

const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/hmmhmmhm/node-packages/tree/main/packages/edge-crypto"
  },
  {
    label: "NPM",
    href: "https://www.npmjs.com/package/edge-crypto"
  },
  {
    label: "README",
    href: "https://github.com/hmmhmmhm/node-packages/blob/main/packages/edge-crypto/README.md"
  }
];

export default function EdgeCryptoPage() {
  const [selectedPM, setSelectedPM] = useState<"npm" | "pnpm" | "yarn">("npm");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeUsage, setActiveUsage] = useState<string>(usageExamples[0].id);
  const [copiedUsage, setCopiedUsage] = useState(false);

  const activeUsageExample = usageExamples.find((example) => example.id === activeUsage) ?? usageExamples[0];

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCommands[selectedPM]);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyUsage = async () => {
    try {
      await navigator.clipboard.writeText(activeUsageExample.code);
      setCopiedUsage(true);
      setTimeout(() => setCopiedUsage(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 pb-24 font-mono relative z-10 overflow-y-auto overflow-x-hidden bg-black text-white">
        <div className="mb-10 lg:mb-14 relative z-20 space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">SubtleCrypto Toolkit</p>
          <h1 className="text-3xl sm:text-4xl font-bold">Edge Crypto</h1>
          <p className="text-base sm:text-lg text-white/80">
            Unified SubtleCrypto utilities for edge runtimes. <span className="font-semibold text-emerald-300">Zero bundling overhead</span>—encrypt, sign, hash, and manage RSA keys without
            pulling in heavyweight dependencies.
          </p>
        </div>

        <section className="mb-12">
          <EdgeCryptoPlayground />
        </section>

        <section className="mb-12 space-y-4">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">Install</h2>
              <p className="text-sm text-white/70">Pick your package manager and pull the toolkit into your project.</p>
            </div>
            <div className="flex gap-2">
              {(["npm", "pnpm", "yarn"] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setSelectedPM(pm)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    selectedPM === pm ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          </header>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/60 p-4 text-xs sm:text-sm">
            <code className="flex-1 break-all text-emerald-100">{installCommands[selectedPM]}</code>
            <button
              onClick={handleCopyInstall}
              className="flex items-center gap-2 rounded-md bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-100 transition hover:bg-emerald-500/30"
            >
              {copiedInstall ? "Copied" : "Copy"}
            </button>
          </div>
        </section>

        <section className="mb-10 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Why teams adopt Edge Crypto</h2>
          <div className="space-y-3 text-sm sm:text-base text-white/80">
            {featureList.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="mt-0.5 rounded-lg bg-emerald-500/10 p-2 text-emerald-300">
                  <feature.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white">{feature.title}</p>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">Usage recipes</h2>
              <p className="text-sm text-white/70">Jumpstart common tasks with promise-friendly helpers.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {usageExamples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => {
                    setActiveUsage(example.id);
                    setCopiedUsage(false);
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeUsage === example.id
                      ? "bg-emerald-500/20 text-emerald-200"
                      : "bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  <example.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {example.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-white/70">{activeUsageExample.description}</p>
          <div className="rounded-xl border border-white/10 bg-black/60 p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-white/50">
              <span>JavaScript</span>
              <button
                onClick={handleCopyUsage}
                className="rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
              >
                {copiedUsage ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto text-xs leading-relaxed text-emerald-100">
              <code>{activeUsageExample.code}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">API highlights</h2>
          <div className="space-y-6">
            {apiHighlights.map((api) => (
              <article key={api.title} className="rounded-xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-300">
                    <api.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-base font-semibold text-white">{api.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{api.description}</p>
                    </div>
                    <ul className="space-y-2 text-sm text-white/65">
                      {api.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="text-emerald-300" aria-hidden="true">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 space-y-6">
          <div className="rounded-xl border border-white/10 bg-black/40 p-5">
            <h2 className="text-lg font-semibold">Security posture</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {securityNotes.map((note) => (
                <li key={note} className="flex gap-2">
                  <span className="text-emerald-300" aria-hidden="true">✔</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-5">
            <h2 className="text-lg font-semibold">Platform support</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {platformSupport.map((platform) => (
                <li key={platform} className="flex gap-2">
                  <span className="text-emerald-300" aria-hidden="true">▸</span>
                  <span>{platform}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4 border-t border-white/10 pt-8">
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-white/80">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 transition hover:bg-white/10"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>
          <div className="text-xs text-white/50">MIT License © hmmhmmhm</div>
        </section>
      </div>

      <div className="w-full lg:w-1/2 lg:flex-1 relative h-[250px] sm:h-[300px] lg:h-auto overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
            glitchColors={["#03170B", "#066F3C", "#0BC56F", "#82F2A0"]}
            characters="PRIME0123456789⊕⊗∧∨≡"
          />
        </div>
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-40 h-40 sm:w-48 sm:h-48 z-20 mix-blend-difference lg:hidden">
          <CircularText
            text="EDGE CRYPTO * EDGE CRYPTO * EDGE CRYPTO * EDGE CRYPTO * "
            onHover="speedUp"
            spinDuration={20}
            className="text-xs sm:text-sm font-mono font-black text-[#f5f5f5]"
          />
        </div>
      </div>

      <div className="hidden lg:block fixed bottom-12 right-12 w-56 h-56 z-50 mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <CircularText
            text="EDGE CRYPTO * EDGE CRYPTO * EDGE CRYPTO * EDGE CRYPTO * "
            onHover="speedUp"
            spinDuration={20}
            className="text-base font-mono font-black text-[#f5f5f5]"
          />
        </div>
      </div>
    </div>
  );
}
