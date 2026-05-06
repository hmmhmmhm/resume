import type { JSX } from "preact";
import { hashAlgorithms } from "./data";
import type { HashAlgorithm, StatusState } from "./data";

interface HashingTabProps {
  labels: {
    title: string;
    desc: (algo: string) => string;
    hashValue: string;
    hashing: string;
    digest: string;
    length: string;
    chars: string;
  };
  isReady: boolean | null;
  hashInput: string;
  setHashInput: (v: string) => void;
  hashAlgorithm: HashAlgorithm;
  setHashAlgorithm: (v: HashAlgorithm) => void;
  hashOutput: string;
  hashBusy: boolean;
  hashStatus: StatusState;
  handleHash: () => void;
}

function statusClass(status: StatusState) {
  if (status.type === "error") return "text-red-300";
  if (status.type === "success") return "text-emerald-300";
  return "text-white/60";
}

export function HashingTab({
  labels,
  isReady,
  hashInput,
  setHashInput,
  hashAlgorithm,
  setHashAlgorithm,
  hashOutput,
  hashBusy,
  hashStatus,
  handleHash,
}: HashingTabProps) {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h4 className="font-semibold">{labels.title}</h4>
          <p className="text-xs text-white/60">{labels.desc(hashAlgorithm)}</p>
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
        {hashBusy ? labels.hashing : labels.hashValue}
      </button>
      {hashStatus.message && (
        <p className={`text-xs ${statusClass(hashStatus)}`}>{hashStatus.message}</p>
      )}
      {hashOutput && (
        <div className="rounded-lg border border-white/10 bg-black/60 p-3 text-xs">
          <div className="mb-1 text-white/50">
            {labels.digest} ({hashAlgorithm})
          </div>
          <div className="break-all font-mono">{hashOutput}</div>
          <div className="mt-2 text-[0.7rem] uppercase tracking-wide text-white/40">
            {labels.length}: {hashOutput.length} {labels.chars} (base64)
          </div>
        </div>
      )}
    </div>
  );
}
