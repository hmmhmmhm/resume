import type { JSX } from "preact";
import type { StatusState } from "./data";

interface SymmetricTabProps {
  labels: {
    encryptTitle: string;
    encryptDesc: string;
    encrypting: string;
    message: string;
    password: string;
    encrypt: string;
    ciphertextBase64: string;
    decryptTitle: string;
    decryptDesc: string;
    decrypting: string;
    ciphertext: string;
    ciphertextPlaceholder: string;
    decrypt: string;
    plaintext: string;
  };
  isReady: boolean | null;
  // Encrypt
  encryptMessage: string;
  setEncryptMessage: (v: string) => void;
  encryptPassword: string;
  setEncryptPassword: (v: string) => void;
  ciphertextOutput: string;
  encryptBusy: boolean;
  encryptStatus: StatusState;
  handleSymmetricEncrypt: () => void;
  // Decrypt
  decryptCiphertext: string;
  setDecryptCiphertext: (v: string) => void;
  decryptPassword: string;
  setDecryptPassword: (v: string) => void;
  decryptOutput: string;
  decryptBusy: boolean;
  decryptStatus: StatusState;
  handleSymmetricDecrypt: () => void;
}

function statusClass(status: StatusState) {
  if (status.type === "error") return "text-red-300";
  if (status.type === "success") return "text-emerald-300";
  return "text-white/60";
}

export function SymmetricTab({
  labels,
  isReady,
  encryptMessage,
  setEncryptMessage,
  encryptPassword,
  setEncryptPassword,
  ciphertextOutput,
  encryptBusy,
  encryptStatus,
  handleSymmetricEncrypt,
  decryptCiphertext,
  setDecryptCiphertext,
  decryptPassword,
  setDecryptPassword,
  decryptOutput,
  decryptBusy,
  decryptStatus,
  handleSymmetricDecrypt,
}: SymmetricTabProps) {
  return (
    <div className="space-y-4">
      {/* Encrypt panel */}
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">{labels.encryptTitle}</h4>
            <p className="text-xs text-white/60">{labels.encryptDesc}</p>
          </div>
          {encryptBusy && (
            <span className="text-xs text-white/50 animate-pulse">{labels.encrypting}</span>
          )}
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.message}</label>
        <textarea
          value={encryptMessage}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setEncryptMessage(event.currentTarget.value)
          }
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-sm focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.password}</label>
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
            {labels.encrypt}
          </button>
        </div>
        {encryptStatus.message && (
          <p className={`text-xs ${statusClass(encryptStatus)}`}>{encryptStatus.message}</p>
        )}
        {ciphertextOutput && (
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-white/40">{labels.ciphertextBase64}</label>
            <textarea
              readOnly
              value={ciphertextOutput}
              className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono text-emerald-100 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Decrypt panel */}
      <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold">{labels.decryptTitle}</h4>
            <p className="text-xs text-white/60">{labels.decryptDesc}</p>
          </div>
          {decryptBusy && (
            <span className="text-xs text-white/50 animate-pulse">{labels.decrypting}</span>
          )}
        </header>
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.ciphertext}</label>
        <textarea
          value={decryptCiphertext}
          placeholder={labels.ciphertextPlaceholder}
          onChange={(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
            setDecryptCiphertext(event.currentTarget.value)
          }
          className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 p-3 text-xs font-mono focus:border-emerald-400 focus:outline-none"
        />
        <label className="text-xs uppercase tracking-wide text-white/40">{labels.password}</label>
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
            {labels.decrypt}
          </button>
        </div>
        {decryptStatus.message && (
          <p className={`text-xs ${statusClass(decryptStatus)}`}>{decryptStatus.message}</p>
        )}
        {decryptOutput && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs">
            <div className="mb-1 text-emerald-200/70">{labels.plaintext}</div>
            <div className="font-mono text-emerald-100 whitespace-pre-wrap break-words">{decryptOutput}</div>
          </div>
        )}
      </div>
    </div>
  );
}
