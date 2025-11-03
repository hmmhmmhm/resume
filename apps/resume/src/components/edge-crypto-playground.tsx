import { useEffect, useMemo, useState } from "react";
import type { JSX } from "preact";
import { Lock as LockIcon, Hash as HashIcon, Key as KeyIcon } from "lucide-preact";

const Lock = ({ className, ...props }: any) => <LockIcon class={className} {...props} />;
const Hash = ({ className, ...props }: any) => <HashIcon class={className} {...props} />;
const Key = ({ className, ...props }: any) => <KeyIcon class={className} {...props} />;

type EdgeCryptoModule = typeof import("edge-crypto");

type StatusState = {
  type: "idle" | "success" | "error";
  message: string;
};

type HashAlgorithm = "SHA-256" | "SHA-384" | "SHA-512";

const defaultPlaintext = "Edge Crypto keeps secrets safe across runtimes.";
const defaultPassword = "super-secure-password";
const defaultHashInput = "edge-crypto";
const defaultRsaMessage = "The quick brown fox jumps over the lazy dog";

const hashAlgorithms: HashAlgorithm[] = ["SHA-256", "SHA-384", "SHA-512"];

type PlaygroundTabId = "symmetric" | "hashing" | "rsa";

const playgroundTabs: { id: PlaygroundTabId; icon: any; label: string; description: string }[] = [
  {
    id: "symmetric",
    icon: Lock,
    label: "Symmetric",
    description: "AES-GCM encryption & decryption"
  },
  {
    id: "hashing",
    icon: Hash,
    label: "Hashing",
    description: "Generate SHA digests"
  },
  {
    id: "rsa",
    icon: Key,
    label: "RSA Toolkit",
    description: "Keygen, encrypt, sign, verify"
  }
];

