import { getPlaygroundLabels } from "./data";
import type { PlaygroundTabId } from "./data";
import { Lock, Hash, Key } from "./icons";
import { useEdgeCrypto } from "./hooks";
import { SymmetricTab } from "./SymmetricTab";
import { HashingTab } from "./HashingTab";
import { RsaTab } from "./RsaTab";

const getPlaygroundTabs = (
  isKorean: boolean
): { id: PlaygroundTabId; icon: any; label: string; description: string }[] => [
  {
    id: "symmetric",
    icon: Lock,
    label: isKorean ? "대칭 암호화" : "Symmetric",
    description: isKorean ? "AES-GCM 암호화 및 복호화" : "AES-GCM encryption & decryption",
  },
  {
    id: "hashing",
    icon: Hash,
    label: isKorean ? "해싱" : "Hashing",
    description: isKorean ? "SHA 다이제스트 생성" : "Generate SHA digests",
  },
  {
    id: "rsa",
    icon: Key,
    label: isKorean ? "RSA 툴킷" : "RSA Toolkit",
    description: isKorean ? "키 생성, 암호화, 서명, 검증" : "Keygen, encrypt, sign, verify",
  },
];

interface EdgeCryptoPlaygroundProps {
  lang?: string;
}

export default function EdgeCryptoPlayground({ lang = "en" }: EdgeCryptoPlaygroundProps) {
  const isKorean = lang === "ko";
  const state = useEdgeCrypto(isKorean);
  const labels = getPlaygroundLabels(isKorean);
  const playgroundTabs = getPlaygroundTabs(isKorean);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-white shadow-xl shadow-emerald-500/10 backdrop-blur">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/90">
            {isKorean ? "라이브 플레이그라운드" : "Live Playground"}
          </p>
          <h3 className="text-xl font-semibold">
            {isKorean ? "브라우저에서 edge-crypto 사용해보기" : "Try edge-crypto in your browser"}
          </h3>
        </div>
        {state.installHint && (
          <div className="text-xs text-emerald-200/70 sm:text-right">{state.installHint}</div>
        )}
      </div>

      {state.loadError && (
        <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          {state.loadError}
        </div>
      )}

      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {playgroundTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => state.setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                state.activeTab === tab.id
                  ? "bg-emerald-500/20 text-emerald-200"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {tab.label}
              <span className="ml-2 hidden text-[0.65rem] uppercase tracking-wider md:inline">
                {tab.description}
              </span>
            </button>
          ))}
        </div>

        {state.activeTab === "symmetric" && (
          <SymmetricTab
            labels={labels.symmetric}
            isReady={state.isReady}
            encryptMessage={state.encryptMessage}
            setEncryptMessage={state.setEncryptMessage}
            encryptPassword={state.encryptPassword}
            setEncryptPassword={state.setEncryptPassword}
            ciphertextOutput={state.ciphertextOutput}
            encryptBusy={state.encryptBusy}
            encryptStatus={state.encryptStatus}
            handleSymmetricEncrypt={state.handleSymmetricEncrypt}
            decryptCiphertext={state.decryptCiphertext}
            setDecryptCiphertext={state.setDecryptCiphertext}
            decryptPassword={state.decryptPassword}
            setDecryptPassword={state.setDecryptPassword}
            decryptOutput={state.decryptOutput}
            decryptBusy={state.decryptBusy}
            decryptStatus={state.decryptStatus}
            handleSymmetricDecrypt={state.handleSymmetricDecrypt}
          />
        )}

        {state.activeTab === "hashing" && (
          <HashingTab
            labels={labels.hashing}
            isReady={state.isReady}
            hashInput={state.hashInput}
            setHashInput={state.setHashInput}
            hashAlgorithm={state.hashAlgorithm}
            setHashAlgorithm={state.setHashAlgorithm}
            hashOutput={state.hashOutput}
            hashBusy={state.hashBusy}
            hashStatus={state.hashStatus}
            handleHash={state.handleHash}
          />
        )}

        {state.activeTab === "rsa" && (
          <RsaTab
            labels={labels.rsa}
            isReady={state.isReady}
            rsaEncryptionKeyPair={state.rsaEncryptionKeyPair}
            rsaEncryptionGenerating={state.rsaEncryptionGenerating}
            rsaEncryptionStatus={state.rsaEncryptionStatus}
            rsaEncryptMessage={state.rsaEncryptMessage}
            setRsaEncryptMessage={state.setRsaEncryptMessage}
            rsaEncryptCiphertext={state.rsaEncryptCiphertext}
            rsaDecryptCiphertext={state.rsaDecryptCiphertext}
            setRsaDecryptCiphertext={state.setRsaDecryptCiphertext}
            rsaDecryptOutput={state.rsaDecryptOutput}
            rsaEncryptionBusy={state.rsaEncryptionBusy}
            handleGenerateRSAEncryptionKeys={state.handleGenerateRSAEncryptionKeys}
            handleRSAEncryptMessage={state.handleRSAEncryptMessage}
            handleRSADecryptMessage={state.handleRSADecryptMessage}
            rsaSigningKeyPair={state.rsaSigningKeyPair}
            rsaSigningGenerating={state.rsaSigningGenerating}
            rsaSigningStatus={state.rsaSigningStatus}
            rsaSignMessage={state.rsaSignMessage}
            setRsaSignMessage={state.setRsaSignMessage}
            rsaSignature={state.rsaSignature}
            rsaVerifyMessage={state.rsaVerifyMessage}
            setRsaVerifyMessage={state.setRsaVerifyMessage}
            rsaVerifySignature={state.rsaVerifySignature}
            setRsaVerifySignature={state.setRsaVerifySignature}
            rsaSigningBusy={state.rsaSigningBusy}
            handleGenerateRSASigningKeys={state.handleGenerateRSASigningKeys}
            handleRSASignMessage={state.handleRSASignMessage}
            handleRSAVerifySignature={state.handleRSAVerifySignature}
          />
        )}
      </div>
    </div>
  );
}
