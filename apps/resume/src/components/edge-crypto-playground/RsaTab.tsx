import type { JSX } from "preact";
import type { StatusState } from "./data";

interface RsaTabProps {
  labels: {
    encryptionTitle: string;
    encryptionDesc: string;
    running: string;
    generating: string;
    generate: string;
    regenerate: string;
    messageToEncrypt: string;
    encrypt: string;
    ciphertextBase64: string;
    ciphertextToDecrypt: string;
    ciphertextPlaceholder: string;
    decrypt: string;
    plaintext: string;
    signingTitle: string;
    signingDesc: string;
    messageToSign: string;
    sign: string;
    signatureBase64: string;
    messageToVerify: string;
    signatureToVerify: string;
    verify: string;
  };
  isReady: boolean | null;
  // Encryption
  rsaEncryptionKeyPair: CryptoKeyPair | null;
  rsaEncryptionGenerating: boolean;
  rsaEncryptionStatus: StatusState;
  rsaEncryptMessage: string;
  setRsaEncryptMessage: (v: string) => void;
  rsaEncryptCiphertext: string;
  rsaDecryptCiphertext: string;
  setRsaDecryptCiphertext: (v: string) => void;
  rsaDecryptOutput: string;
  rsaEncryptionBusy: boolean;
  handleGenerateRSAEncryptionKeys: () => void;
  handleRSAEncryptMessage: () => void;
  handleRSADecryptMessage: () => void;
  // Signing
  rsaSigningKeyPair: CryptoKeyPair | null;
  rsaSigningGenerating: boolean;
  rsaSigningStatus: StatusState;
  rsaSignMessage: string;
  setRsaSignMessage: (v: string) => void;
  rsaSignature: string;
  rsaVerifyMessage: string;
  setRsaVerifyMessage: (v: string) => void;
  rsaVerifySignature: string;
  setRsaVerifySignature: (v: string) => void;
  rsaSigningBusy: boolean;
  handleGenerateRSASigningKeys: () => void;
  handleRSASignMessage: () => void;
  handleRSAVerifySignature: () => void;
}

function statusClass(status: StatusState) {
  if (status.type === "error") return "text-red-300";
  if (status.type === "success") return "text-emerald-300";
  return "text-white/60";
}

export function RsaTab({
  labels,
  isReady,
  rsaEncryptionKeyPair,
  rsaEncryptionGenerating,
  rsaEncryptionStatus,
  rsaEncryptMessage,
  setRsaEncryptMessage,
  rsaEncryptCiphertext,
  rsaDecryptCiphertext,
  setRsaDecryptCiphertext,
  rsaDecryptOutput,
  rsaEncryptionBusy,
  handleGenerateRSAEncryptionKeys,
  handleRSAEncryptMessage,
  handleRSADecryptMessage,
  rsaSigningKeyPair,
  rsaSigningGenerating,
  rsaSigningStatus,
  rsaSignMessage,
  setRsaSignMessage,
  rsaSignature,
  rsaVerifyMessage,
  setRsaVerifyMessage,
  rsaVerifySignature,
  setRsaVerifySignature,
  rsaSigningBusy,
  handleGenerateRSASigningKeys,
  handleRSASignMessage,
  handleRSAVerifySignature,
}: RsaTabProps) {
  return (
    <div className="space-y-4">
      {/* RSA-OAEP Encryption */}
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">{labels.encryptionTitle}</h4>
            <p className="text-xs text-white/60">{labels.encryptionDesc}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            {rsaEncryptionBusy && <span className="animate-pulse">{labels.running}</span>}
            <button
              onClick={handleGenerateRSAEncryptionKeys}
              disabled={!isReady || rsaEncryptionGenerating}
              className="rounded-lg bg-emerald-500/20 px-3 py-1.5 font-semibold text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {rsaEncryptionGenerating
                ? labels.generating
                : rsaEncryptionKeyPair
                  ? labels.regenerate
                  : labels.generate}
            </button>
          </div>
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.messageToEncrypt}</label>
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
            {labels.encrypt}
          </button>
        </div>
        {rsaEncryptionStatus.message && (
          <p className={`text-xs ${statusClass(rsaEncryptionStatus)}`}>{rsaEncryptionStatus.message}</p>
        )}
        {rsaEncryptCiphertext && (
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-white/40">{labels.ciphertextBase64}</label>
            <textarea
              readOnly
              value={rsaEncryptCiphertext}
              className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono text-emerald-100 focus:outline-none"
            />
          </div>
        )}
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.ciphertextToDecrypt}</label>
        <textarea
          value={rsaDecryptCiphertext}
          placeholder={labels.ciphertextPlaceholder}
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
            {labels.decrypt}
          </button>
        </div>
        {rsaDecryptOutput && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs">
            <div className="mb-1 text-emerald-200/70">{labels.plaintext}</div>
            <div className="font-mono text-emerald-100 whitespace-pre-wrap break-words">{rsaDecryptOutput}</div>
          </div>
        )}
      </div>

      {/* RSA-PSS Signing */}
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">{labels.signingTitle}</h4>
            <p className="text-xs text-white/60">{labels.signingDesc}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            {rsaSigningBusy && <span className="animate-pulse">{labels.running}</span>}
            <button
              onClick={handleGenerateRSASigningKeys}
              disabled={!isReady || rsaSigningGenerating}
              className="rounded-lg bg-emerald-500/20 px-3 py-1.5 font-semibold text-emerald-200 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {rsaSigningGenerating
                ? labels.generating
                : rsaSigningKeyPair
                  ? labels.regenerate
                  : labels.generate}
            </button>
          </div>
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.messageToSign}</label>
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
            {labels.sign}
          </button>
        </div>
        {rsaSigningStatus.message && (
          <p className={`text-xs ${statusClass(rsaSigningStatus)}`}>{rsaSigningStatus.message}</p>
        )}
        {rsaSignature && (
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-white/40">{labels.signatureBase64}</label>
            <textarea
              readOnly
              value={rsaSignature}
              className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono text-emerald-100 focus:outline-none"
            />
          </div>
        )}
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.messageToVerify}</label>
        <textarea
          value={rsaVerifyMessage}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setRsaVerifyMessage(event.currentTarget.value)
          }
          className="min-h-[60px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.signatureToVerify}</label>
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
            {labels.verify}
          </button>
        </div>
      </div>
    </div>
  );
}