export default function EdgeCryptoPlayground() {
  const [cryptoModule, setCryptoModule] = useState<EdgeCryptoModule | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [checkingSupport, setCheckingSupport] = useState<boolean>(true);

  const [encryptMessage, setEncryptMessage] = useState(defaultPlaintext);
  const [encryptPassword, setEncryptPassword] = useState(defaultPassword);
  const [ciphertextOutput, setCiphertextOutput] = useState<string>("");
  const [encryptBusy, setEncryptBusy] = useState<boolean>(false);
  const [encryptStatus, setEncryptStatus] = useState<StatusState>({ type: "idle", message: "" });

  const [decryptCiphertext, setDecryptCiphertext] = useState<string>("");
  const [decryptPassword, setDecryptPassword] = useState(defaultPassword);
  const [decryptOutput, setDecryptOutput] = useState<string>("");
  const [decryptBusy, setDecryptBusy] = useState<boolean>(false);
  const [decryptStatus, setDecryptStatus] = useState<StatusState>({ type: "idle", message: "" });

  const [hashInput, setHashInput] = useState(defaultHashInput);
  const [hashAlgorithm, setHashAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [hashOutput, setHashOutput] = useState<string>("");
  const [hashBusy, setHashBusy] = useState<boolean>(false);
  const [hashStatus, setHashStatus] = useState<StatusState>({ type: "idle", message: "" });

  const [rsaEncryptionKeyPair, setRsaEncryptionKeyPair] = useState<CryptoKeyPair | null>(null);
  const [rsaEncryptionGenerating, setRsaEncryptionGenerating] = useState<boolean>(false);
  const [rsaEncryptionStatus, setRsaEncryptionStatus] = useState<StatusState>({ type: "idle", message: "" });
  const [rsaEncryptMessage, setRsaEncryptMessage] = useState(defaultRsaMessage);
  const [rsaEncryptCiphertext, setRsaEncryptCiphertext] = useState<string>("");
  const [rsaDecryptCiphertext, setRsaDecryptCiphertext] = useState<string>("");
  const [rsaDecryptOutput, setRsaDecryptOutput] = useState<string>("");
  const [rsaEncryptionBusy, setRsaEncryptionBusy] = useState<boolean>(false);

  const [rsaSigningKeyPair, setRsaSigningKeyPair] = useState<CryptoKeyPair | null>(null);
  const [rsaSigningGenerating, setRsaSigningGenerating] = useState<boolean>(false);
  const [rsaSigningStatus, setRsaSigningStatus] = useState<StatusState>({ type: "idle", message: "" });
  const [rsaSignMessage, setRsaSignMessage] = useState(defaultRsaMessage);
  const [rsaSignature, setRsaSignature] = useState<string>("");
  const [rsaVerifyMessage, setRsaVerifyMessage] = useState(defaultRsaMessage);
  const [rsaVerifySignature, setRsaVerifySignature] = useState<string>("");
  const [rsaSigningBusy, setRsaSigningBusy] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<PlaygroundTabId>("symmetric");

  useEffect(() => {
    let mounted = true;

    import("edge-crypto")
      .then(async (mod) => {
        if (!mounted) return;
        setCryptoModule(mod);
        try {
          const envSupport = mod.isSupported();
          setSupported(envSupport);

          // Auto-run initial operations for demo
          if (envSupport) {
            // Symmetric encryption
            try {
              const encrypted = await mod.encryptToString(defaultPlaintext, defaultPassword);
              setCiphertextOutput(encrypted);
              setDecryptCiphertext(encrypted);
              setEncryptStatus({ type: "success", message: "Encrypted with AES-GCM." });
            } catch (err) {
              console.error("Auto-encrypt failed:", err);
            }

            // Hash
            try {
              const hashResult = await mod.hash(defaultHashInput, "SHA-256");
              setHashOutput(hashResult);
              setHashStatus({ type: "success", message: "Generated SHA-256 digest." });
            } catch (err) {
              console.error("Auto-hash failed:", err);
            }

            // RSA encryption keys and encrypt
            try {
              const encKeys = await mod.generateRSAKeyPair({ modulusLength: 2048 });
              setRsaEncryptionKeyPair(encKeys);
              const rsaEncrypted = await mod.encryptRSA(defaultRsaMessage, encKeys.publicKey);
              setRsaEncryptCiphertext(rsaEncrypted);
              setRsaDecryptCiphertext(rsaEncrypted);
              setRsaEncryptionStatus({ type: "success", message: "RSA-OAEP key pair ready." });
            } catch (err) {
              console.error("Auto-RSA-encrypt failed:", err);
            }

            // RSA signing keys and sign
            try {
              const signKeys = await mod.generateRSASigningKeyPair({ modulusLength: 2048 });
              setRsaSigningKeyPair(signKeys);
              const signature = await mod.signRSA(defaultRsaMessage, signKeys.privateKey);
              setRsaSignature(signature);
              setRsaVerifyMessage(defaultRsaMessage);
              setRsaVerifySignature(signature);
              setRsaSigningStatus({ type: "success", message: "RSA signing key pair ready." });
            } catch (err) {
              console.error("Auto-RSA-sign failed:", err);
            }
          }
        } catch (error) {
          console.error(error);
          setSupported(null);
          setLoadError("Unable to detect SubtleCrypto support.");
        }
      })
      .catch((error: unknown) => {
        console.error(error);
        if (mounted) {
          setLoadError(
            "edge-crypto failed to load. Ensure the dependency is installed and available on the client."
          );
        }
      })
      .finally(() => {
        if (mounted) {
          setCheckingSupport(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const installHint = useMemo(() => {
    if (loadError) {
      return "Run `pnpm add edge-crypto` inside apps/resume to enable the playground.";
    }
    if (checkingSupport) {
      return "Checking SubtleCrypto availability...";
    }
    if (supported === false) {
      return "SubtleCrypto is not available in this environment.";
    }
    return null;
  }, [checkingSupport, loadError, supported]);

  const isReady = cryptoModule && supported !== false;

  async function handleSymmetricEncrypt() {
    if (!cryptoModule) {
      setEncryptStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    if (!encryptMessage.trim()) {
      setEncryptStatus({ type: "error", message: "Provide a message to encrypt." });
      return;
    }
    if (!encryptPassword.trim()) {
      setEncryptStatus({ type: "error", message: "Provide a password." });
      return;
    }

    setEncryptBusy(true);
    setEncryptStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.encryptToString(encryptMessage, encryptPassword);
      setCiphertextOutput(result);
      setDecryptCiphertext(result);
      setDecryptOutput("(awaiting decryption)");
      setEncryptStatus({ type: "success", message: "Encrypted with AES-GCM." });
    } catch (error) {
      console.error(error);
      setEncryptStatus({
        type: "error",
        message: "Encryption failed. Ensure SubtleCrypto is supported."
      });
    } finally {
      setEncryptBusy(false);
    }
  }

  async function handleSymmetricDecrypt() {
    if (!cryptoModule) {
      setDecryptStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    if (!decryptCiphertext.trim()) {
      setDecryptStatus({ type: "error", message: "Paste a ciphertext generated with AES-GCM." });
      return;
    }
    if (!decryptPassword.trim()) {
      setDecryptStatus({ type: "error", message: "Provide the password used for encryption." });
      return;
    }

    setDecryptBusy(true);
    setDecryptStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.decryptFromString(decryptCiphertext, decryptPassword);
      setDecryptOutput(result);
      setDecryptStatus({ type: "success", message: "Ciphertext decrypted successfully." });
    } catch (error) {
      console.error(error);
      setDecryptStatus({
        type: "error",
        message: "Decryption failed. Double-check the password or ciphertext."
      });
    } finally {
      setDecryptBusy(false);
    }
  }

  async function handleHash() {
    if (!cryptoModule) {
      setHashStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    if (!hashInput.trim()) {
      setHashStatus({ type: "error", message: "Provide input to hash." });
      return;
    }

    setHashBusy(true);
    setHashStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.hash(hashInput, hashAlgorithm);
      setHashOutput(result);
      setHashStatus({ type: "success", message: `Generated ${hashAlgorithm} digest.` });
    } catch (error) {
      console.error(error);
      setHashStatus({ type: "error", message: "Hashing failed." });
    } finally {
      setHashBusy(false);
    }
  }

  async function handleGenerateRSAEncryptionKeys() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    setRsaEncryptionGenerating(true);
    setRsaEncryptionStatus({ type: "idle", message: "" });
    try {
      const keys = await cryptoModule.generateRSAKeyPair({ modulusLength: 2048 });
      setRsaEncryptionKeyPair(keys);
      setRsaEncryptCiphertext("");
      setRsaDecryptCiphertext("");
      setRsaDecryptOutput("");
      setRsaEncryptionStatus({ type: "success", message: "RSA-OAEP key pair ready." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: "RSA-OAEP key generation failed." });
    } finally {
      setRsaEncryptionGenerating(false);
    }
  }

  async function handleRSAEncryptMessage() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    if (!rsaEncryptionKeyPair) {
      setRsaEncryptionStatus({ type: "error", message: "Generate an RSA key pair first." });
      return;
    }
    if (!rsaEncryptMessage.trim()) {
      setRsaEncryptionStatus({ type: "error", message: "Provide a message to encrypt." });
      return;
    }

    setRsaEncryptionBusy(true);
    setRsaEncryptionStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.encryptRSA(rsaEncryptMessage, rsaEncryptionKeyPair.publicKey);
      setRsaEncryptCiphertext(result);
      setRsaDecryptCiphertext(result);
      setRsaDecryptOutput("(awaiting decryption)");
      setRsaEncryptionStatus({ type: "success", message: "Encrypted with RSA-OAEP." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: "RSA encryption failed." });
    } finally {
      setRsaEncryptionBusy(false);
    }
  }

  async function handleRSADecryptMessage() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    if (!rsaEncryptionKeyPair) {
      setRsaEncryptionStatus({ type: "error", message: "Generate an RSA key pair first." });
      return;
    }
    if (!rsaDecryptCiphertext.trim()) {
      setRsaEncryptionStatus({ type: "error", message: "Paste a ciphertext to decrypt." });
      return;
    }

    setRsaEncryptionBusy(true);
    setRsaEncryptionStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.decryptRSA(rsaDecryptCiphertext, rsaEncryptionKeyPair.privateKey);
      setRsaDecryptOutput(result);
      setRsaEncryptionStatus({ type: "success", message: "Ciphertext decrypted with private key." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: "RSA decryption failed." });
    } finally {
      setRsaEncryptionBusy(false);
    }
  }

  async function handleGenerateRSASigningKeys() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    setRsaSigningGenerating(true);
    setRsaSigningStatus({ type: "idle", message: "" });
    try {
      const keys = await cryptoModule.generateRSASigningKeyPair({ modulusLength: 2048 });
      setRsaSigningKeyPair(keys);
      setRsaSignature("");
      setRsaVerifySignature("");
      setRsaSigningStatus({ type: "success", message: "RSA signing key pair ready." });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: "RSA signing key generation failed." });
    } finally {
      setRsaSigningGenerating(false);
    }
  }

  async function handleRSASignMessage() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    if (!rsaSigningKeyPair) {
      setRsaSigningStatus({ type: "error", message: "Generate a signing key pair first." });
      return;
    }
    if (!rsaSignMessage.trim()) {
      setRsaSigningStatus({ type: "error", message: "Provide a message to sign." });
      return;
    }

    setRsaSigningBusy(true);
    setRsaSigningStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.signRSA(rsaSignMessage, rsaSigningKeyPair.privateKey);
      setRsaSignature(result);
      setRsaVerifyMessage(rsaSignMessage);
      setRsaVerifySignature(result);
      setRsaSigningStatus({ type: "success", message: "Message signed with RSA-PSS." });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: "RSA signing failed." });
    } finally {
      setRsaSigningBusy(false);
    }
  }

  async function handleRSAVerifySignature() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: "edge-crypto is still loading." });
      return;
    }
    if (!rsaSigningKeyPair) {
      setRsaSigningStatus({ type: "error", message: "Generate a signing key pair first." });
      return;
    }
    if (!rsaVerifySignature.trim()) {
      setRsaSigningStatus({ type: "error", message: "Provide a signature to verify." });
      return;
    }

    setRsaSigningBusy(true);
    setRsaSigningStatus({ type: "idle", message: "" });
    try {
      const valid = await cryptoModule.verifyRSA(
        rsaVerifyMessage,
        rsaVerifySignature,
        rsaSigningKeyPair.publicKey
      );
      setRsaSigningStatus({
        type: valid ? "success" : "error",
        message: valid ? "Signature verified with public key." : "Signature verification failed."
      });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: "RSA verification failed." });
    } finally {
      setRsaSigningBusy(false);
    }
  }

  const renderSymmetricTab = () => (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">Encrypt to ciphertext</h4>
            <p className="text-xs text-white/60">AES-GCM with password-derived keys.</p>
          </div>
          {encryptBusy && <span className="text-xs text-white/50 animate-pulse">Encrypting…</span>}
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">Message</label>
        <textarea
          value={encryptMessage}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setEncryptMessage(event.currentTarget.value)
          }
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">Password</label>
        <input
          type="text"
          value={encryptPassword}
          onChange={(event: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            setEncryptPassword(event.currentTarget.value)
          }
          className="w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleSymmetricEncrypt}
            disabled={!isReady || encryptBusy}
            className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Encrypt
          </button>
        </div>
        {encryptStatus.message && (
          <p
            className={`text-xs ${
              encryptStatus.type === "error"
                ? "text-red-300"
                : encryptStatus.type === "success"
                  ? "text-emerald-300"
                  : "text-white/60"
            }`}
          >
            {encryptStatus.message}
          </p>
        )}
        {ciphertextOutput && (
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-white/40">Ciphertext (Base64)</label>
            <textarea
              readOnly
              value={ciphertextOutput}
              className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono text-emerald-100 focus:outline-none"
            />
          </div>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">Decrypt ciphertext</h4>
            <p className="text-xs text-white/60">Paste an AES-GCM payload and recover the plaintext.</p>
          </div>
          {decryptBusy && <span className="text-xs text-white/50 animate-pulse">Decrypting…</span>}
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">Ciphertext</label>
        <textarea
          value={decryptCiphertext}
          placeholder="Paste ciphertext generated from encryptToString"
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setDecryptCiphertext(event.currentTarget.value)
          }
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">Password</label>
        <input
          type="text"
          value={decryptPassword}
          onChange={(event: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            setDecryptPassword(event.currentTarget.value)
          }
          className="w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleSymmetricDecrypt}
            disabled={!isReady || decryptBusy}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Decrypt
          </button>
        </div>
        {decryptStatus.message && (
          <p
            className={`text-xs ${
              decryptStatus.type === "error"
                ? "text-red-300"
                : decryptStatus.type === "success"
                  ? "text-emerald-300"
                  : "text-white/60"
            }`}
          >
            {decryptStatus.message}
          </p>
        )}
        {decryptOutput && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs">
            <div className="mb-1 text-emerald-200/70">Plaintext</div>
            <div className="font-mono text-emerald-100 whitespace-pre-wrap break-words">{decryptOutput}</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderHashingTab = () => (
    <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h4 className="font-semibold">Hashing</h4>
          <p className="text-xs text-white/60">Generate digests with SHA-{hashAlgorithm.slice(4)}</p>
        </div>
        <select
          value={hashAlgorithm}
          onChange={(event: JSX.TargetedEvent<HTMLSelectElement, Event>) =>
            setHashAlgorithm(event.currentTarget.value as HashAlgorithm)
          }
          className="rounded-md border border-white/10 bg-black/60 p-1 text-xs focus:border-emerald-400 focus:outline-none"
        >
          {hashAlgorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>
      </header>
      <input
        type="text"
        value={hashInput}
        onChange={(event: JSX.TargetedEvent<HTMLInputElement, Event>) =>
          setHashInput(event.currentTarget.value)
        }
        className="w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
      />
      <button
        onClick={handleHash}
        disabled={!isReady || hashBusy}
        className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {hashBusy ? "Hashing…" : "Hash value"}
      </button>
      {hashStatus.message && (
        <p
          className={`text-xs ${
            hashStatus.type === "error"
              ? "text-red-300"
              : hashStatus.type === "success"
                ? "text-emerald-300"
                : "text-white/60"
          }`}
        >
          {hashStatus.message}
        </p>
      )}
      {hashOutput && (
        <div className="rounded-lg border border-white/10 bg-black/60 p-3 text-xs">
          <div className="mb-1 text-white/50">Digest ({hashAlgorithm})</div>
          <div className="break-all font-mono">{hashOutput}</div>
          <div className="mt-2 text-[0.7rem] uppercase tracking-wide text-white/40">
            Length: {hashOutput.length} chars (base64)
          </div>
        </div>
      )}
    </div>
  );

  const renderRsaTab = () => (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">RSA-OAEP Encryption</h4>
            <p className="text-xs text-white/60">Generate keys in-browser, then encrypt and decrypt messages.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            {rsaEncryptionBusy && <span className="animate-pulse">Running…</span>}
            <button
              onClick={handleGenerateRSAEncryptionKeys}
              disabled={!isReady || rsaEncryptionGenerating}
              className="rounded-lg bg-emerald-500/20 px-3 py-1.5 font-semibold text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {rsaEncryptionGenerating ? "Generating…" : rsaEncryptionKeyPair ? "Regenerate" : "Generate"}
            </button>
          </div>
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">Message to encrypt</label>
        <textarea
          value={rsaEncryptMessage}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setRsaEncryptMessage(event.currentTarget.value)
          }
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            onClick={handleRSAEncryptMessage}
            disabled={!isReady || rsaEncryptionBusy || !rsaEncryptionKeyPair}
            className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Encrypt
          </button>
        </div>
        {rsaEncryptionStatus.message && (
          <p
            className={`text-xs ${
              rsaEncryptionStatus.type === "error"
                ? "text-red-300"
                : rsaEncryptionStatus.type === "success"
                  ? "text-emerald-300"
                  : "text-white/60"
            }`}
          >
            {rsaEncryptionStatus.message}
          </p>
        )}
        {rsaEncryptCiphertext && (
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-white/40">Ciphertext (Base64)</label>
            <textarea
              readOnly
              value={rsaEncryptCiphertext}
              className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono text-emerald-100 focus:outline-none"
            />
          </div>
        )}
        <label className="text-xs uppercase tracking-wide text-white/40">Ciphertext to decrypt</label>
        <textarea
          value={rsaDecryptCiphertext}
          placeholder="Paste ciphertext generated with RSA-OAEP"
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setRsaDecryptCiphertext(event.currentTarget.value)
          }
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono focus:border-emerald-400 focus:outline-none"
        />
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            onClick={handleRSADecryptMessage}
            disabled={!isReady || rsaEncryptionBusy || !rsaEncryptionKeyPair}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Decrypt
          </button>
        </div>
        {rsaDecryptOutput && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs">
            <div className="mb-1 text-emerald-200/70">Plaintext</div>
            <div className="font-mono text-emerald-100 whitespace-pre-wrap break-words">{rsaDecryptOutput}</div>
          </div>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">RSA-PSS Signing</h4>
            <p className="text-xs text-white/60">Sign messages with RSA-PSS and verify using the paired public key.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            {rsaSigningBusy && <span className="animate-pulse">Running…</span>}
            <button
              onClick={handleGenerateRSASigningKeys}
              disabled={!isReady || rsaSigningGenerating}
              className="rounded-lg bg-emerald-500/20 px-3 py-1.5 font-semibold text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {rsaSigningGenerating ? "Generating…" : rsaSigningKeyPair ? "Regenerate" : "Generate"}
            </button>
          </div>
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">Message to sign</label>
        <textarea
          value={rsaSignMessage}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setRsaSignMessage(event.currentTarget.value)
          }
          className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            onClick={handleRSASignMessage}
            disabled={!isReady || rsaSigningBusy || !rsaSigningKeyPair}
            className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sign
          </button>
        </div>
        {rsaSigningStatus.message && (
          <p
            className={`text-xs ${
              rsaSigningStatus.type === "error"
                ? "text-red-300"
                : rsaSigningStatus.type === "success"
                  ? "text-emerald-300"
                  : "text-white/60"
            }`}
          >
            {rsaSigningStatus.message}
          </p>
        )}
        {rsaSignature && (
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-white/40">Signature (Base64)</label>
            <textarea
              readOnly
              value={rsaSignature}
              className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono text-emerald-100 focus:outline-none"
            />
          </div>
        )}
        <label className="text-xs uppercase tracking-wide text-white/40">Message to verify</label>
        <textarea
          value={rsaVerifyMessage}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setRsaVerifyMessage(event.currentTarget.value)
          }
          className="min-h-[60px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">Signature to verify</label>
        <textarea
          value={rsaVerifySignature}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setRsaVerifySignature(event.currentTarget.value)
          }
          className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono focus:border-emerald-400 focus:outline-none"
        />
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            onClick={handleRSAVerifySignature}
            disabled={!isReady || rsaSigningBusy || !rsaSigningKeyPair}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-white shadow-xl shadow-emerald-500/10 backdrop-blur">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/90">Live Playground</p>
          <h3 className="text-xl font-semibold">Try edge-crypto in your browser</h3>
        </div>
        {installHint && (
          <div className="text-xs text-emerald-200/70 sm:text-right">{installHint}</div>
        )}
      </div>

      {loadError && (
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          {loadError}
        </div>
      )}

      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {playgroundTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === tab.id ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {tab.label}
              <span className="ml-2 hidden text-[0.65rem] uppercase tracking-wider md:inline">{tab.description}</span>
            </button>
          ))}
        </div>

        {activeTab === "symmetric" && renderSymmetricTab()}
        {activeTab === "hashing" && renderHashingTab()}
        {activeTab === "rsa" && renderRsaTab()}
      </div>
    </div>
  );
}
