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

const getPlaygroundLabels = (isKorean: boolean) => ({
  symmetric: {
    encryptTitle: isKorean ? "암호문으로 암호화" : "Encrypt to ciphertext",
    encryptDesc: isKorean ? "비밀번호 기반 키를 사용한 AES-GCM." : "AES-GCM with password-derived keys.",
    encrypting: isKorean ? "암호화 중…" : "Encrypting…",
    message: isKorean ? "메시지" : "Message",
    password: isKorean ? "비밀번호" : "Password",
    encrypt: isKorean ? "암호화" : "Encrypt",
    ciphertextBase64: isKorean ? "암호문 (Base64)" : "Ciphertext (Base64)",
    decryptTitle: isKorean ? "암호문 복호화" : "Decrypt ciphertext",
    decryptDesc: isKorean ? "AES-GCM 페이로드를 붙여넣고 평문을 복구합니다." : "Paste an AES-GCM payload and recover the plaintext.",
    decrypting: isKorean ? "복호화 중…" : "Decrypting…",
    ciphertext: isKorean ? "암호문" : "Ciphertext",
    ciphertextPlaceholder: isKorean ? "encryptToString에서 생성된 암호문을 붙여넣으세요" : "Paste ciphertext generated from encryptToString",
    decrypt: isKorean ? "복호화" : "Decrypt",
    plaintext: isKorean ? "평문" : "Plaintext"
  },
  hashing: {
    title: isKorean ? "해싱" : "Hashing",
    desc: (algo: string) => isKorean ? `SHA-${algo.slice(4)}로 다이제스트 생성` : `Generate digests with SHA-${algo.slice(4)}`,
    hashValue: isKorean ? "해시 값" : "Hash value",
    hashing: isKorean ? "해싱 중…" : "Hashing…",
    digest: isKorean ? "다이제스트" : "Digest",
    length: isKorean ? "길이" : "Length",
    chars: isKorean ? "문자" : "chars"
  },
  rsa: {
    encryptionTitle: isKorean ? "RSA-OAEP 암호화" : "RSA-OAEP Encryption",
    encryptionDesc: isKorean ? "브라우저에서 키를 생성한 다음 메시지를 암호화하고 복호화합니다." : "Generate keys in-browser, then encrypt and decrypt messages.",
    running: isKorean ? "실행 중…" : "Running…",
    generating: isKorean ? "생성 중…" : "Generating…",
    generate: isKorean ? "생성" : "Generate",
    regenerate: isKorean ? "재생성" : "Regenerate",
    messageToEncrypt: isKorean ? "암호화할 메시지" : "Message to encrypt",
    encrypt: isKorean ? "암호화" : "Encrypt",
    ciphertextBase64: isKorean ? "암호문 (Base64)" : "Ciphertext (Base64)",
    ciphertextToDecrypt: isKorean ? "복호화할 암호문" : "Ciphertext to decrypt",
    ciphertextPlaceholder: isKorean ? "RSA-OAEP로 생성된 암호문을 붙여넣으세요" : "Paste ciphertext generated with RSA-OAEP",
    decrypt: isKorean ? "복호화" : "Decrypt",
    plaintext: isKorean ? "평문" : "Plaintext",
    signingTitle: isKorean ? "RSA-PSS 서명" : "RSA-PSS Signing",
    signingDesc: isKorean ? "RSA-PSS로 메시지에 서명하고 쌍을 이루는 공개 키를 사용하여 검증합니다." : "Sign messages with RSA-PSS and verify using the paired public key.",
    messageToSign: isKorean ? "서명할 메시지" : "Message to sign",
    sign: isKorean ? "서명" : "Sign",
    signatureBase64: isKorean ? "서명 (Base64)" : "Signature (Base64)",
    messageToVerify: isKorean ? "검증할 메시지" : "Message to verify",
    signatureToVerify: isKorean ? "검증할 서명" : "Signature to verify",
    verify: isKorean ? "검증" : "Verify"
  }
});

const getPlaygroundTabs = (isKorean: boolean): { id: PlaygroundTabId; icon: any; label: string; description: string }[] => [
  {
    id: "symmetric",
    icon: Lock,
    label: isKorean ? "대칭 암호화" : "Symmetric",
    description: isKorean ? "AES-GCM 암호화 및 복호화" : "AES-GCM encryption & decryption"
  },
  {
    id: "hashing",
    icon: Hash,
    label: isKorean ? "해싱" : "Hashing",
    description: isKorean ? "SHA 다이제스트 생성" : "Generate SHA digests"
  },
  {
    id: "rsa",
    icon: Key,
    label: isKorean ? "RSA 툴킷" : "RSA Toolkit",
    description: isKorean ? "키 생성, 암호화, 서명, 검증" : "Keygen, encrypt, sign, verify"
  }
];

interface EdgeCryptoPlaygroundProps {
  lang?: string;
}

export default function EdgeCryptoPlayground({ lang = "en" }: EdgeCryptoPlaygroundProps) {
  const isKorean = lang === "ko";
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
      return isKorean 
        ? "플레이그라운드를 활성화하려면 apps/resume 내에서 `pnpm add edge-crypto`를 실행하세요."
        : "Run `pnpm add edge-crypto` inside apps/resume to enable the playground.";
    }
    if (checkingSupport) {
      return isKorean ? "SubtleCrypto 가용성 확인 중..." : "Checking SubtleCrypto availability...";
    }
    if (supported === false) {
      return isKorean 
        ? "이 환경에서는 SubtleCrypto를 사용할 수 없습니다."
        : "SubtleCrypto is not available in this environment.";
    }
    return null;
  }, [checkingSupport, loadError, supported, isKorean]);

  const isReady = cryptoModule && supported !== false;

  async function handleSymmetricEncrypt() {
    if (!cryptoModule) {
      setEncryptStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!encryptMessage.trim()) {
      setEncryptStatus({ type: "error", message: isKorean ? "암호화할 메시지를 입력하세요." : "Provide a message to encrypt." });
      return;
    }
    if (!encryptPassword.trim()) {
      setEncryptStatus({ type: "error", message: isKorean ? "비밀번호를 입력하세요." : "Provide a password." });
      return;
    }

    setEncryptBusy(true);
    setEncryptStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.encryptToString(encryptMessage, encryptPassword);
      setCiphertextOutput(result);
      setDecryptCiphertext(result);
      setDecryptOutput("(awaiting decryption)");
      setEncryptStatus({ type: "success", message: isKorean ? "AES-GCM으로 암호화되었습니다." : "Encrypted with AES-GCM." });
    } catch (error) {
      console.error(error);
      setEncryptStatus({
        type: "error",
        message: isKorean ? "암호화에 실패했습니다. SubtleCrypto가 지원되는지 확인하세요." : "Encryption failed. Ensure SubtleCrypto is supported."
      });
    } finally {
      setEncryptBusy(false);
    }
  }

  async function handleSymmetricDecrypt() {
    if (!cryptoModule) {
      setDecryptStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!decryptCiphertext.trim()) {
      setDecryptStatus({ type: "error", message: isKorean ? "AES-GCM으로 생성된 암호문을 붙여넣으세요." : "Paste a ciphertext generated with AES-GCM." });
      return;
    }
    if (!decryptPassword.trim()) {
      setDecryptStatus({ type: "error", message: isKorean ? "암호화에 사용된 비밀번호를 입력하세요." : "Provide the password used for encryption." });
      return;
    }

    setDecryptBusy(true);
    setDecryptStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.decryptFromString(decryptCiphertext, decryptPassword);
      setDecryptOutput(result);
      setDecryptStatus({ type: "success", message: isKorean ? "암호문이 성공적으로 복호화되었습니다." : "Ciphertext decrypted successfully." });
    } catch (error) {
      console.error(error);
      setDecryptStatus({
        type: "error",
        message: isKorean ? "복호화에 실패했습니다. 비밀번호나 암호문을 다시 확인하세요." : "Decryption failed. Double-check the password or ciphertext."
      });
    } finally {
      setDecryptBusy(false);
    }
  }

  async function handleHash() {
    if (!cryptoModule) {
      setHashStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!hashInput.trim()) {
      setHashStatus({ type: "error", message: isKorean ? "해시할 입력을 제공하세요." : "Provide input to hash." });
      return;
    }

    setHashBusy(true);
    setHashStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.hash(hashInput, hashAlgorithm);
      setHashOutput(result);
      setHashStatus({ type: "success", message: isKorean ? `${hashAlgorithm} 다이제스트를 생성했습니다.` : `Generated ${hashAlgorithm} digest.` });
    } catch (error) {
      console.error(error);
      setHashStatus({ type: "error", message: isKorean ? "해싱에 실패했습니다." : "Hashing failed." });
    } finally {
      setHashBusy(false);
    }
  }

  async function handleGenerateRSAEncryptionKeys() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
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
      setRsaEncryptionStatus({ type: "success", message: isKorean ? "RSA-OAEP 키 쌍이 준비되었습니다." : "RSA-OAEP key pair ready." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "RSA-OAEP 키 생성에 실패했습니다." : "RSA-OAEP key generation failed." });
    } finally {
      setRsaEncryptionGenerating(false);
    }
  }

  async function handleRSAEncryptMessage() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!rsaEncryptionKeyPair) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "먼저 RSA 키 쌍을 생성하세요." : "Generate an RSA key pair first." });
      return;
    }
    if (!rsaEncryptMessage.trim()) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "암호화할 메시지를 입력하세요." : "Provide a message to encrypt." });
      return;
    }

    setRsaEncryptionBusy(true);
    setRsaEncryptionStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.encryptRSA(rsaEncryptMessage, rsaEncryptionKeyPair.publicKey);
      setRsaEncryptCiphertext(result);
      setRsaDecryptCiphertext(result);
      setRsaDecryptOutput("(awaiting decryption)");
      setRsaEncryptionStatus({ type: "success", message: isKorean ? "RSA-OAEP로 암호화되었습니다." : "Encrypted with RSA-OAEP." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "RSA 암호화에 실패했습니다." : "RSA encryption failed." });
    } finally {
      setRsaEncryptionBusy(false);
    }
  }

  async function handleRSADecryptMessage() {
    if (!cryptoModule) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!rsaEncryptionKeyPair) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "먼저 RSA 키 쌍을 생성하세요." : "Generate an RSA key pair first." });
      return;
    }
    if (!rsaDecryptCiphertext.trim()) {
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "복호화할 암호문을 붙여넣으세요." : "Paste a ciphertext to decrypt." });
      return;
    }

    setRsaEncryptionBusy(true);
    setRsaEncryptionStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.decryptRSA(rsaDecryptCiphertext, rsaEncryptionKeyPair.privateKey);
      setRsaDecryptOutput(result);
      setRsaEncryptionStatus({ type: "success", message: isKorean ? "개인 키로 암호문이 복호화되었습니다." : "Ciphertext decrypted with private key." });
    } catch (error) {
      console.error(error);
      setRsaEncryptionStatus({ type: "error", message: isKorean ? "RSA 복호화에 실패했습니다." : "RSA decryption failed." });
    } finally {
      setRsaEncryptionBusy(false);
    }
  }

  async function handleGenerateRSASigningKeys() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    setRsaSigningGenerating(true);
    setRsaSigningStatus({ type: "idle", message: "" });
    try {
      const keys = await cryptoModule.generateRSASigningKeyPair({ modulusLength: 2048 });
      setRsaSigningKeyPair(keys);
      setRsaSignature("");
      setRsaVerifySignature("");
      setRsaSigningStatus({ type: "success", message: isKorean ? "RSA 서명 키 쌍이 준비되었습니다." : "RSA signing key pair ready." });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: isKorean ? "RSA 서명 키 생성에 실패했습니다." : "RSA signing key generation failed." });
    } finally {
      setRsaSigningGenerating(false);
    }
  }

  async function handleRSASignMessage() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!rsaSigningKeyPair) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "먼저 서명 키 쌍을 생성하세요." : "Generate a signing key pair first." });
      return;
    }
    if (!rsaSignMessage.trim()) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "서명할 메시지를 입력하세요." : "Provide a message to sign." });
      return;
    }

    setRsaSigningBusy(true);
    setRsaSigningStatus({ type: "idle", message: "" });
    try {
      const result = await cryptoModule.signRSA(rsaSignMessage, rsaSigningKeyPair.privateKey);
      setRsaSignature(result);
      setRsaVerifyMessage(rsaSignMessage);
      setRsaVerifySignature(result);
      setRsaSigningStatus({ type: "success", message: isKorean ? "RSA-PSS로 메시지가 서명되었습니다." : "Message signed with RSA-PSS." });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: isKorean ? "RSA 서명에 실패했습니다." : "RSA signing failed." });
    } finally {
      setRsaSigningBusy(false);
    }
  }

  async function handleRSAVerifySignature() {
    if (!cryptoModule) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "edge-crypto 로딩 중입니다." : "edge-crypto is still loading." });
      return;
    }
    if (!rsaSigningKeyPair) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "먼저 서명 키 쌍을 생성하세요." : "Generate a signing key pair first." });
      return;
    }
    if (!rsaVerifySignature.trim()) {
      setRsaSigningStatus({ type: "error", message: isKorean ? "검증할 서명을 입력하세요." : "Provide a signature to verify." });
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
        message: valid 
          ? (isKorean ? "공개 키로 서명이 검증되었습니다." : "Signature verified with public key.") 
          : (isKorean ? "서명 검증에 실패했습니다." : "Signature verification failed.")
      });
    } catch (error) {
      console.error(error);
      setRsaSigningStatus({ type: "error", message: isKorean ? "RSA 검증에 실패했습니다." : "RSA verification failed." });
    } finally {
      setRsaSigningBusy(false);
    }
  }

  const labels = getPlaygroundLabels(isKorean);

  const renderSymmetricTab = () => (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">{labels.symmetric.encryptTitle}</h4>
            <p className="text-xs text-white/60">{labels.symmetric.encryptDesc}</p>
          </div>
          {encryptBusy && <span className="text-xs text-white/50 animate-pulse">{labels.symmetric.encrypting}</span>}
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.symmetric.message}</label>
        <textarea
          value={encryptMessage}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setEncryptMessage(event.currentTarget.value)
          }
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.symmetric.password}</label>
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
            {labels.symmetric.encrypt}
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
            <label className="text-xs uppercase tracking-wide text-white/40">{labels.symmetric.ciphertextBase64}</label>
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
            <h4 className="font-semibold">{labels.symmetric.decryptTitle}</h4>
            <p className="text-xs text-white/60">{labels.symmetric.decryptDesc}</p>
          </div>
          {decryptBusy && <span className="text-xs text-white/50 animate-pulse">{labels.symmetric.decrypting}</span>}
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.symmetric.ciphertext}</label>
        <textarea
          value={decryptCiphertext}
          placeholder={labels.symmetric.ciphertextPlaceholder}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setDecryptCiphertext(event.currentTarget.value)
          }
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.symmetric.password}</label>
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
            {labels.symmetric.decrypt}
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
            <div className="mb-1 text-emerald-200/70">{labels.symmetric.plaintext}</div>
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
          <h4 className="font-semibold">{labels.hashing.title}</h4>
          <p className="text-xs text-white/60">{labels.hashing.desc(hashAlgorithm)}</p>
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
        {hashBusy ? labels.hashing.hashing : labels.hashing.hashValue}
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
          <div className="mb-1 text-white/50">{labels.hashing.digest} ({hashAlgorithm})</div>
          <div className="break-all font-mono">{hashOutput}</div>
          <div className="mt-2 text-[0.7rem] uppercase tracking-wide text-white/40">
            {labels.hashing.length}: {hashOutput.length} {labels.hashing.chars} (base64)
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
            <h4 className="font-semibold">{labels.rsa.encryptionTitle}</h4>
            <p className="text-xs text-white/60">{labels.rsa.encryptionDesc}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            {rsaEncryptionBusy && <span className="animate-pulse">{labels.rsa.running}</span>}
            <button
              onClick={handleGenerateRSAEncryptionKeys}
              disabled={!isReady || rsaEncryptionGenerating}
              className="rounded-lg bg-emerald-500/20 px-3 py-1.5 font-semibold text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {rsaEncryptionGenerating ? labels.rsa.generating : rsaEncryptionKeyPair ? labels.rsa.regenerate : labels.rsa.generate}
            </button>
          </div>
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.rsa.messageToEncrypt}</label>
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
            {labels.rsa.encrypt}
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
            <label className="text-xs uppercase tracking-wide text-white/40">{labels.rsa.ciphertextBase64}</label>
            <textarea
              readOnly
              value={rsaEncryptCiphertext}
              className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono text-emerald-100 focus:outline-none"
            />
          </div>
        )}
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.rsa.ciphertextToDecrypt}</label>
        <textarea
          value={rsaDecryptCiphertext}
          placeholder={labels.rsa.ciphertextPlaceholder}
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
            {labels.rsa.decrypt}
          </button>
        </div>
        {rsaDecryptOutput && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs">
            <div className="mb-1 text-emerald-200/70">{labels.rsa.plaintext}</div>
            <div className="font-mono text-emerald-100 whitespace-pre-wrap break-words">{rsaDecryptOutput}</div>
          </div>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">{labels.rsa.signingTitle}</h4>
            <p className="text-xs text-white/60">{labels.rsa.signingDesc}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            {rsaSigningBusy && <span className="animate-pulse">{labels.rsa.running}</span>}
            <button
              onClick={handleGenerateRSASigningKeys}
              disabled={!isReady || rsaSigningGenerating}
              className="rounded-lg bg-emerald-500/20 px-3 py-1.5 font-semibold text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {rsaSigningGenerating ? labels.rsa.generating : rsaSigningKeyPair ? labels.rsa.regenerate : labels.rsa.generate}
            </button>
          </div>
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.rsa.messageToSign}</label>
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
            {labels.rsa.sign}
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
            <label className="text-xs uppercase tracking-wide text-white/40">{labels.rsa.signatureBase64}</label>
            <textarea
              readOnly
              value={rsaSignature}
              className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono text-emerald-100 focus:outline-none"
            />
          </div>
        )}
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.rsa.messageToVerify}</label>
        <textarea
          value={rsaVerifyMessage}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setRsaVerifyMessage(event.currentTarget.value)
          }
          className="min-h-[60px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.rsa.signatureToVerify}</label>
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
            {labels.rsa.verify}
          </button>
        </div>
      </div>
    </div>
  );

  const playgroundTabs = getPlaygroundTabs(isKorean);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-white shadow-xl shadow-emerald-500/10 backdrop-blur">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/90">{isKorean ? "라이브 플레이그라운드" : "Live Playground"}</p>
          <h3 className="text-xl font-semibold">{isKorean ? "브라우저에서 edge-crypto 사용해보기" : "Try edge-crypto in your browser"}</h3>
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
